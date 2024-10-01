// models/inventory.model.js
import mongoose from 'mongoose';

const equippedItemsSchema = new mongoose.Schema({
  helmet: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  chest: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  legs: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  boots: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  gloves: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  cape: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  shield: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  backslot: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  ring: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  ring2: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  companion: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
});

const InventoryModel = mongoose.model('Inventory', equippedItemsSchema);
export default InventoryModel;
