import Race from '../class/race.js';
import RaceModel from '../models/race.model.js';

export const createRace = async (req, res) => {
  try {
    const raceData = req.body;
    const race = new Race(raceData);
    const raceDBObject = race.toDBObject();

    const newRace = new RaceModel(raceDBObject);
    const savedRace = await newRace.save();

    res.status(201).json(savedRace);
  } catch (error) {
    console.error("Error creating race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRace = async (req, res) => {
  try {
    const { id } = req.params;

    const race = await RaceModel.findById(id);

    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.status(200).json(race);
  } catch (error) {
    console.error("Error fetching race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRace = async (req, res) => {
  try {
    const { id } = req.params;
    const race = await RaceModel.findByIdAndDelete(id);

    if (!race) {
      return res.status(404).json({ error: 'Race not found' });
    }

    res.status(200).json({ message: 'Race deleted successfully' });
  } catch (error) {
    console.error('Error deleting race:', error);
    res.status(500).json({ error: 'Error deleting race' });
  }
};

// @desc    Get all races
// @route   GET /api/races/getall
export const getAllRaces = async (req, res) => {
  try {
    const races = await RaceModel.find();
    res.status(200).json(races);
  } catch (error) {
    console.error("Error in getAllRaces controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Update specific fields of a race
// @route   PATCH /api/races/:id
export const updateRace = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const race = await RaceModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.status(200).json(race);
  } catch (error) {
    console.error("Error updating race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};