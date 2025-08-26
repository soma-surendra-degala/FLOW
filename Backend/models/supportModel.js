// backend/models/supportModel.ts
import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  sender: { type: String, required: true },       // Admin or Student
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: true }); // ✅ ensures each reply has _id

const supportSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  replies: [replySchema], // array of replies
}, {
  timestamps: true // automatically adds createdAt and updatedAt for ticket
});

const Support = mongoose.model('Support', supportSchema);

export default Support;
