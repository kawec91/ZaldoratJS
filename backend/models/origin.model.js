import mongoose from 'mongoose';

const originSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  reqRace: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  statsPerk: {
    type: String,
    required: true
  }
});

const Origin = mongoose.model('Origin', originSchema);

export default Origin;
