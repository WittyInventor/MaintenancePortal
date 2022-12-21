const router = require("express").Router();
const { tenant } = require("../../models");
const Tenant = require("../../models/Tenant");
const Request = require("../../models/Request");
// importing information from the models folder in the tenant.js class file.

// GET all tenants
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the tenants request and response from computer is in the first steps of the get.
  try {
    const tenantData = await Tenant.findAll({
      include: [{ model: Request}],
    });
    // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
    res.status(200).json(tenantData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tenantData = await Tenant.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Request }],
    });
    res.status(200).json(tenantData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// CREATE a tenant
router.post("/", async (req, res) => {
  try {
    const tenantData = await Tenant.create(req.body);
    res.status(200).json(tenantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tenant
router.delete("/:id", async (req, res) => {
  try {
    const tenantData = await Tenant.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tenantData) {
      res.status(404).json({ message: "No tenant found with this id!" });
      return;
    }

    res.status(200).json(tenantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
