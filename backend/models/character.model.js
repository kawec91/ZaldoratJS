// schemas/character.schema.js
import mongoose from 'mongoose';

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

const characterSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nickname: {
    type: String,
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
  class: {
    type: String,
    required: true,
  },
  ancestry: {
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
  world: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CharacterModel = mongoose.model('Character', characterSchema);

export default CharacterModel;
