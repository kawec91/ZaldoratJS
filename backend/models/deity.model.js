import mongoose from 'mongoose';

const deitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Deity = mongoose.model('Deity', deitySchema);

export default Deity;
