import express from 'express';
import jwt from 'jsonwebtoken';
import Profile from '../models/profile.js';
import User from '../models/user.js';

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send('Unauthorized');
  }
};

router.use(authMiddleware);

router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    // Check if the profile belongs to the logged-in user
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Access denied');
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching profile');
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    // Check if the profile belongs to the logged-in user
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Access denied');
    }
    // Update profile fields
    // ...
    await profile.save();
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating profile');
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    // Check if the profile belongs to the logged-in user
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Access denied');
    }
    await profile.remove();
    res.status(200).send('Profile deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting profile');
  }
});

export default router;
