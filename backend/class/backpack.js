import BackpackModel from '../models/backpack.model.js';
import CharacterModel from '../models/character.model.js';

class Backpack {
  constructor({ owner, size }) {
    this.owner = owner;
    this.size = size;
  }

  static async createBackpack(characterId, size) {
    try {
      const newBackpack = new BackpackModel({ owner: characterId, size });
      const savedBackpack = await newBackpack.save();
      await CharacterModel.findByIdAndUpdate(characterId, { backpack: savedBackpack._id });
      return savedBackpack;
    } catch (error) {
      console.error("Error creating backpack:", error);
      throw new Error("Error creating backpack");
    }
  }

  static async findById(backpackId) {
    try {
      const backpack = await BackpackModel.findById(backpackId).populate('owner');
      return backpack;
    } catch (error) {
      console.error('Error fetching backpack by ID:', error);
      throw new Error("Error fetching backpack by ID");
    }
  }

  static async findByOwnerId(ownerId) {
    try {
      const backpack = await BackpackModel.findOne({ owner: ownerId }).populate('owner');
      return backpack;
    } catch (error) {
      console.error('Error fetching backpack by owner ID:', error);
      throw new Error("Error fetching backpack by owner ID");
    }
  }

  async addItem(item) {
    try {
      const backpack = await BackpackModel.findById(this._id).populate('owner');
      if (!backpack) {
        throw new Error("Plecak nie znaleziony");
      }
  
      const character = backpack.owner; // Właściciel plecaka
      const currentWeight = backpack.items.reduce((total, item) => total + item.weight, 0); // Suma wag przedmiotów w plecaku
      const itemWeight = item.weight; // Waga dodawanego przedmiotu (bez mnożnika)
  
      // Sprawdzanie maksymalnej wagi
      if (currentWeight + itemWeight > character.weight) { // Użycie wagi z obiektu character
        throw new Error("Nie udźwigniesz już więcej");
      }
  
      if (backpack.items.length >= backpack.slots) {
        throw new Error("Plecak jest pełny");
      }
  
      backpack.items.push(item);
      const updatedBackpack = await backpack.save();
      return updatedBackpack;
    } catch (error) {
      console.error("Błąd podczas dodawania przedmiotu do plecaka:", error);
      throw new Error("Błąd podczas dodawania przedmiotu do plecaka");
    }
  }

  async removeItem(itemId) {
    try {
      const backpack = await BackpackModel.findById(this._id);
      if (!backpack) {
        throw new Error("Backpack not found");
      }

      backpack.items.id(itemId).remove();
      const updatedBackpack = await backpack.save();
      return updatedBackpack;
    } catch (error) {
      console.error("Error removing item from backpack:", error);
      throw new Error("Error removing item from backpack");
    }
  }
}

export default Backpack;
