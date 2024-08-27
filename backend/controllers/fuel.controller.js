import FuelModel from '../models/fuel.model.js';

// Kontroler do zarządzania paliwem
class FuelController {
  // Metoda do dodawania nowego paliwa
  async addFuel(req, res) {
    try {
        
      const { name, maxTemperature, burnTime } = req.body;

      // Sprawdź, czy wszystkie wymagane dane są obecne
      if (!name || !maxTemperature || !burnTime) {
        return res.status(400).json({ success: false, message: 'Wszystkie pola są wymagane.' });
      }

      // Stworzenie nowego obiektu paliwa
      const newFuel = new FuelModel({
        name,
        maxTemperature,
        burnTime,
      });

      // Zapisanie paliwa do bazy danych
      await newFuel.save();

      return res.status(201).json({ success: true, message: 'Paliwo zostało dodane.', fuel: newFuel });
    } catch (error) {
      console.error('Błąd podczas dodawania paliwa:', error);
      return res.status(500).json({ success: false, message: 'Wystąpił błąd podczas dodawania paliwa.' });
    }
  }
}

export default new FuelController();
