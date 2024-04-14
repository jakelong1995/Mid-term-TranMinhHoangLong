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
    type: Boolean,
    default: 0,
  },
  pwd: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
