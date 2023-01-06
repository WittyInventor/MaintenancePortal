const router = require("express").Router();
const sequelize = require("../config/connection");
const WorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const Request = require("../models/Request");
const withAuth = require("../utils/auth");

// GET all posts for Property Manager and Work Order
router.get("/", withAuth, async (req, res) => {
  try {
    let dbData;
    if (req.session.isAdmin) {
      dbData = await Request.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });
    } else {
      dbData = await Request.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });
    }
    const requests = dbData.map((data) => data.get({ plain: true }));

    res.render("requests", {
      requests,
      logged_in: req.session.logged_in,
      username: req.session.username,
        isAdmin: req.session.isAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
