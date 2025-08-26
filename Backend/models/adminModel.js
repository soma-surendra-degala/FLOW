// adminModel.js
import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,  // hashed
});
export default mongoose.model('Admin', adminSchema);