import mongoose from 'mongoose';

const raceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  attributes: {
    strength: Number,
    agility: Number,
    vitality: Number,
    intelligence: Number,
  },
}, { timestamps: true });

const Race = mongoose.model('Race', raceSchema);

export default Race;
