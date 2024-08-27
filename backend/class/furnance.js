import BackpackModel from '../models/backpack.model.js';
import FurnaceModel from '../models/furnace.model.js';
import FuelModel from '../models/fuel.model.js';

class Furnace {
  constructor(furnaceId, characterId) {
    this.furnaceId = furnaceId;
    this.characterId = characterId;
  }

  async lightFurnace(fuelName, fuelAmount) {
    try {
      const [furnace, backpack, fuel] = await Promise.all([
        FurnaceModel.findById(this.furnaceId),
        BackpackModel.findOne({ owner: this.characterId }),
        FuelModel.findOne({ name: fuelName }),
      ]);

      if (!furnace) {
        throw new Error('Piec nie znaleziony.');
      }

      if (furnace.isLit) {
        throw new Error('Piec już jest zapalony.');
      }

      if (!fuel) {
        throw new Error('Paliwo nie znalezione.');
      }

      // Sprawdzenie, czy gracz ma wystarczającą ilość paliwa w plecaku
      const fuelInBackpack = backpack.items.find(item => item.resource === fuelName);

      if (!fuelInBackpack || fuelInBackpack.quantity < fuelAmount) {
        throw new Error('Niewystarczająca ilość paliwa.');
      }

      // Zużycie paliwa
      fuelInBackpack.quantity -= fuelAmount;
      await backpack.save();

      // Rozpalenie pieca
      furnace.fuelAmount += fuelAmount;
      furnace.isLit = true;
      furnace.temperature = 100;  // Początkowa temperatura
      furnace.fuelType = fuelName; // Ustawienie rodzaju paliwa
      furnace.maxTemperature = fuel.maxTemperature; // Ustawienie maksymalnej temperatury na podstawie danych z tabeli `fuels`
      await furnace.save();

      return { success: true, message: 'Piec został zapalony.' };
    } catch (error) {
      console.error('Błąd podczas zapalania pieca:', error);
      return { success: false, message: error.message };
    }
  }
}
