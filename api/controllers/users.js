const User = require("../models/User");

usersController = {

  getUsers(req, res, next) {
    User.findAll().then((users) => res.json(users));
  },

  getOneUser(req, res, next) {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  },

  createUser(req, res, next) {
    User.create(req.body)
      .then((user) => res.sendStatus(201))
      .catch((err) => console.log(err));
  },

  updateUser(req, res, next) {
    User.update(req.body, { where: { id: req.params.id } })
      .then(() => res.sendState(301))
      .catch((err) => console.log(err));
  },
};

module.exports = usersController