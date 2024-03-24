import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profiles.js";
import authMiddleware from "./middleware/authMiddleware.js";

// Load environment variables from a .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB database
const PORT = process.env.PORT || 4001;
const uri = `mongodb+srv://${process.env.MONGODB_DB_NAME}:${process.env.MONGODB_PWD}@cluster0.djglaud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", authMiddleware, profileRoutes);

// Connect to MongoDB database
mongoose
  .connect(uri)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
