import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.cfg.js";

connectDB().then();
// Connect to MongoDB database
const PORT = process.env.PORT || 4001;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
