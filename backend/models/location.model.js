// models/location.model.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  file: { type: String, required: true },
  description: { type: String, required: true },
  sublocations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sublocation' }] // Lista referencji do podlokacji
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
