const mongoose = require("mongoose");

const upcomingCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  description: { type: String, required: true },
  skills: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("UpcomingCourse", upcomingCourseSchema);
