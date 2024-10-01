// services/inventory.service.js
import InventoryModel from '../models/inventory.model.js';
import BackpackModel from '../models/backpack.model.js';
import CharacterModel from '../models/character.model.js';

class InventoryService {
  static async equipItem(characterId, itemId, slot) {
    try {
      // Find character's inventory
      const inventory = await InventoryModel.findOne({ owner: characterId });

      if (!inventory) {
        throw new Error('Inventory not found');
      }

      // Find the item in the backpack
      const backpack = await BackpackModel.findOne({ owner: characterId });
      const item = backpack.items.id(itemId);

      if (!item) {
        throw new Error('Item not found in backpack');
      }

      // Check if the slot is available and equip the item
      inventory[slot] = itemId;
      await inventory.save();

      // Remove the item from the backpack
      item.remove();
      await backpack.save();

      return inventory;
    } catch (error) {
      console.error('Error equipping item:', error);
      throw new Error('Error equipping item');
    }
  }

  static async unequipItem(characterId, slot) {
    try {
      // Find the character's inventory
      const inventory = await InventoryModel.findOne({ owner: characterId });
      
      if (!inventory) {
        throw new Error('Inventory not found');
      }

      // Check if there's an item equipped in the specified slot
      const itemId = inventory[slot];
      if (!itemId) {
        throw new Error('No item equipped in this slot');
      }

      // Find the character's backpack
      const backpack = await BackpackModel.findOne({ owner: characterId });

      // Add the item back to the backpack
      backpack.items.push(itemId);
      await backpack.save();

      // Remove the item from the equipped slot
      inventory[slot] = null;
      await inventory.save();

      return inventory;
    } catch (error) {
      console.error('Error unequipping item:', error);
      throw new Error('Error unequipping item');
    }
  }

  static async calculateTotalBuffs(characterId) {
    try {
      // Find character's inventory
      const inventory = await InventoryModel.findOne({ owner: characterId }).populate('helmet chest legs boots gloves cape weapon shield backslot ring ring2 tool companion');

      let totalBuffs = {
        dodge: 0,
        swords: 0,
        axes: 0,
        // Add other fighting stats here...
      };

      // Sum buffs from each equipped item
      for (const slot in inventory.toObject()) {
        if (inventory[slot] && inventory[slot].stats) {
          Object.keys(totalBuffs).forEach((stat) => {
            totalBuffs[stat] += inventory[slot].stats[stat] || 0;
          });
        }
      }

      return totalBuffs;
    } catch (error) {
      console.error('Error calculating total buffs:', error);
      throw new Error('Error calculating total buffs');
    }
  }
}

export default InventoryService;
