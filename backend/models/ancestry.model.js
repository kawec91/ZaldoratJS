import mongoose from 'mongoose';

// Schemat umiejętności rzemieślniczych
const craftingAbilitiesSchema = new mongoose.Schema({
  smithing: { type: Number, default: 3 },
  smelting: { type: Number, default: 3 },
  tailoring: { type: Number, default: 3 },
  taming: { type: Number, default: 3 },
  animal_husbandry: { type: Number, default: 3 },
  carpenter: { type: Number, default: 3 },
  mining: { type: Number, default: 3 },
  alchemy: { type: Number, default: 3 },
  healing_herbalism: { type: Number, default: 3 },
  runemaking: { type: Number, default: 3 },
  jewlery: { type: Number, default: 3 },
  woodcutting: { type: Number, default: 3 },
  cooking: { type: Number, default: 3 },
  trading: { type: Number, default: 3 },
  farming: { type: Number, default: 3 },
});

// Schemat umiejętności bojowych
const fightingAbilitiesSchema = new mongoose.Schema({
  dodge: { type: Number, default: 3 },
  swords: { type: Number, default: 3 },
  axes: { type: Number, default: 3 },
  maces: { type: Number, default: 3 },
  polearms: { type: Number, default: 3 },
  bows: { type: Number, default: 3 },
  magic: { type: Number, default: 3 },
  shielding: { type: Number, default: 3 },
  stealing: { type: Number, default: 3 },
  vampire: { type: Number, default: 3 },
  necromancy: { type: Number, default: 3 },
});

const ancestrySchema = new mongoose.Schema({
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true }, // Odwołanie do rasy
  name: { type: String, required: true },
  description: { type: String, required: true },
  stats: {
    crafting: craftingAbilitiesSchema,
    fighting: fightingAbilitiesSchema,
  },
});

const AncestryModel = mongoose.model('Ancestry', ancestrySchema);

export default AncestryModel;
