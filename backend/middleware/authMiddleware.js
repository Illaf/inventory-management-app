import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// Middleware to protect routes (requires valid token)
const protect = asyncHandler(async (req, res, next) => {
  let token;
// Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, token missing' });
  }
});


// Middleware to allow only admin access
const admin = (req, res, next) => {
    if (req.user && req.user.admin == null) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };

export { protect, admin };
