// models/origin.model.js

import mongoose from 'mongoose';

const originSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
    power: {
      type: String,
      required: true
    },
    defence: {
      type: String,
      required: true
    },
    agility: {
      type: String,
      required: true
    },
    vitality: {
      type: String,
      required: true
    }
  }
});

const Origin = mongoose.model('Origin', originSchema);

export default Origin;
