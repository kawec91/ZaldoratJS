import Backpack from '../class/backpack.js';

// Create a new backpack
export const createBackpack = async (req, res) => {
  try {
    const { characterId } = req.params;
    const { size } = req.body;

    const newBackpack = await Backpack.create(characterId, size); // Matches the class method
    res.status(201).json(newBackpack);
  } catch (error) {
    console.error("Error creating backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get backpack by its ID
export const getBackpackById = async (req, res) => {
  try {
    const { id } = req.params;
    const backpack = await Backpack.findById(id); // Matches the class method

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    res.status(200).json(backpack);
  } catch (error) {
    console.error("Error fetching backpack by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get backpack by owner ID
export const getBackpackByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const backpack = await Backpack.findByOwnerId(ownerId); // Matches the class method

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    res.status(200).json(backpack);
  } catch (error) {
    console.error("Error fetching backpack by owner ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all backpacks
export const getAllBackpacks = async (req, res) => {
  try {
    const backpacks = await Backpack.getAllBackpacks(); // Matches the class method

    res.status(200).json(backpacks);
  } catch (error) {
    console.error("Error fetching all backpacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add an item to the backpack
export const addItemToBackpack = async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;

    const backpack = await Backpack.findById(id); // Matches the class method

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    const updatedBackpack = await backpack.addItem(item); // Matches the class method
    res.status(200).json(updatedBackpack);
  } catch (error) {
    console.error("Error adding item to backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove an item from the backpack
export const removeItemFromBackpack = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const backpack = await Backpack.findById(id); // Matches the class method

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    const updatedBackpack = await backpack.removeItem(itemId); // Matches the class method
    res.status(200).json(updatedBackpack);
  } catch (error) {
    console.error("Error removing item from backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
