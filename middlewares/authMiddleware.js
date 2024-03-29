import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;

    // Retrieve user information from the database
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user information to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
