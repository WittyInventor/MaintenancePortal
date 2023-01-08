const router = require("express").Router();
const Request = require("../../models/Request");
const WorkOrder = require("../../models/WorkOrder");
const User = require("../../models/User");
// importing information from the models folder in the request.js class file.

// GET all request
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the request file's request and response from computer is in the first steps of the get.
  try {
    const requestData = await Request.findAll({
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
    res.status(200).json(requestData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const requestData = await request.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(requestData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// CREATE a request
router.post("/", async (req, res) => {
  try {
    const requestData = await Request.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(requestData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE a request
router.put("/:id", async (req, res) => {
  try {
    const requestData = await Request.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // If request status is Accepted, create a new Work Order
    console.log("+++Request Status: ", req.body);
    if (req.body.status === "Accepted") {
      console.log("Work Order Created");
      const workOrderData = await WorkOrder.create({
        ordernumber: 'WO-000'+req.params.id,
        request_id: req.params.id,
      });
    }

    res.status(200).json(requestData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a request
router.delete("/:id", async (req, res) => {
  try {
    const requestData = await Request.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!requestData) {
      res.status(404).json({ message: "No request found with this id!" });
      return;
    }

    res.status(200).json(requestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
