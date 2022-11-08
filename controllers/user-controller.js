const User = require("../models/User");
const Thought = require("../models/Thought");


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
      _id: req.params.userId
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
    User.findOneAndUpdate({ _id: req.params.userId}, req.body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  //delete user
  // delete user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId}, { $push: { friends: req.params.friendId }}, { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { friends: req.params.friendId }}, { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
};

module.exports = userController;
