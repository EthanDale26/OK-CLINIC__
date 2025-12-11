// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = async function authMiddleware(req, res, next) {
  // Auth routes that should be PUBLIC (no token needed)
  const publicAuthPaths = [
    '/api/auth/signup',
    '/api/auth/signin',
    '/api/auth/send-signup-code',
    '/api/auth/verify-signup-code',
    '/api/auth/request-reset',
    '/api/auth/verify-reset-code',
    '/api/auth/reset-password',
  ];

  // If current path is in the public list, skip token check
  if (publicAuthPaths.includes(req.originalUrl)) {
    return next();
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      '-password -resetCode -resetCodeExpiry'
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' });
    }

    req.user = user; // available in routes like update-profile
    next();
  } catch (err) {
    console.error('authMiddleware error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
