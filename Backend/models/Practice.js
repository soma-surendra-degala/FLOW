import mongoose from 'mongoose';

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
    solution: { type: String, default: "" },
    userSolutions: [userSolutionSchema]
  },
  { timestamps: true }
);

const Practice = mongoose.model("Practice", practiceSchema);
export default Practice;
