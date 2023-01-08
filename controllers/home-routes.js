const router = require("express").Router();
const { async } = require("seed/lib/seed");
const sequelize = require("../config/connection");
const User = require("../models/User");
const Request = require("../models/Request");
const WorkOrder = require("../models/WorkOrder");
const { getSessionOptions } = require("../models/User");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const sessionOptions = getSessionOptions(req);
    if (req.session.logged_in) {
      // Find requests associated with the user
      let newRequests = [];
      let totalRequests = 0;

      if (req.session.isAdmin) {
        newRequests = await Request.findAll({
          where: {
            status: "New",
          },
        });

        totalRequests = await Request.findAll({});
      } else {
        newRequests = await Request.findAll({
          where: {
            status: "New",
            user_id: req.session.user_id,
          },
        });

        totalRequests = await Request.findAll({
          where: {
            user_id: req.session.user_id,
          },
        });
      }

      let messageHeader = `Welcome back ${req.session.username} ${
        req.session.unitnumber || ""
      }! `;

      let message = "";
      if (totalRequests.length > 0) {
        message = `You have ${newRequests.length} NEW requests and ${totalRequests.length} TOTAL requests.`;
      }

      // Find all not null unit numbers and order by unit number
      const usersData = await User.findAll({
        where: {
          unitnumber: {
            [Op.ne]: null,
          },
        },
        order: [["unitnumber", "ASC"]],
      });

      const users = usersData.map((data) => data.get({ plain: true }));

      // Find all Open and In Progress work orders and order by request.user.unitnumber
      const workOrdersData = await WorkOrder.findAll({
        where: {
          status: {
            [Op.or]: ["Open", "In Progress"],
          },
        },
        include: [
          {
            model: Request,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });

      // Group work orders by unit number
      const openWorkOrders = workOrdersData.map((data) =>
        data.get({ plain: true })
      );
      let workorders = {};
      openWorkOrders.forEach((workOrder) => {
        const unitNumber = workOrder.request.user.unitnumber;
        if (unitNumber) {
          if (workorders[unitNumber]) {
            workorders[unitNumber]++;
          } else {
            workorders[unitNumber] = 1;
          }
        }
      });

      console.log("workOrders", workorders);

      res.render("homepage", {
        ...sessionOptions,
        users,
        workorders,
        messageHeader,
        message,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/new-request", (req, res) => {
  res.render("new-request", {
    logged_in: req.session.logged_in,
    username: req.session.username,
    user_id: req.session.user_id,
    isAdmin: req.session.isAdmin,
    unitnumber: req.session.unitnumber,
  });
});

module.exports = router;
