const router = require("express").Router();
const sequelize = require("../config/connection");
const WorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const Request = require("../models/Request");
const withAuth = require("../utils/auth");

// GET all posts for Property Manager and Work Order
router.get("/", withAuth, async (req, res) => {
  try {
    const dbData = await WorkOrder.findAll({
      include: [
        {
          model: Request,
          include: [
            { model: User, attributes: { exclude: ["password"] } },
          ],
        },
      ],
    });

    const workorders = dbData.map((wo) =>
      wo.get({ plain: true })
    );

    res.render("workorders", {
      workorders,
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