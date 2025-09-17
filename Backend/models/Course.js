import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: false },
  url: { type: String, required: false },
  isYouTube: { type: Boolean, default: false }
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: false }, 
  url: { type: String, required: false } 

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
