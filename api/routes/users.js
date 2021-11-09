const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getOneUser);

router.put("/:id", updateUser);

module.exports = router;
