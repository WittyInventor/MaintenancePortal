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
    const query = req.query.status;
    const whereArr = query ? { status: query } : {};
    if (req.session.isAdmin) {
      dbData = await Request.findAll({
        order: [["created_at", "DESC"]],
        where: whereArr,
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: WorkOrder,
          },
        ],
      });
    } else {
      dbData = await Request.findAll({
        order: [["created_at", "DESC"]],
        where: {
          ...whereArr,
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: WorkOrder,
          },
        ],
      });
    }
    const requests = dbData.map((data) => data.get({ plain: true }));

    // Find all requests and calculate count by status
    const allRequests = await Request.findAll({
        attributes: [
            "status",
            [sequelize.fn("COUNT", sequelize.col("status")), "count"],
        ],
        group: ["status"],
    });

    const requestsCount = allRequests.map((data) => data.get({ plain: true }));

    console.log("requestsCount", requestsCount);

    res.render("requests", {
      requests,
      logged_in: req.session.logged_in,
      username: req.session.username,
      isAdmin: req.session.isAdmin,
      unitnumber: req.session.unitnumber,
      requestsCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one request
router.get("/:id", withAuth, async (req, res) => {
    try {
        const dbData = await Request.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password"] },
                },
                {
                    model: WorkOrder,
                },
            ],
        });
        const request = dbData.get({ plain: true });

        res.render("request", {
            request,
            logged_in: req.session.logged_in,
            username: req.session.username,
            isAdmin: req.session.isAdmin,
            unitnumber: req.session.unitnumber,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
