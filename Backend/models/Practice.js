const mongoose = require("mongoose");

const userSolutionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  solutionText: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const practiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },
    categories: {
      type: [String],
      enum: [
        "Mathematics",
        "Algorithms",
        "C",
        "C++",
        "Java",
        "Python",
        "Data Structures",
        "JavaScript",
        "TypeScript",
        "Regex"
      ],
      default: []
    },
    solution: { type: String, default: "" }, // Official solution
    userSolutions: [userSolutionSchema] // ✅ Correct array for user submissions
  },
  { timestamps: true }
);

module.exports = mongoose.model("Practice", practiceSchema);
