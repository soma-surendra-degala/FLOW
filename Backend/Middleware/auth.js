import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';   // ✅ make sure you have Admin model
import Student from '../models/studentModel.js'; // ✅ student model too

export const protectStudent = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("❌ No token in request headers for:", req.method, req.originalUrl);
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded payload:", decoded);

    req.student = decoded; // attach student payload
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};




// -------------------- Admin Auth --------------------
export const protectAdmin = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as admin' });
      }

      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};


 