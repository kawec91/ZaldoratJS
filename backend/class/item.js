import mongoose from 'mongoose';
import ItemModel from './models/item.model.js'; // Importing the Mongoose model

class Item {
  constructor({
    name,
    cost,
    weight,
    type,
    slot = null,
    durability = null,
    power = null,
    defense = null,
    special = null,
    imageUrl = null
  }) {
    this.name = name;
    this.cost = cost;
    this.weight = weight;
    this.type = type;
    this.slot = slot;
    this.durability = durability;
    this.power = power;
    this.defense = defense;
    this.special = special;
    this.imageUrl = imageUrl || this.getImageUrl();
  }

  // Method to calculate the item's value (could be based on cost, power, or other attributes)
  calculateValue() {
    return this.cost + (this.power || 0) + (this.defense || 0);
  }

  // Method to dynamically return the image URL for this item
  getImageUrl() {
    return `/images/items/${this.name.toLowerCase()}.jpg`; // Assuming images are in the `/images/items/` folder
  }

  // Method to display a summary of the item
  getSummary() {
    return `
      Name: ${this.name}
      Type: ${this.type}
      Cost: ${this.cost}
      Weight: ${this.weight}
      Power: ${this.power || 'N/A'}
      Defense: ${this.defense || 'N/A'}
      Special: ${this.special || 'N/A'}
      Image URL: ${this.imageUrl}
    `;
  }

  // Static method to create an item from a MongoDB document (useful for conversion)
  static fromDocument(doc) {
    return new Item({
      name: doc.name,
      cost: doc.cost,
      weight: doc.weight,
      type: doc.type,
      slot: doc.slot,
      durability: doc.durability,
      power: doc.power,
      defense: doc.defense,
      special: doc.special
    });
  }

  // ========== CRUD Operations integrated with MongoDB ========== //

  // Create a new item in the database
  static async createItem(itemData) {
    try {
      const newItem = new ItemModel(itemData);
      await newItem.save();
      return new Item(newItem); // Convert the mongoose model to the class instance
    } catch (error) {
      throw new Error(`Error creating item: ${error.message}`);
    }
  }

  // Get all items from the database
  static async getAllItems() {
    try {
      const items = await ItemModel.find();
      return items.map(item => new Item(item)); // Convert mongoose models to class instances
    } catch (error) {
      throw new Error(`Error retrieving items: ${error.message}`);
    }
  }

  // Get a single item by ID from the database
  static async getItemById(itemId) {
    try {
      const item = await ItemModel.findById(itemId);
      if (!item) throw new Error('Item not found');
      return new Item(item); // Convert the mongoose model to the class instance
    } catch (error) {
      throw new Error(`Error retrieving item: ${error.message}`);
    }
  }

  // Update an existing item in the database
  static async updateItem(itemId, updatedData) {
    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(itemId, updatedData, { new: true });
      if (!updatedItem) throw new Error('Item not found');
      return new Item(updatedItem); // Convert the mongoose model to the class instance
    } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
    }
  }

  // Delete an item from the database
  static async deleteItem(itemId) {
    try {
      const deletedItem = await ItemModel.findByIdAndDelete(itemId);
      if (!deletedItem) throw new Error('Item not found');
      return deletedItem;
    } catch (error) {
      throw new Error(`Error deleting item: ${error.message}`);
    }
  }
}

export default Item;
