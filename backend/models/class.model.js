import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
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

const Class = mongoose.model('Class', classSchema);

export default Class;
