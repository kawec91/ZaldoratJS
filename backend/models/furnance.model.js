const furnaceSchema = new mongoose.Schema({
    smeltery: { type: mongoose.Schema.Types.ObjectId, ref: 'Smeltery' },  // Odwołanie do huty
    temperature: { type: Number, default: 0 },  // Aktualna temperatura pieca
    fuelType: { type: String, required: true },  // Typ paliwa np. drewno, węgiel
    maxTemperature: { type: Number, required: true },  // Maksymalna temperatura osiągalna z tym typem paliwa
    fuelAmount: { type: Number, default: 0 },  // Ilość paliwa
    isLit: { type: Boolean, default: false },  // Czy piec jest zapalony
  });
  
  const FurnaceModel = mongoose.model('Furnace', furnaceSchema);
  
  export default FurnaceModel;
  