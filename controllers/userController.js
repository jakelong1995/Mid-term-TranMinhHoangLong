// Import necessary modules and the User model
import User from '../models/user.js';

// Controller functions
const userController = {
  // Create a new user (Register)
  createUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { email, fullName, dob, pob, nationality, password } = req.body;
      
        // Check if any required field is missing or empty
        if (!email || !fullName || !dob || !pob || !nationality || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }

      // Create a new user instance
      const newUser = new User({
        email,
        fullName,
        dob,
        pob,
        nationality,
        password,
      });

      // Save the new user to the database
      await newUser.save();

      // Send a success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle errors
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'An error occurred while creating user' });
    }
  },

  // Read user information
  getUser: async (req, res) => {
    try {
      // Extract user ID from request parameters
      const userId = req.params.userId;
      
      // Find the user by ID in the database
      const user = await User.findById(userId);

      // If user not found, return a 404 response
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send user data as response
      res.status(200).json({ user });
    } catch (error) {
      // Handle errors
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'An error occurred while fetching user' });
    }
  },

  // Update user information
  updateUser: async (req, res) => {
    try {
      // Extract user ID from request parameters
      const userId = req.params.userId;
      
      // Find the user by ID in the database and update
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

      // If user not found, return a 404 response
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send updated user data as response
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      // Handle errors
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'An error occurred while updating user' });
    }
  },

  // Delete user account
  deleteUser: async (req, res) => {
    try {
      // Extract user ID from request parameters
      const userId = req.params.userId;
      
      // Find the user by ID in the database and delete
      const deletedUser = await User.findByIdAndDelete(userId);

      // If user not found, return a 404 response
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send success response
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'An error occurred while deleting user' });
    }
  }
};

export default userController;
