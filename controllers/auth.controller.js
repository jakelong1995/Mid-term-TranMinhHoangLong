import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import moment from "moment";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User is not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log(user);
  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.fullname,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRED_TIME,
  });
  return res.status(200).json({
    msg: "Login successfully!",
    token,
  });
};

export const register = async (req, res) => {
  const {
    email,
    password,
    fullname = null,
    birthday = null,
    hometown = null,
    nation = "Vietnam",
  } = req.body;

  // 1. Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (birthday && !moment(birthday, "MM/DD/YYYY").isValid()) {
    return res.status(400).json({ message: "Invalid birthday date!" });
  }

  // 2. Check if user exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({ message: "User already exists!" });
  }
  // 3. hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. create user
  const newUser = new User({
    email,
    password: hashedPassword,
    fullname,
    birthday,
    hometown,
    nation,
  });
  const savedUser = await newUser.save();

  return res.status(200).json({
    msg: "Register successfully!",
  });
};
