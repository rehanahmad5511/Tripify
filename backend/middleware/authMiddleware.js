const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// Load secret key from environment variables
const JWT_SECRET = process.env.JWT;

if (!JWT_SECRET) {
  throw new Error("Missing JWT secret. Set 'JWT' in your .env file.");
}

// Middleware for normal users
const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error('User Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

// Middleware for admins
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('isAdmin');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error('Admin Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

// Middleware for activity organizers
const organizerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('type');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.type !== 'eventOrganizer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error('Organizer Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = {
  userMiddleware,
  adminMiddleware,
  organizerMiddleware,
};
