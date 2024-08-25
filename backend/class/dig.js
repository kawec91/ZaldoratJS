// Import niezbędnych modeli
import MineModel from "../models/mine.model.js";
import CharacterModel from "../models/character.model.js";
import BackpackModel from "../models/backpack.model.js"; // Import modelu plecaka

class Dig {
  constructor(characterId, mineId) {
    this.characterId = characterId;
    this.mineId = mineId;
  }

  // Metoda odpowiedzialna za wydobycie surowca
  async extractResource(quantity) {
    try {
      // Znajdź kopalnię i postać
      const [mine, character] = await Promise.all([
        MineModel.findById(this.mineId),
        CharacterModel.findById(this.characterId),
      ]);

      // Sprawdzenie, czy kopalnia i postać istnieją
      if (!mine) {
        throw new Error("Kopalnia nie znaleziona.");
      }
      if (!character) {
        throw new Error("Postać nie znaleziona.");
      }

      // Sprawdzenie dostępności surowców w kopalni
      if (mine.quantity < quantity) {
        throw new Error("Niewystarczająca ilość surowca w kopalni.");
      }

      // Aktualizacja ilości surowca w kopalni
      mine.quantity -= quantity;
      await mine.save();

      // Dodanie surowca do plecaka postaci
      await this.addResourceToBackpack(
        this.characterId,
        mine.resource,
        quantity
      );

      // Rozwój umiejętności górnictwa
      await this.increaseMiningSkill(character);

      return {
        success: true,
        message: `Pomyślnie wydobyto ${quantity} ${mine.resource}.`,
      };
    } catch (error) {
      console.error("Błąd podczas wydobycia surowca:", error);
      return { success: false, message: error.message };
    }
  }

  // Metoda dodająca surowiec do plecaka postaci
  async addResourceToBackpack(characterId, resource, quantity) {
    console.log("charID BP: ", characterId);
    console.log("resource BP: ", resource);
    console.log("quantity BP: ", quantity);
    try {
      // Znajdź plecak postaci na podstawie właściciela
      const backpack = await BackpackModel.findOne({ owner: characterId });
      if (!backpack) {
        throw new Error("Plecak nie znaleziony.");
      }

      // Sprawdź, czy surowiec już istnieje w plecaku
      const existingResource = backpack.items.find(
        (item) => item.name === resource
      );
      console.log("existingResource", existingResource);
      if (existingResource) {
        existingResource.quantity += quantity; // Zwiększ ilość istniejącego surowca
        existingResource.weight += quantity; // Zwiększ wagi istniejącego surowca
      } else {
        backpack.items.push({
          name: resource.toString(),
          weight: quantity,
          quantity: quantity,
        }); // Dodaj nowy surowiec
      }

      await backpack.save(); // Zapisz zmiany w plecaku
    } catch (error) {
      console.error("Błąd podczas dodawania surowca do plecaka:", error);
      throw new Error("Nie udało się dodać surowca do plecaka.");
    }
  }

  // Metoda odpowiedzialna za rozwój umiejętności górnictwa
  async increaseMiningSkill(character) {
    try {
      // Zwiększenie umiejętności górnictwa postaci
      character.crafting_abilities.mining += 1;
      await character.save();

      return { success: true, message: "Umiejętność górnictwa zwiększona." };
    } catch (error) {
      console.error("Błąd podczas zwiększania umiejętności:", error);
      return {
        success: false,
        message: "Nie udało się zwiększyć umiejętności górnictwa.",
      };
    }
  }
}

export default Dig;
