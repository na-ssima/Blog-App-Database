const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const newEmail = req.body.email;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { email: newEmail } },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user', error);
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (deletedUser) {
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json(error);
    }
  },
};
