import userRoutes from "./users.js";
import profileRoutes from "./profiles.js";

router.use("/user", userRoutes);
router.use("/profile", profileRoutes);

export default router;
