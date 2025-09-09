import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: false },
  url: { type: String },       // URL for YouTube or uploaded file
  isYouTube: { type: Boolean } // distinguish YouTube vs uploaded video
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    skills: { type: [String], required: true },
    icon: { type: String },
    videos: [videoSchema],
    files: [fileSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
