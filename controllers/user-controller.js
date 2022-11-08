const User = require("../models/User");


const userController = {
  // get all users
  getAllUser(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by
  getUserById(req, res) {
    User.findOne({
      _id: req.params.id,
    })
      .populate({
        path: 'thoughts'
      })
      .populate({
        path: 'friends'
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate({});
  },

  //delete user
  deleteUser(req, res) {
    User.findOneAndDelete({});
  },

  // delete user's associated thoughts when deleted

  addFriend(req, res) {
    User.findOneAndUpdate({});
  },

  deleteFriend(req, res) {
    User.findOneAndDelete({});
  },
};

module.exports = userController;
