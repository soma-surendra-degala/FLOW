// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     skills: { type: String, required: true },
//     icon: { type: String },
//     videoUrl: { type: String },
//     fileUrl: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Course", courseSchema);
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: false },
  url: { type: String, required: true }
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    skills: { type: [String], required: true }, // ✅ now array of strings
    icon: { type: String },
    videos: [videoSchema], // ✅ multiple videos
    files: [fileSchema],   // ✅ multiple files
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
