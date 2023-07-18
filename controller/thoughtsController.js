const Thought = require('../models/thoughts');
const User = require('../models/user');

module.exports = {
  // GET /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET /api/thoughts/:thoughtId
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST /api/thoughts
  async createThought(req, res) {
    try {
      const { thoughtText, userId } = req.body;

      const thought = await Thought.create({ thoughtText, userId });

      // Add the thought ID to the user's thoughts array
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT /api/thoughts/:thoughtId
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE /api/thoughts/:thoughtId
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Remove the thought ID from the user's thoughts array
      await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: deletedThought._id } });

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST /api/thoughts/:thoughtId/reactions
  async addReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      thought.reactions.push({ reactionBody, username });
      const updatedThought = await thought.save();

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString() !== req.params.reactionId
      );

      const updatedThought = await thought.save();

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
