import User from "./../models/user.js";

const findUsersBy = async (userId) => {
  return User.findById(userId);
};

const countUsers = async () => {
  try {
    const total = await User.countDocuments();
    return total;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const insertUser = async (params = {}) => {
  const { fullname, gender, email } = params;
  const newUser = await User({
    fullname,
    gender,
    email,
  });
  await newUser.save();
  return newUser;
};

const updateUserBy = async (userId, params) => {
  return User.findByIdAndUpdate(userId, { $set: params }, { new: true });
};

const deleteUserBy = (userId) => {
  return User.findByIdAndDelete(userId);
};

export { insertUser, findUsersBy, updateUserBy, deleteUserBy, countUsers };
