import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  

  // extra profile fields
  location: { type: String },           
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  college: { type: String },
  course: { type: String },
  year: { type: String },
  phone: { type: String },
  avatar: { type: String },   // store uploaded file path

}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
