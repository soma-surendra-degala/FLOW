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
router.post("/", upload.array("files", 10), async (req, res) => {
  try {
    const { title, description, skills, icon, videos } = req.body;

    // Handle uploaded files
    const files = req.files
      ? req.files.map((f) => ({ name: f.originalname, url: `/uploads/${f.filename}` }))
      : [];

    // Parse skills
    const skillArray = typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : skills || [];

    // Parse videos
    let parsedVideos = [];
    if (videos) {
      parsedVideos = typeof videos === "string" ? JSON.parse(videos) : videos;
      // Ensure each video has isYouTube flag
      parsedVideos = parsedVideos.map(v => ({
        title: v.title || "",
        url: v.url || "",
        isYouTube: v.url?.includes("youtube.com") || v.url?.includes("youtu.be") || false
      }));
    }

    const newCourse = await CourseModel.create({
      title,
      description,
      skills: skillArray,
      icon,
      videos: parsedVideos,
      files
    });

    res.json(newCourse);
  } catch (err) {
    console.error("❌ Error creating course:", err);
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
router.put("/:id", upload.array("files", 10), async (req, res) => {
  try {
    const { title, description, skills, icon, videos, files: existingFiles } = req.body;

    // Handle uploaded files
    const uploadedFiles = req.files
      ? req.files.map((f) => ({ name: f.originalname, url: `/uploads/${f.filename}` }))
      : [];

    // Merge uploaded files with existing files
    const files = [
      ...(existingFiles ? (typeof existingFiles === "string" ? JSON.parse(existingFiles) : existingFiles) : []),
      ...uploadedFiles
    ];

    // Parse skills
    const skillArray = typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : skills || [];

    // Parse videos
    let parsedVideos = [];
    if (videos) {
      parsedVideos = typeof videos === "string" ? JSON.parse(videos) : videos;
      parsedVideos = parsedVideos.map(v => ({
        title: v.title || "",
        url: v.url || "",
        isYouTube: v.url?.includes("youtube.com") || v.url?.includes("youtu.be") || false
      }));
    }

    const updated = await CourseModel.findByIdAndUpdate(
      req.params.id,
      { title, description, skills: skillArray, icon, videos: parsedVideos, files },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating course:", err);
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
