import jwt from "jsonwebtoken";
import User from "../models/user.js";
const authMdw = async (req, res, next) => {
  try {
    // Get the JWT token from the Authorization header
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    // Retrieve user information from the database
    const user = await User.findById(id);

    // Attach user information to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        error: {
          msg: error.message,
          stack: error.stack,
        },
      });
    }
  }
};

export default authMdw;
