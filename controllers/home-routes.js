const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
    username: req.session.username,
    isAdmin: req.session.isAdmin,
  });
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  // }
  res.render("login");
});

router.get("/signup", (req, res) => {
  // if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  // }
  res.render("signup");
});

router.get("/new-request", (req, res) => {
  res.render("new-request", {
    logged_in: req.session.logged_in,
    username: req.session.username,
  });
});

module.exports = router;
