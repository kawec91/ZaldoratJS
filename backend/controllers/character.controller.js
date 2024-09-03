import Character from '../class/character.js';
import CharacterModel from '../models/character.model.js';

// Funkcja do tworzenia postaci
export const createCharacter = async (req, res) => {
  try {
    const characterData = req.body;
    
    // Sprawdź, czy xpMultiplier jest dostarczony, jeśli nie, ustaw domyślnie
    characterData.stats = {
      ...characterData.stats,
      xpMultiplier: characterData.stats?.xpMultiplier || {
        power: 1.0,
        defence: 1.0,
        speed: 1.0,
        agility: 1.0,
        vitality: 1.0,
        blood: 1.0,
        hp: 1.0,
        max_hp: 1.0,
        critical: 1.0,
        luck: 1.0,
      }
    };

    characterData.craftingAbilities = {
      ...characterData.craftingAbilities,
      xpMultiplier: characterData.craftingAbilities?.xpMultiplier || {
        smithing: 1.0,
        smelting: 1.0,
        tailoring: 1.0,
        taming: 1.0,
        animal_husbandry: 1.0,
        carpenter: 1.0,
        mining: 1.0,
        alchemy: 1.0,
        healing_herbalism: 1.0,
        runemaking: 1.0,
        jewlery: 1.0,
        woodcutting: 1.0,
        cooking: 1.0,
        trading: 1.0,
        farming: 1.0,
      }
    };

    characterData.fightingAbilities = {
      ...characterData.fightingAbilities,
      xpMultiplier: characterData.fightingAbilities?.xpMultiplier || {
        dodge: 1.0,
        swords: 1.0,
        axes: 1.0,
        maces: 1.0,
        polearms: 1.0,
        bows: 1.0,
        magic: 1.0,
        shielding: 1.0,
        lightarmor: 1.0,
        mediumarmor: 1.0,
        heavyarmor: 1.0,
        stealing: 1.0,
        vampire: 1.0,
        necromancy: 1.0,
      }
    };

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

// Funkcja do aktualizacji postaci
export const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Dodaj logikę do zarządzania xpMultiplier podczas aktualizacji
    if (updateData.stats) {
      updateData.stats.xpMultiplier = {
        ...updateData.stats.xpMultiplier,
        power: updateData.stats.xpMultiplier?.power || 1.0,
        defence: updateData.stats.xpMultiplier?.defence || 1.0,
        speed: updateData.stats.xpMultiplier?.speed || 1.0,
        agility: updateData.stats.xpMultiplier?.agility || 1.0,
        vitality: updateData.stats.xpMultiplier?.vitality || 1.0,
        blood: updateData.stats.xpMultiplier?.blood || 1.0,
        hp: updateData.stats.xpMultiplier?.hp || 1.0,
        max_hp: updateData.stats.xpMultiplier?.max_hp || 1.0,
        critical: updateData.stats.xpMultiplier?.critical || 1.0,
        luck: updateData.stats.xpMultiplier?.luck || 1.0,
      };
    }

    if (updateData.craftingAbilities) {
      updateData.craftingAbilities.xpMultiplier = {
        ...updateData.craftingAbilities.xpMultiplier,
        smithing: updateData.craftingAbilities.xpMultiplier?.smithing || 1.0,
        smelting: updateData.craftingAbilities.xpMultiplier?.smelting || 1.0,
        tailoring: updateData.craftingAbilities.xpMultiplier?.tailoring || 1.0,
        taming: updateData.craftingAbilities.xpMultiplier?.taming || 1.0,
        animal_husbandry: updateData.craftingAbilities.xpMultiplier?.animal_husbandry || 1.0,
        carpenter: updateData.craftingAbilities.xpMultiplier?.carpenter || 1.0,
        mining: updateData.craftingAbilities.xpMultiplier?.mining || 1.0,
        alchemy: updateData.craftingAbilities.xpMultiplier?.alchemy || 1.0,
        healing_herbalism: updateData.craftingAbilities.xpMultiplier?.healing_herbalism || 1.0,
        runemaking: updateData.craftingAbilities.xpMultiplier?.runemaking || 1.0,
        jewlery: updateData.craftingAbilities.xpMultiplier?.jewlery || 1.0,
        woodcutting: updateData.craftingAbilities.xpMultiplier?.woodcutting || 1.0,
        cooking: updateData.craftingAbilities.xpMultiplier?.cooking || 1.0,
        trading: updateData.craftingAbilities.xpMultiplier?.trading || 1.0,
        farming: updateData.craftingAbilities.xpMultiplier?.farming || 1.0,
      };
    }

    if (updateData.fightingAbilities) {
      updateData.fightingAbilities.xpMultiplier = {
        ...updateData.fightingAbilities.xpMultiplier,
        dodge: updateData.fightingAbilities.xpMultiplier?.dodge || 1.0,
        swords: updateData.fightingAbilities.xpMultiplier?.swords || 1.0,
        axes: updateData.fightingAbilities.xpMultiplier?.axes || 1.0,
        maces: updateData.fightingAbilities.xpMultiplier?.maces || 1.0,
        polearms: updateData.fightingAbilities.xpMultiplier?.polearms || 1.0,
        bows: updateData.fightingAbilities.xpMultiplier?.bows || 1.0,
        magic: updateData.fightingAbilities.xpMultiplier?.magic || 1.0,
        shielding: updateData.fightingAbilities.xpMultiplier?.shielding || 1.0,
        lightarmor: updateData.fightingAbilities.xpMultiplier?.lightarmor || 1.0,
        mediumarmor: updateData.fightingAbilities.xpMultiplier?.mediumarmor || 1.0,
        heavyarmor: updateData.fightingAbilities.xpMultiplier?.heavyarmor || 1.0,
        stealing: updateData.fightingAbilities.xpMultiplier?.stealing || 1.0,
        vampire: updateData.fightingAbilities.xpMultiplier?.vampire || 1.0,
        necromancy: updateData.fightingAbilities.xpMultiplier?.necromancy || 1.0,
      };
    }

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

// Funkcja do pobierania postaci na podstawie ownera (accountId)
export const getCharactersByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params; // Pobierz accountId z parametrów

    const characters = await CharacterModel.find({ owner: ownerId }); // Znajdź postacie dla danego ownera

    if (characters.length === 0) {
      return res.status(404).json({ error: "No characters found for this account" });
    }

    res.status(200).json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Pobieranie lokalizacji postaci
export const getCharacterLocation = async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await CharacterModel.findById(characterId);

    if (!character) {
      return res.status(404).json({ error: 'Postać nie znaleziona' });
    }

    res.status(200).json({ location: character.location });
  } catch (error) {
    console.error('Błąd podczas pobierania lokalizacji postaci:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
