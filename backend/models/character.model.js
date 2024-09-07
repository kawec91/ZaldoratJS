import mongoose from "mongoose";

// Schemat statystyk
const statsSchema = new mongoose.Schema({
  power: { type: Number, default: 3 },
  defence: { type: Number, default: 3 },
  speed: { type: Number, default: 3 },
  agility: { type: Number, default: 3 },
  vitality: { type: Number, default: 3 },
  blood: { type: Number, default: 3 },
  hp: { type: Number, default: 3 },
  max_hp: { type: Number, default: 3 },
  critical: { type: Number, default: 3 },
  luck: { type: Number, default: 3 },
});

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
  jewelry: { type: Number, default: 3 },
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
  lightarmor: { type: Number, default: 3 },
  mediumarmor: { type: Number, default: 3 },
  heavyarmor: { type: Number, default: 3 },
  stealing: { type: Number, default: 3 },
  vampire: { type: Number, default: 3 },
  necromancy: { type: Number, default: 3 },
});

// Sekcja mnożników
const multipliersSchema = new mongoose.Schema({
  power: { type: Number, default: 1.0 },
  defence: { type: Number, default: 1.0 },
  speed: { type: Number, default: 1.0 },
  agility: { type: Number, default: 1.0 },
  vitality: { type: Number, default: 1.0 },
  blood: { type: Number, default: 1.0 },
  hp: { type: Number, default: 1.0 },
  max_hp: { type: Number, default: 1.0 },
  critical: { type: Number, default: 1.0 },
  luck: { type: Number, default: 1.0 },
  smithing: { type: Number, default: 1.0 },
  smelting: { type: Number, default: 1.0 },
  tailoring: { type: Number, default: 1.0 },
  taming: { type: Number, default: 1.0 },
  animal_husbandry: { type: Number, default: 1.0 },
  carpenter: { type: Number, default: 1.0 },
  mining: { type: Number, default: 1.0 },
  alchemy: { type: Number, default: 1.0 },
  healing_herbalism: { type: Number, default: 1.0 },
  runemaking: { type: Number, default: 1.0 },
  jewelry: { type: Number, default: 1.0 },
  woodcutting: { type: Number, default: 1.0 },
  cooking: { type: Number, default: 1.0 },
  trading: { type: Number, default: 1.0 },
  farming: { type: Number, default: 1.0 },
  dodge: { type: Number, default: 1.0 },
  swords: { type: Number, default: 1.0 },
  axes: { type: Number, default: 1.0 },
  maces: { type: Number, default: 1.0 },
  polearms: { type: Number, default: 1.0 },
  bows: { type: Number, default: 1.0 },
  magic: { type: Number, default: 1.0 },
  shielding: { type: Number, default: 1.0 },
  lightarmor: { type: Number, default: 1.0 },
  mediumarmor: { type: Number, default: 1.0 },
  heavyarmor: { type: Number, default: 1.0 },
  stealing: { type: Number, default: 1.0 },
  vampire: { type: Number, default: 1.0 },
  necromancy: { type: Number, default: 1.0 },
  _id: { type: String },
});

// Główny schemat postaci
const characterSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  character_name: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  ancestry: {
    type: String,
    required: true,
  },
  deity: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  stats: statsSchema,
  crafting_abilities: craftingAbilitiesSchema,
  fighting_abilities: fightingAbilitiesSchema,
  multipliers: multipliersSchema, // Dodano sekcję dla mnożników
  world: {
    type: String,
    required: false,
  },
  deityRank: {
    type: String,
    required: false,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    default: 80,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CharacterModel = mongoose.model("Character", characterSchema);

export default CharacterModel;
