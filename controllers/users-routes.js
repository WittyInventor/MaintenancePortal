const router = require("express").Router();
const User = require("../models/User");
const UNAUTHORIZED_MESSAGE = "You are not authorized to view this page.";
const UNAUTHORIZED_STATUS = "401 Unauthorized";

// GET all users
router.get("/", async (req, res) => {
  try {
    const sessionOptions = User.getSessionOptions(req);
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    users = users.map((user) => user.get({ plain: true }));
    if (req.session.isAdmin) {
      res.render("users", {
        users,
        ...sessionOptions,
      });
    } else {
      res.status(401).render("error", {
        status: UNAUTHORIZED_STATUS,
        message: UNAUTHORIZED_MESSAGE,
        ...sessionOptions,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single user
router.get("/:id", async (req, res) => {
  try {
    const sessionOptions = User.getSessionOptions(req);
    let userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    const user = userData.get({ plain: true });
    if (req.session.isAdmin || req.session.user_id === user.id) {
      res.render("user", {
        user,
        ...sessionOptions,
      });
    } else {
      res.status(401).render("error", {
        status: UNAUTHORIZED_STATUS,
        message: UNAUTHORIZED_MESSAGE,
        ...sessionOptions,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
