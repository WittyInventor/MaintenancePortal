const router = require("express").Router();
const sequelize = require("../config/connection");
const PropertyManager = require("../models/PropertyManager");
const WorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const Tenant = require("../models/Tenant");
const Request = require("../models/Request");
const withAuth = require("../utils/auth");

// GET all posts for Property Manager and Work Order
router.get("/", withAuth, async (req, res) => {
  try {
    const tenantData = await Tenant.findAll({
      include: [
        { model: Request },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    const tenants = tenantData.map((tenant) => tenant.get({ plain: true }));

    res.render("tenant", {
      tenants,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
