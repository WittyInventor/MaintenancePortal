const router = require("express").Router();
const WorkOrder = require("../../models/WorkOrder");
const Request = require("../../models/Request");
const User = require("../../models/User");
const { CourierClient } = require( "@trycourier/courier");
const courier = CourierClient({ authorizationToken: "dk_prod_V8GFXWN971MTWVPVPX5GGBH9HY4F" }); // get from the Courier UI
// importing information from the models folder in the workorder.js class file.

// GET all workorders
router.get("/", async (req, res) => {
  // the get('/'), async(promise code) and the users request and response from computer is in the first steps of the get.
  try {
    const workorderData = await WorkOrder.findAll({
      include: [
        {
          model: Request,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
      ],
    });
    // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
    res.status(200).json(workorderData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const workorderData = await WorkOrder.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Request }],
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

// UPDATE a workorder
router.put("/:id", async (req, res) => {
  try {
    const workorderData = await WorkOrder.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(workorderData);
    const updatedWorkOrder = await WorkOrder.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Request , include: [{ model: User }]  }],
    });
    console.log(updatedWorkOrder);
    const email = updatedWorkOrder.request.user.email;
    const userName = updatedWorkOrder.request.user.username;
    const id = updatedWorkOrder.request.user.id;
    const updateWorkOrder = await WorkOrder.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(email);
    const status = updateWorkOrder.status;
    console.log(status);
    const invoiceAmount = updateWorkOrder.invoiceamount;

    if (status == "In Progress"){
      await courier.send({
        message: {
          to: {
            data: {
              name: 'id',
            },
            email: email,
          },
          content: {
            title: "WE ARE ON IT",
            body: "Hello, \n\n" + userName + " of Twin Pines Apartments, your request has been recieved and a worker is on the way! \n Thanks,\nTwin Pines Management",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
    } else if (status == 'Completed') {
      console.log("email");
      await courier.send({
        message: {
          to: {
            data: {
              name: 'id',
            },
            email: email,
          },
          content: {
            title: "Invoice",
            body: "Hello, \n " + userName + " of Twin Pines Apartments, your request has been completed and a invoice of $" + invoiceAmount + " will be sent out in the upcoming week!, \nThanks,\nTwin Pines Management",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
    }

  } catch (err) {
    console.log(err);
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
