const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/users", (req, res, next) => {
  User.findAll().then((users) => res.json(users));
});

router.post("/users", (req, res, next) => {
  User.create(req.body)
    .then((user) => res.sendStatus(201))
    .catch((err) => console.log(err));
});

router.post("/sign-in", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.post("/sign-out", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get("/users/:id", (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.put("/users/:id", (req, res, next) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendState(301))
    .catch((err) => console.log(err));
});

router.get("/me", (req, res) => {
  if (req.user) res.send(req.user);
});

module.exports = router;
