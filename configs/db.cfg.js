import mongoose from "mongoose";
import dotenv from "dotenv";

const uri = `mongodb+srv://${process.env.MONGODB_DB_NAME}:${process.env.MONGODB_PWD}@cluster0.djglaud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
