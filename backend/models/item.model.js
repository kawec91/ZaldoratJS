// backend/models/item.model.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  weight: { type: Number, required: true },
  type: { type: String, required: true },
  slot: { type: String, required: false },
  durability: { type: Number, required: false },
  power: { type: Number, required: false },
  defense: { type: Number, required: false },
  special: { type: String, required: false },
  image: { type: String, required: false } // Add an image field
});

itemSchema.methods.getImageUrl = function() {
  return `/images/items/${this.name.toLowerCase()}.jpg`; // assuming images are stored in `/images/items/`
};

const Item = mongoose.model('Item', itemSchema);

export default Item;
