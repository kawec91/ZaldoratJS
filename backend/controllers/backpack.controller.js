import Backpack from '../class/backpack.js';

export const createBackpack = async (req, res) => {
  try {
    const { characterId } = req.params;
    const { size } = req.body;

    const newBackpack = await Backpack.createBackpack(characterId, size);
    res.status(201).json(newBackpack);
  } catch (error) {
    console.error("Error creating backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBackpackById = async (req, res) => {
  try {
    const { id } = req.params;
    const backpack = await Backpack.findById(id);

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    res.status(200).json(backpack);
  } catch (error) {
    console.error("Error fetching backpack by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Nowa funkcja do pobierania plecaka na podstawie ID właściciela
export const getBackpackByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const backpack = await Backpack.findByOwnerId(ownerId);

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    res.status(200).json(backpack);
  } catch (error) {
    console.error("Error fetching backpack by owner ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addItemToBackpack = async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;

    const backpack = await Backpack.findById(id);

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    const updatedBackpack = await backpack.addItem(item);
    res.status(200).json(updatedBackpack);
  } catch (error) {
    console.error("Error adding item to backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeItemFromBackpack = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    // Znalezienie plecaka po jego ID
    const backpack = await Backpack.findById(id);

    if (!backpack) {
      return res.status(404).json({ error: "Backpack not found" });
    }

    // Usunięcie przedmiotu z plecaka (filtrowanie listy przedmiotów)
    backpack.items = backpack.items.filter((item) => item._id.toString() !== itemId);

    // Zapisanie zaktualizowanego plecaka do bazy danych
    await backpack.save();

    res.status(200).json(backpack);
  } catch (error) {
    console.error("Error removing item from backpack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};