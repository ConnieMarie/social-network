// const User = require("../../models/User");
// const Thought = require("../../models/Thought");
const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Set up GET all and POST at /api/thoughts
router
    .route("/")
    .get(getAllThought)
    .post(createThought);

// Set up GET one, and PUT at api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought);
    

//Set up DELETE at api/thoughts/:thoughtId/:userId
router
    .route("/:thoughtId/users/:userId")
    .delete(deleteThought);

// Set up POST at /api/thoughts/:thoughtId/reactions
router
    .route("/:thoughtId/reactions")
    .post(addReaction);

// Set up DELETE at /api/thoughts/:thoughtId/reactions/reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
