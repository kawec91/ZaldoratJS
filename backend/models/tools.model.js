const toolsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  // Typ narzędzia: 'crucible', 'tongs'
    durability: { type: Number, default: 100 },  // Trwałość narzędzia
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },  // Właściciel
  });
  
  const ToolsModel = mongoose.model('Tools', toolsSchema);
  
  export default ToolsModel;
  