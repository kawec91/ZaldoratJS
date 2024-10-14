// backend/controllers/item.controller.js
import Item from '../models/item.model.js';

// Create a new item
export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    const itemWithImage = {
      ...newItem._doc,
      imageUrl: newItem.getImageUrl() // Add the image URL dynamically
    };
    res.status(201).json(itemWithImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    const itemsWithImages = items.map(item => ({
      ...item._doc,
      imageUrl: item.getImageUrl() // Add the image URL dynamically
    }));
    res.status(200).json(itemsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const itemWithImage = {
      ...item._doc,
      imageUrl: item.getImageUrl() // Add the image URL dynamically
    };

    res.status(200).json(itemWithImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    const updatedItemWithImage = {
      ...updatedItem._doc,
      imageUrl: updatedItem.getImageUrl() // Add the image URL dynamically
    };

    res.status(200).json(updatedItemWithImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
