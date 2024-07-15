import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const backpackSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'big'],
    required: true,
  },
  slots: {
    type: Number,
    required: true,
    default: function () {
      switch (this.size) {
        case 'small':
          return 30;
        case 'medium':
          return 50;
        case 'big':
          return 70;
        default:
          return 30;
      }
    },
  },
  items: [itemSchema],
});

backpackSchema.methods.calculateCurrentWeight = function () {
  return this.items.reduce((total, item) => total + item.weight * item.quantity, 0);
};

const BackpackModel = mongoose.model('Backpack', backpackSchema);

export default BackpackModel;
