import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  personalSkills: [String],
  hobbies: String,
  personalGoals: [String],
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
