import mongoose from 'mongoose';

const fuelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxTemperature: { type: Number, required: true },
  burnTime: { type: Number, required: true },  // Czas palenia, jeśli potrzebny
});

const FuelModel = mongoose.model('Fuel', fuelSchema);

export default FuelModel;
