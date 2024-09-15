import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.cfg.js";
import router from "./routes/index.js";
import authMdw from "./middlewares/auth.mdw.js";

connectDB().then();
// Connect to MongoDB database
const PORT = process.env.PORT || 4001;

// Initialize Express app
const app = express();

// Middleware
app.use(authMdw);

// Routes
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
