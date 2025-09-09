import express from "express";
import multer from "multer";
import CourseModel from "../models/Course.js";

const router = express.Router();

// ---------- Multer Storage ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ---------- CREATE Course ----------
router.post(
  "/",
  upload.fields([
    { name: "files", maxCount: 10 },
    { name: "videoFiles", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { title, description, skills, icon, videos } = req.body;

      // Parse skills
      const skillArray =
        typeof skills === "string"
          ? skills.split(",").map((s) => s.trim())
          : skills || [];

      // Parse YouTube videos
      let parsedVideos = [];
      if (videos) {
        parsedVideos =
          typeof videos === "string" ? JSON.parse(videos) : videos;
        parsedVideos = parsedVideos.map((v) => ({
          title: v.title || "",
          url: v.url || "",
          isYouTube:
            v.url?.includes("youtube.com") || v.url?.includes("youtu.be") || false,
        }));
      }

      // Handle uploaded video files
      let uploadedVideos = [];
      if (req.files["videoFiles"]) {
        uploadedVideos = req.files["videoFiles"].map((f) => ({
          title: f.originalname,
          url: `/uploads/${f.filename}`,
          isYouTube: false,
        }));
      }

      // Handle uploaded documents
      const uploadedFiles = req.files["files"]
        ? req.files["files"].map((f) => ({
            name: f.originalname,
            url: `/uploads/${f.filename}`,
          }))
        : [];

      // Create course
      const newCourse = await CourseModel.create({
        title,
        description,
        skills: skillArray,
        icon,
        videos: [...parsedVideos, ...uploadedVideos],
        files: uploadedFiles,
      });

      res.json(newCourse);
    } catch (err) {
      console.error("❌ Error creating course:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ---------- READ All Courses ----------
router.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- UPDATE Course ----------
router.put(
  "/:id",
  upload.fields([
    { name: "files", maxCount: 10 },
    { name: "videoFiles", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { title, description, skills, icon, videos, files: existingFiles } =
        req.body;

      // Skills
      const skillArray =
        typeof skills === "string"
          ? skills.split(",").map((s) => s.trim())
          : skills || [];

      // Existing files (from frontend)
      const existingFilesArray = existingFiles
        ? typeof existingFiles === "string"
          ? JSON.parse(existingFiles)
          : existingFiles
        : [];

      // Uploaded new docs
      const uploadedFiles = req.files["files"]
        ? req.files["files"].map((f) => ({
            name: f.originalname,
            url: `/uploads/${f.filename}`,
          }))
        : [];

      const mergedFiles = [...existingFilesArray, ...uploadedFiles];

      // Parse YouTube videos
      let parsedVideos = [];
      if (videos) {
        parsedVideos =
          typeof videos === "string" ? JSON.parse(videos) : videos;
        parsedVideos = parsedVideos.map((v) => ({
          title: v.title || "",
          url: v.url || "",
          isYouTube:
            v.url?.includes("youtube.com") || v.url?.includes("youtu.be") || false,
        }));
      }

      // Handle uploaded video files
      let uploadedVideos = [];
      if (req.files["videoFiles"]) {
        uploadedVideos = req.files["videoFiles"].map((f) => ({
          title: f.originalname,
          url: `/uploads/${f.filename}`,
          isYouTube: false,
        }));
      }

      const updated = await CourseModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          skills: skillArray,
          icon,
          videos: [...parsedVideos, ...uploadedVideos],
          files: mergedFiles,
        },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      console.error("❌ Error updating course:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ---------- DELETE Course ----------
router.delete("/:id", async (req, res) => {
  try {
    await CourseModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

