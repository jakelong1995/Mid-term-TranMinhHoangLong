import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  birthday: {
    type: String,
  },
  hometown: {
    type: String,
  },
  nation: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  pwd: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
