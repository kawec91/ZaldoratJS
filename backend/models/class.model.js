import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    xpMultipliers: {
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
    },
  },
  { timestamps: true }
);

const ClassModel = mongoose.model("Class", classSchema);

export default ClassModel;
