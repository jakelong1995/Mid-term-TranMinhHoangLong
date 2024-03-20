// Import necessary modules and the Profile model
import Profile from '../models/profile.js';

// Controller functions
const profileController = {
  // Create a new profile
  createProfile: async (req, res) => {
    try {
      // Extract profile data from the request body
      const { userId, personalSkills, hobbies, personalGoals } = req.body;

      // Create a new profile instance
      const newProfile = new Profile({
        userId,
        personalSkills,
        hobbies,
        personalGoals,
      });

      // Save the new profile to the database
      await newProfile.save();

      // Send a success response
      res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
      // Handle errors
      console.error('Error creating profile:', error);
      res.status(500).json({ message: 'An error occurred while creating profile' });
    }
  },

  // Read profile information
  getProfile: async (req, res) => {
    try {
      // Extract profile ID from request parameters
      const profileId = req.params.profileId;

      // Find the profile by ID in the database
      const profile = await Profile.findById(profileId);

      // If profile not found, return a 404 response
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      // Send profile data as response
      res.status(200).json({ profile });
    } catch (error) {
      // Handle errors
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'An error occurred while fetching profile' });
    }
  },

  // Update profile information
  updateProfile: async (req, res) => {
    try {
      // Extract profile ID from request parameters
      const profileId = req.params.profileId;

      // Find the profile by ID in the database and update
      const updatedProfile = await Profile.findByIdAndUpdate(profileId, req.body, { new: true });

      // If profile not found, return a 404 response
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      // Send updated profile data as response
      res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
      // Handle errors
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'An error occurred while updating profile' });
    }
  },

  // Delete profile
  deleteProfile: async (req, res) => {
    try {
      // Extract profile ID from request parameters
      const profileId = req.params.profileId;

      // Find the profile by ID in the database and delete
      const deletedProfile = await Profile.findByIdAndDelete(profileId);

      // If profile not found, return a 404 response
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      // Send success response
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error deleting profile:', error);
      res.status(500).json({ message: 'An error occurred while deleting profile' });
    }
  }
};

export default profileController;
