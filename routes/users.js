import express from "express";
import userController from "../controllers/userController.js";
import { imageUploadLocal } from "../middlewares/uploadImageToLocal.js";

const router = express.Router();

// Add Users
router.post("/", userController.createUsers);

// Get all User Information
router.get("/", userController.getAllUsers);

// Read User Information
router.get("/:userId", userController.getUserById);

// Update User Information
router.put("/:userId", userController.updateUserById);

// Delete User Account
router.delete("/:userId", userController.deleteUserById);

// Upload Avatar
router.post("/upload/", imageUploadLocal, userController.uploadAvatar);

export default router;
