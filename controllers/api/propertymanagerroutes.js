const router = require("express").Router();
const PropertyManager = require("../../models/PropertyManager");
const WorkOrder = require("../../models/WorkOrder");
// importing information from the models folder in the propertymanager.js class file.

// GET all propertymanager
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the property manager request and response from computer is in the first steps of the get.
  try {
    const propretymanagerData = await PropertyManager.findAll({
      include: [{model: WorkOrder}],
    });
    res.status(200).json(propretymanagerData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const propertymanagerData = await propertymanager.findOne({
      where: {
        id: req.params.id,
      },
      include: [{model: WorkOrder}],
    });
    res.status(200).json(propertymanagerData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// CREATE a propertymanager
router.post("/", async (req, res) => {
  try {
    const propertymanagerData = await PropertyManager.create(req.body);
    res.status(200).json(propertymanagerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a propertymanager
router.delete("/:id", async (req, res) => {
  try {
    const propertymanagerData = await PropertyManager.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!propertymanagerData) {
      res
        .status(404)
        .json({ message: "No propertymanager found with this id!" });
      return;
    }

    res.status(200).json(propertymanagerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
