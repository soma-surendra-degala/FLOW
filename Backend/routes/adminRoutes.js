import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Course from '../models/Course.js';
import Practice from '../models/Practice.js';
import Student from '../models/studentModel.js';
import Admin from '../models/adminModel.js';   // ✅ you forgot this import
import { protectAdmin } from '../Middleware/auth.js';  // ✅ protect admin-only routes

const router = express.Router();

// ------------------- Admin Login -------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Generate token with role: 'admin'
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, admin });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------- Dashboard Stats -------------------
router.get('/stats', protectAdmin, async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalPractices = await Practice.countDocuments();
    const totalStudents = await Student.countDocuments();

    res.json({ totalCourses, totalPractices, totalStudents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------- Recent Activity -------------------
router.get('/recent-activity', protectAdmin, async (req, res) => {
  try {
    const latestStudent = await Student.findOne().sort({ createdAt: -1 });
    const latestCourse = await Course.findOne().sort({ createdAt: -1 });
    const latestPractice = await Practice.findOne().sort({ createdAt: -1 }); // ✅ should be -1 (most recent)

    res.json({
      recentActivity: [
        `🎓 New student registered: ${latestStudent?.name || 'N/A'}`,
        `📘 New course added: ${latestCourse?.title || 'N/A'}`,
        `📝 Recent practice: ${latestPractice?.title || 'N/A'}`
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------- Recent Students (last 3) -------------------
router.get('/recent-students', protectAdmin, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }).limit(3);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
