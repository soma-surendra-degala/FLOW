import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    skills: { type: String, required: true },
    icon: { type: String },
    videoUrl: { type: String },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
