import mongoose from 'mongoose';

const smelterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  furnace: { type: mongoose.Schema.Types.ObjectId, ref: 'Furnace' },  // Odwołanie do modelu pieca
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },  // Właściciel
});

const SmelteryModel = mongoose.model('Smeltery', smelterySchema);

export default SmelteryModel;
