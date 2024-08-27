// controllers/furnace.controller.js
import Furnace from '../class/furnace.js';
import FurnaceModel from '../models/furnace.model.js';
import BackpackModel from '../models/backpack.model.js';

class FurnaceController {
  // Metoda do tworzenia pieca
  async createFurnace(req, res) {
    const { smelteryId } = req.body; // Id huty, do której piec jest przypisany
    const { characterId } = req.params; // ID postaci jako właściciel pieca

    try {
      const newFurnace = new FurnaceModel({
        smeltery: smelteryId,
        owner: characterId, // Ustawienie właściciela pieca
        temperature: 0,
        fuelType: '', // Można ustawić domyślną wartość
        maxTemperature: 0,
        fuelAmount: 0,
        isLit: false,
      });

      await newFurnace.save();

      return res.status(201).json({ success: true, message: 'Piec został utworzony.', furnace: newFurnace });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do zapalania pieca
  async lightFurnace(req, res) {
    const { fuelName, fuelAmount } = req.body;
    const { characterId, furnaceId } = req.params;

    try {
      const furnaceInstance = new Furnace(furnaceId, characterId);
      const result = await furnaceInstance.lightFurnace(fuelName, fuelAmount);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do wygaszania pieca
  async extinguishFurnace(req, res) {
    const { furnaceId } = req.params;

    try {
      const furnace = await FurnaceModel.findById(furnaceId);
      if (!furnace || !furnace.isLit) {
        return res.status(400).json({ success: false, message: 'Piec nie jest zapalony.' });
      }

      // Wygaszanie pieca
      furnace.isLit = false;
      furnace.temperature = 0; // Można ustawić temperaturę na 0 lub inną wartość
      furnace.fuelAmount = 0; // Opcjonalnie resetowanie ilości paliwa
      await furnace.save();

      return res.status(200).json({ success: true, message: 'Piec został wygaszony.' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do zwiększania temperatury
  async increaseTemperature(req, res) {
    const { increaseAmount } = req.body; // Przyjmujemy ilość do zwiększenia
    const { furnaceId } = req.params;

    try {
      const furnace = await FurnaceModel.findById(furnaceId);
      if (!furnace || !furnace.isLit) {
        return res.status(400).json({ success: false, message: 'Piec nie jest zapalony.' });
      }

      furnace.temperature += increaseAmount;

      // Sprawdzenie, czy temperatura nie przekracza maksymalnej
      if (furnace.temperature > furnace.maxTemperature) {
        furnace.temperature = furnace.maxTemperature; // Ustawienie na maksymalną temperaturę
      }

      await furnace.save();

      return res.status(200).json({ success: true, message: 'Temperatura została zwiększona.', temperature: furnace.temperature });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do zmniejszania temperatury
  async decreaseTemperature(req, res) {
    const { decreaseAmount } = req.body; // Przyjmujemy ilość do zmniejszenia
    const { furnaceId } = req.params;

    try {
      const furnace = await FurnaceModel.findById(furnaceId);
      if (!furnace || !furnace.isLit) {
        return res.status(400).json({ success: false, message: 'Piec nie jest zapalony.' });
      }

      furnace.temperature -= decreaseAmount;

      // Sprawdzenie, czy temperatura nie spadnie poniżej zera
      if (furnace.temperature < 0) {
        furnace.temperature = 0; // Ustawienie na 0, jeśli jest poniżej
      }

      await furnace.save();

      return res.status(200).json({ success: true, message: 'Temperatura została zmniejszona.', temperature: furnace.temperature });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do przetapiania minerałów
  async smeltMinerals(req, res) {
    const { mineralName, quantity } = req.body;
    const { characterId, furnaceId } = req.params;

    try {
      const furnace = await FurnaceModel.findById(furnaceId);
      const backpack = await BackpackModel.findOne({ owner: characterId });

      if (!furnace.isLit) {
        return res.status(400).json({ success: false, message: 'Piec nie jest zapalony.' });
      }

      const mineralInBackpack = backpack.items.find(item => item.resource === mineralName);
      if (!mineralInBackpack || mineralInBackpack.quantity < quantity) {
        return res.status(400).json({ success: false, message: 'Niewystarczająca ilość minerałów.' });
      }

      // Logika przetapiania
      mineralInBackpack.quantity -= quantity;
      await backpack.save();

      // Możesz dodać logikę do tworzenia sztabek i ich dodawania do plecaka

      return res.status(200).json({ success: true, message: 'Minerały zostały przetopione.' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new FurnaceController();
