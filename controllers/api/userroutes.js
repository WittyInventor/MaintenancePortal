const router = require("express").Router();
const User = require("../../models/User");
const Request = require("../../models/Request");

// POST a new user
router.post("/", async (req, res) => {
  try {
    let userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      req.session.isAdmin = userData.isAdmin;
      req.session.unitnumber = userData.unitnumber;
      req.session.role = userData.role;
      req.session.isWorker = userData.role === "Worker";
      req.session.isTenant = userData.role === "Tenant";
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ message: "success" });
    } else {
      res.render("error", {
        status: "401 Unauthorized",
        message: "You are not authorized to view this page.",
        ...User.getSessionOptions(req),
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      req.session.isAdmin = userData.isAdmin;
      req.session.unitnumber = userData.unitnumber;
      req.session.role = userData.role;
      req.session.isWorker = userData.role === "Worker";
      req.session.isTenant = userData.role === "Tenant";
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
