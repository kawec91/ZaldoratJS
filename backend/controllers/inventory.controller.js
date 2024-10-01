// controllers/inventory.controller.js
import InventoryService from '../services/inventory.service.js';

export const equipItem = async (req, res) => {
  try {
    const { characterId, itemId, slot } = req.body;
    const updatedInventory = await InventoryService.equipItem(characterId, itemId, slot);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unequipItem = async (req, res) => {
  try {
    const { characterId, slot } = req.body;
    const updatedInventory = await InventoryService.unequipItem(characterId, slot);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const calculateTotalBuffs = async (req, res) => {
  try {
    const { characterId } = req.params;
    const totalBuffs = await InventoryService.calculateTotalBuffs(characterId);
    res.status(200).json(totalBuffs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
