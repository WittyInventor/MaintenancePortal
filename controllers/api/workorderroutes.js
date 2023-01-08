const router = require("express").Router();
const WorkOrder = require("../../models/WorkOrder");
const Request = require("../../models/Request");
const User = require("../../models/User");
const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({
  authorizationToken: "dk_prod_V8GFXWN971MTWVPVPX5GGBH9HY4F",
}); // get from the Courier UI

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
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE a workorder
router.put("/:id", async (req, res) => {
  try {
    console.log("Update workorder", req.body);
    const workorderData = await WorkOrder.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updatedWorkOrder = await WorkOrder.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Request, include: [{ model: User }] }],
    });

    if (req.body.status == "Completed") {
      const workorder = await WorkOrder.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: Request }],
      });

      await Request.update(
        { status: "Closed" },
        {
          where: {
            id: workorder.request.id,
          },
        }
      );
    }

    sendEmail(updatedWorkOrder);
    res.status(200).json(workorderData);
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

const sendEmail = async (workorder) => {
  let message;
  let title;

  switch (workorder.status) {
    case "In Progress":
      title = "WE'RE ON IT!";
      message =
        "Hello, \n\n" +
        workorder.request.user.username +
        " of Twin Pines Apartments, your request has been received and worker " + workorder.assignedto + " is on the way! \n Thanks,\nTwin Pines Management";
      break;
    case "Completed":
      title = "INVOICE";
      message =
        "Hello, \n " +
        workorder.request.user.username +
        " of Twin Pines Apartments, your request has been completed and a invoice of $" +
        workorder.invoiceamount +
        " will be sent out in the upcoming week!, \nThanks,\nTwin Pines Management";
      break;
    default:
      title = "WORK ORDER UPDATE";
      message =
        "Hello, \n\n" +
        workorder.request.user.username +
        " of Twin Pines Apartments, your request has been updated! New satus: " +
        workorder.status +
        "\n Thanks,\nTwin Pines Management";
      break;
  }

  // Add request summary to message
  message +=
    "\n\nRequest: \n" +
    workorder.request.categorymaintenance +
    " (" +
    workorder.request.description +
    "). Submitted on " +
    workorder.request.createdAt +
    ".";

  console.log("email", workorder.request.user.email);
  console.log(message);
  await courier.send({
    message: {
      to: {
        data: {
          name: "id",
        },
        email: workorder.request.user.email,
      },
      content: {
        title: title,
        body: message,
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
};

module.exports = router;
