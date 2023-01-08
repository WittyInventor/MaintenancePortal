const router = require("express").Router();
const sequelize = require("../config/connection");
const WorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const Request = require("../models/Request");
const withAuth = require("../utils/auth");

// GET all posts for Property Manager and Work Order
router.get("/", withAuth, async (req, res) => {
  try {
    if (req.session.isAdmin) {
      const query = req.query.status;
      const whereArr = query ? { status: query } : {};

      const dbData = await WorkOrder.findAll({
        order: [["created_at", "DESC"]],
        where: whereArr,
        include: [
          {
            model: Request,
            include: [{ model: User, attributes: { exclude: ["password"] } }],
          },
        ],
      });

      const workorders = dbData.map((wo) => wo.get({ plain: true }));

      // Find all users with role of "worker"
      const workersData = await User.findAll({
        where: {
          role: "worker",
        },
      });
      const workers = workersData.map((worker) => worker.get({ plain: true }));

      res.render("workorders", {
        workorders,
        workers,
        logged_in: req.session.logged_in,
        username: req.session.username,
        user_id: req.session.user_id,
        isAdmin: req.session.isAdmin,
        unitnumber: req.session.unitnumber,
        requests_num: req.session.requests_num,
      });
    } else {
      // Render error page
      res.render("error", {
        logged_in: req.session.logged_in,
        status: "401 Unauthorized",
        message: "You are not authorized to view this page.",
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        user_id: req.session.user_id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one work order
router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbData = await WorkOrder.findByPk(req.params.id, {
      include: [
        {
          model: Request,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
      ],
    });

    const workorder = dbData.get({ plain: true });

    // Find all users with role of "worker"
    const workersData = await User.findAll({
      where: {
        role: "worker",
      },
    });
    const workers = workersData.map((worker) => worker.get({ plain: true }));

    res.render("workorder", {
      workorder,
      workers,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
      isAdmin: req.session.isAdmin,
      unitnumber: req.session.unitnumber,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create mew work order
router.get("/new", withAuth, async (req, res) => {
  try {
    const dbData = await Request.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    const requests = dbData.map((request) => request.get({ plain: true }));

    res.render("new-workorder", {
      requests,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
      isAdmin: req.session.isAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
