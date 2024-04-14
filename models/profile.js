import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: [String],
  hobbies: [String],
  targets: [String],
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
