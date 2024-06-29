import mongoose from 'mongoose';

const changelogSchema = new mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  frontStatus: { type: Boolean, default: false },
  backendStatus: { type: Boolean, default: false },
});

const Changelog = mongoose.model('Changelog', changelogSchema);

export default Changelog;
