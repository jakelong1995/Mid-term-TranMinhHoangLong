import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Read User Information
router.get('/:userId', userController.getUser);

// Update User Information
router.put('/:userId', userController.updateUser);

// Delete User Account
router.delete('/:userId', userController.deleteUser);

export default router;
