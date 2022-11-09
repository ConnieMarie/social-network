const User = require("../models/User");
const Thought = require("../models/Thought");


const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find()
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        // .populate({
        //     path: "reactions",
        // })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
      },

      createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findByIdAndUpdate({ _id: req.body.userId }, { $push: { thoughts: _id } }, { new: true });
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id."});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
      },

      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, req.body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: "No thought with this id."})
            }
            return User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id."});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    addReaction(req, res) {},

    deleteReaction(req, res) {},
}

module.exports = thoughtController;