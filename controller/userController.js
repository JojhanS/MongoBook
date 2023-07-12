const User = require('../models/user')

module.exports = {
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          console.error(err); // Log the error for debugging purposes
          res.status(500).json(err);
        }
      },
      
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Remove a user by _id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.userId);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
