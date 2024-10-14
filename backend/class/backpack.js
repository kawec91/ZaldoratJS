import BackpackModel from '../models/backpack.model.js';
import CharacterModel from '../models/character.model.js';

class Backpack {
  constructor({ owner, size }) {
    this.owner = owner;
    this.size = size;
  }

  // Create a new backpack for a character
  static async create(characterId, size) {
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

  // Find backpack by its ID
  static async findById(backpackId) {
    try {
      const backpack = await BackpackModel.findById(backpackId).populate('owner');
      return backpack;
    } catch (error) {
      console.error('Error fetching backpack by ID:', error);
      throw new Error("Error fetching backpack by ID");
    }
  }

  // Find backpack by owner ID
  static async findByOwnerId(ownerId) {
    try {
      const backpack = await BackpackModel.findOne({ owner: ownerId }).populate('owner');
      return backpack;
    } catch (error) {
      console.error('Error fetching backpack by owner ID:', error);
      throw new Error("Error fetching backpack by owner ID");
    }
  }

  // Get all backpacks
  static async getAllBackpacks() {
    try {
      const backpacks = await BackpackModel.find(); // Assuming you're using Mongoose
      return backpacks;
    } catch (error) {
      console.error('Error fetching backpacks:', error);
      throw new Error('Error fetching backpacks: ' + error.message);
    }
  }

  // Add an item to the backpack
  async addItem(item) {
    try {
      const backpack = await BackpackModel.findById(this._id).populate('owner');
      if (!backpack) {
        throw new Error("Backpack not found");
      }

      const character = backpack.owner;
      const currentWeight = backpack.items.reduce((total, item) => total + item.weight * item.quantity, 0);
      const itemWeight = item.weight * item.quantity;

      if (currentWeight + itemWeight > character.weight) {
        throw new Error("You cannot carry more weight");
      }

      if (backpack.items.length >= backpack.slots) {
        throw new Error("Backpack is full");
      }

      backpack.items.push(item);
      const updatedBackpack = await backpack.save();
      return updatedBackpack;
    } catch (error) {
      console.error("Error adding item to backpack:", error);
      throw new Error("Error adding item to backpack");
    }
  }

  // Remove an item from the backpack
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
