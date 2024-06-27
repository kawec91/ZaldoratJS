// models/sublocation.model.js
import mongoose from 'mongoose';

const sublocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  file: { type: String, required: true },
  description: { type: String, required: true }
});

const Sublocation = mongoose.model('Sublocation', sublocationSchema);

export default Sublocation;
