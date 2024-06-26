import Character from '../class/character.js';
import CharacterModel from '../models/character.model.js';

// Funkcja do tworzenia postaci
export const createCharacter = async (req, res) => {
  try {
    const characterData = req.body;
    const character = new Character(characterData);
    const characterDBObject = character.toDBObject();

    const newCharacter = new CharacterModel(characterDBObject);
    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (error) {
    console.error("Error creating character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Funkcja do usuwania postaci
export const deleteCharacter = async (req, res) => {
  try {
    const { nickname } = req.params;
    const character = await CharacterModel.findOneAndDelete({ nickname });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Error deleting character' });
  }
};

// Funkcja do pobierania postaci na podstawie ID
export const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await CharacterModel.findById(id);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Funkcja do pobierania wszystkich postaci
export const getAllCharacters = async (req, res) => {
  try {
    const characters = await CharacterModel.find();
    res.status(200).json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Funkcja do aktualizacji postaci
export const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const character = await CharacterModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
