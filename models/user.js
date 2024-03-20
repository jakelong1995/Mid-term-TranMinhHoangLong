import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  fullName: String,
  dob: String,
  pob: String,
  nationality: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

export default User;
