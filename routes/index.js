import userRoutes from "./users.js";
import profileRoutes from "./profiles.js";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);

export default router;
