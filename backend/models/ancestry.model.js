import mongoose from 'mongoose';

// Schemat mnożników dla ancestry
const xpMultipliersSchema = new mongoose.Schema({
  power: { type: Number },
  defence: { type: Number },
  speed: { type: Number },
  agility: { type: Number },
  vitality: { type: Number },
  blood: { type: Number },
  hp: { type: Number },
  max_hp: { type: Number },
  critical: { type: Number },
  luck: { type: Number },
  smithing: { type: Number },
  smelting: { type: Number },
  tailoring: { type: Number },
  taming: { type: Number },
  animal_husbandry: { type: Number },
  carpenter: { type: Number },
  mining: { type: Number },
  alchemy: { type: Number },
  healing_herbalism: { type: Number },
  runemaking: { type: Number },
  jewelry: { type: Number },
  woodcutting: { type: Number },
  cooking: { type: Number },
  trading: { type: Number },
  farming: { type: Number },
  dodge: { type: Number },
  swords: { type: Number },
  axes: { type: Number },
  maces: { type: Number },
  polearms: { type: Number },
  bows: { type: Number },
  magic: { type: Number },
  shielding: { type: Number },
  lightarmor: { type: Number },
  mediumarmor: { type: Number },
  heavyarmor: { type: Number },
  stealing: { type: Number },
  vampire: { type: Number },
  necromancy: { type: Number },
});

// Główny schemat ancestry
const ancestrySchema = new mongoose.Schema({
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true }, // Referencja do rasy
  name: { type: String, required: true },
  description: { type: String, required: true },
  xpMultipliers: xpMultipliersSchema, // Mnożniki doświadczenia
});

const AncestryModel = mongoose.model('Ancestry', ancestrySchema);

export default AncestryModel;
