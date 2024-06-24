// controllers/character.controller.js
import Character from '../class/character.js';
import CharacterModel from '../models/character.model.js';

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

// Dodaj inne operacje, które będą potrzebne dla zarządzania postaciami
