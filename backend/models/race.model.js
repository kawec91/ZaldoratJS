import mongoose from "mongoose";

const raceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attributes: {
      strength: { type: Number, default: 0 },
      agility: { type: Number, default: 0 },
      vitality: { type: Number, default: 0 },
      intelligence: { type: Number, default: 0 },
    },
    xpMultipliers: {
      stats: {
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
      },
      craftingAbilities: {
        smithing: { type: Number, default: 1.0 },
        smelting: { type: Number, default: 1.0 },
        tailoring: { type: Number, default: 1.0 },
        taming: { type: Number, default: 1.0 },
        animalHusbandry: { type: Number, default: 1.0 },
        carpenter: { type: Number, default: 1.0 },
        mining: { type: Number, default: 1.0 },
        alchemy: { type: Number, default: 1.0 },
        healingHerbalism: { type: Number, default: 1.0 },
        runemaking: { type: Number, default: 1.0 },
        jewelry: { type: Number, default: 1.0 },
        woodcutting: { type: Number, default: 1.0 },
        cooking: { type: Number, default: 1.0 },
        trading: { type: Number, default: 1.0 },
        farming: { type: Number, default: 1.0 },
      },
      fightingAbilities: {
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
      }
    },
  },
  { timestamps: true }
);

const Race = mongoose.model("Race", raceSchema);

export default Race;
