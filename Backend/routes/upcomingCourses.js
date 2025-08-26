import express from "express";
import UpcomingCourse from "../models/UpcomingCourses.js"; // ✅ Add .js extension for ESM

const router = express.Router();

// GET all upcoming courses
router.get("/", async (req, res) => {
  try {
    const courses = await UpcomingCourse.find().sort({ startDate: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new course
router.post("/", async (req, res) => {
  try {
    const { title, description, startDate, duration, skills } = req.body;

    const course = new UpcomingCourse({
      title,
      description: description || "",
      startDate,
      duration,
      skills: Array.isArray(skills)
        ? skills
        : skills
        ? skills.split(",").map((s) => s.trim())
        : [],
    });

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update course
router.put("/:id", async (req, res) => {
  try {
    const { title, description, startDate, duration, skills } = req.body;

    const course = await UpcomingCourse.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description: description || "",
        startDate,
        duration,
        skills: Array.isArray(skills)
          ? skills
          : skills
          ? skills.split(",").map((s) => s.trim())
          : [],
      },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    await UpcomingCourse.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; // ✅ Important for ES Modules
