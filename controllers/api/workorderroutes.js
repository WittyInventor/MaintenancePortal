const router = require("express").Router();
const PropertyManager = require("../../models/PropertyManager");
const WorkOrder  = require("../../models/WorkOrder");
const Request = require("../../models/Request");
// importing information from the models folder in the workorder.js class file.

// GET all workorders
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the users request and response from computer is in the first steps of the get.
  try {
    const workorderData = await WorkOrder.findAll({
      include: [{ model: PropertyManager }, { model: Request }],
    });
    // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
    res.status(200).json(workorderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const workorderData = await WorkOrder.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: PropertyManager }, { model: Request } ],
    });
    res.status(200).json(workorderData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// CREATE a workorder
router.post("/", async (req, res) => {
  try {
    const workorderData = await WorkOrder.create(req.body);
    res.status(200).json(workorderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a workorder
router.delete("/:id", async (req, res) => {
  try {
    const workorderData = await WorkOrder.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!workorderData) {
      res.status(404).json({ message: "No work order found with this id!" });
      return;
    }

    res.status(200).json(workorderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
