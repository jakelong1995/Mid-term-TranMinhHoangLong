import {
  findUsersBy,
  insertUser,
  countUsers,
  updateUserBy,
  deleteUserBy,
} from "../services/userService.js";
import cloudinaryUploadImage from "../helpers/cloudinaryUploadImage.js";

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await findUsersBy(userId);
  return res.json({
    msg: "success",
    data: user,
  });
};

const getAllUsers = async (req, res) => {
  const { query } = req;
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const result = await findUsersBy({
    filters: {},
    pagination: { limit, skip },
  });

  const total = await countUsers();

  return res.json({
    msg: "success",
    data: result,
    pagination: {
      page,
      limit,
      totalItems: total,
      totalPage: Math.ceil(total / limit),
    },
  });
};

const getUsersBy = (req, res) => {
  const { body } = req;
  let result = null;
  if (body) {
    const { filters } = body;
    if (filters) {
      result = findUsersBy({ filters });
    }
  }
  return res.json({
    msg: "success",
    data: result,
  });
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const result = await updateUserBy(userId, body);
  return res.status(202).json({
    msg: "success",
    data: result,
  });
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  await deleteUserBy(userId);
  return res.status(204).end();
};

const createUsers = async (req, res) => {
  const users = req.body;
  const result = {
    success: [],
    fail: [],
  };

  for (const user of users) {
    const { fullname, gender, email } = user;
    if (!fullname || !gender || !email) {
      result.fail.push({ ...user, reason: "Missing required fields" });
      continue;
    }

    try {
      const insertedUser = await insertUser(user);
      if (insertedUser) {
        result.success.push(insertedUser);
      } else {
        result.fail.push({ ...user, reason: "Insertion failed" });
      }
    } catch (error) {
      s;
      console.error("Error inserting user:", error);
      result.fail.push({ ...user, reason: "Server error" });
    }
  }

  const status = result.fail.length > 0 ? 207 : 200; // Multi-Status or OK
  return res.status(status).json({ data: result });
};

const uploadAvatar = async (req, res) => {
  const { decode, file } = req;
  try {
    const resp = await cloudinaryUploadImage(file.path);
    console.log(resp);
    const { secure_url, width, height } = resp;
    // avatar: server/uploads/tenfile.png
    await updateUserBy({ avatar: secure_url }, { uname: decode.uname });
    return res.status(200).json({
      msg: "Upload Success",
      imageUrl: secure_url,
      imageInfo: {
        height,
        width,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Upload Failed" });
  }
};
export default {
  getAllUsers,
  getUserById,
  getUsersBy,
  createUsers,
  updateUserById,
  deleteUserById,
  uploadAvatar,
};
