import express from "express";
import multer from "multer";
import CourseModel from "../models/Course.js";

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CREATE course
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, skills, icon, videoUrl } = req.body; // ✅ include skills
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newCourse = await CourseModel.create({
      title,
      description,
      skills,
      icon,
      videoUrl,
      fileUrl,
    });

    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all courses
router.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE course
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { title, description, skills, icon, videoUrl } = req.body; // ✅ include skills
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;

    const updated = await CourseModel.findByIdAndUpdate(
      req.params.id,
      { title, description, skills, icon, videoUrl, fileUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    await CourseModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
