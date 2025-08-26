import mongoose from "mongoose";

const upcomingCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const UpcomingCourse = mongoose.model("UpcomingCourse", upcomingCourseSchema);

export default UpcomingCourse; // ✅ ESM export
