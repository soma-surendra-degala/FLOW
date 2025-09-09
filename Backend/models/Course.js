import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: false },
  url: { type: String, required: false },  // YouTube link OR uploaded video URL
  isYouTube: { type: Boolean, default: false } // true = YouTube, false = uploaded
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: false },  // original filename
  url: { type: String, required: false }    // file download URL
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    skills: { type: [String], default: [] },
    icon: { type: String },
    videos: { type: [videoSchema], default: [] },
    files: { type: [fileSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
