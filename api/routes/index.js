const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const passport = require("passport");

router.use("/users", usersRouter);

router.post("/sign-in", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.post("/sign-out", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (req.user) res.send(req.user);
});

module.exports = router;
