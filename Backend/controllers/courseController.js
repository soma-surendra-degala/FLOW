import Course from "../models/Course.js";

// GET all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
};
