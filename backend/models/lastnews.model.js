import mongoose from 'mongoose';

const lastNewsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const LastNews = mongoose.model('LastNews', lastNewsSchema);

export default LastNews;
