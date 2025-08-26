import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
    {
  company: { type: String, required: true },
  role: { type: String, required: true },
  skills: { type: String, required: true },
  salary: { type: String, required: true },
  lastDate: { type: Date, required: true },
  education: { type: String, required: true },
   experience: { type: String, required: true }, 
  workType: { type: String, enum: ['WFH', 'WFO', 'Hybrid'], required: true },
  location: { type: String, required: true },
  applyUrl: { type: String, required: true }
}, { timestamps: true });

export const Career = mongoose.model('Career', careerSchema);
