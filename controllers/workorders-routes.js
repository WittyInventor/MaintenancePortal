const router = require("express").Router();
const sequelize = require("../config/connection");
const WorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const Request = require("../models/Request");
const withAuth = require("../utils/auth");

// GET all posts for Property Manager and Work Order
router.get("/", withAuth, async (req, res) => {
  try {
    if (!req.session.isTenant) {
      const query = req.query.status;
      const whereArr = query ? { status: query } : {};

      let dbData;
      if (req.session.isAdmin) {
        dbData = await WorkOrder.findAll({
        order: [["created_at", "DESC"]],
        where: whereArr,
        include: [
          {
            model: Request,
            include: [{ model: User, attributes: { exclude: ["password"] } }],
          },
        ],
      });
      } else {
        dbData = await WorkOrder.findAll({
          order: [["created_at", "DESC"]],
          where: {
            ...whereArr,
            assignedto: req.session.username,
          },
          include: [
            {
              model: Request,
              include: [{ model: User, attributes: { exclude: ["password"] } }],
            },
          ],
        });
      }


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
        ...User.getSessionOptions(req),
      });
    } else {
      // Render error page
      res.render("error", {
        status: "401 Unauthorized",
        message: "You are not authorized to view this page.",
        ...User.getSessionOptions(req),
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
      ...User.getSessionOptions(req),
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
      ...User.getSessionOptions(req),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
