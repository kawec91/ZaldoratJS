import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  customId: {
    type: String,
    unique: true,
    sparse: true, // Allows customId to be optional
  },
});

const ResourceModel = mongoose.model('Resource', resourceSchema);

export default ResourceModel;
