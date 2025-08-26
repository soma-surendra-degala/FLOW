  import express from "express";
  import Student from "../models/studentModel.js";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import { protectStudent } from "../Middleware/auth.js";
  import multer from "multer";
  import path from "path";

  const router = express.Router();

  // ---------------- Multer Setup ----------------
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // make sure uploads/ folder exists
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  });

  // ---------------- REGISTER ----------------
  router.post("/register", async (req, res) => {
    try {
      const { name, email, password, location, gender } = req.body;

      const existing = await Student.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await Student.create({
        name,
        email,
        password: hashedPassword,
        status: "Active",
        location: location || "",
        gender,
      });

      res.status(201).json({ message: "Registered successfully", student });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- LOGIN ----------------
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ email });
      if (!student) return res.status(400).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, student.password);
      if (!match) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: student._id, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Convert avatar path to full URL
      const studentObj = student.toObject();
      if (studentObj.avatar && !studentObj.avatar.startsWith("http")) {
        studentObj.avatar = `http://localhost:5000${studentObj.avatar}`;
      }

      res.json({ token, student: studentObj });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- PROFILE ----------------
router.get('/profile', protectStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select(
      'name email college course year phone location gender avatar'
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});



  router.put("/profile", protectStudent, upload.single("avatar"), async (req, res) => {
    try {
      const updatedData = {};

      ["college", "course", "year", "phone"].forEach((field) => {
        if (req.body[field] !== undefined) updatedData[field] = req.body[field];
      });

      if (req.file) updatedData.avatar = `/uploads/${req.file.filename}`;

      const student = await Student.findByIdAndUpdate(
        req.user.id,
        { $set: updatedData },
        { new: true, select: "-password" }
      );

      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ---------------- GET ALL STUDENTS ----------------
  router.get("/", async (req, res) => {
    try {
      const students = await Student.find({}, "-password");
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- GET STATS ----------------
  router.get("/stats", async (req, res) => {
    try {
      const totalStudents = await Student.countDocuments();
      const activeStudents = await Student.countDocuments({ status: "Active" });
      res.json({ totalStudents, activeStudents });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- GET STUDENT BY ID ----------------
  router.get("/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id, "-password");
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- GET STUDENT BY CUSTOM ID ----------------
  router.get("/custom/:id", async (req, res) => {
    try {
      const student = await Student.findOne({ studentId: req.params.id }, "-password");
      if (!student) return res.status(404).json({ message: "Not found" });
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ---------------- UPDATE STUDENT (ADMIN) ----------------
  router.put("/:id", async (req, res) => {
    try {
      const { status, location, gender } = req.body;
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { status, location, gender },
        { new: true, select: "-password" }
      );
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  export default router;
