import express from 'express';
import profileController from '../controllers/profileController.js';

const router = express.Router();

// Create a profile (Register)
router.post('/', profileController.createProfile);

// Read profile Information
router.get('/:profileId', profileController.getProfile);

// Update profile Information
router.put('/:profileId', profileController.updateProfile);

// Delete profile Account
router.delete('/:profileId', profileController.deleteProfile);

export default router;
