const router = require("express").Router();
const Request = require("../../models/Request");
const { requestroutes } = require("../../models");
const WorkOrder = require("../../models/WorkOrder");
// importing information from the models folder in the request.js class file.

// GET all request
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the request file's request and response from computer is in the first steps of the get.
  try {
    const requestData = await Request.findAll();
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

    // Automatically create WorkOrder for Request
    const workorderData = await WorkOrder.create({
      request_id: requestData.id,
      // Assigin automatic ordernumber
      ordernumber: "WO-" + ("0000" + requestData.id),
    });

    console.log("Work Order created",workorderData);

    res.status(200).json(requestData);
  } catch (err) {
    console.log(err);
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
