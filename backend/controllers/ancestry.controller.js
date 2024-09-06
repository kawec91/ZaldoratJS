import AncestryModel from '../models/ancestry.model.js';

class AncestryController {
  // Metoda do tworzenia nowego pochodzenia
  async createAncestry(req, res) {
    const { raceId, name, description, xpMultipliers } = req.body; // Dodano xpMultipliers

    try {
      const newAncestry = new AncestryModel({
        race: raceId,
        name,
        description,
        xpMultipliers, // Dodano xpMultipliers
      });

      await newAncestry.save();

      return res.status(201).json({ success: true, message: 'Pochodzenie zostało utworzone.', ancestry: newAncestry });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do pobierania wszystkich pochodzeń
  async getAllAncestries(req, res) {
    try {
      const ancestries = await AncestryModel.find().populate('race');
      return res.status(200).json({ success: true, ancestries });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Metoda do pobierania pochodzeń dla wybranej rasy
  async getAncestriesByRace(req, res) {
    const { raceId } = req.params;

    try {
      const ancestries = await AncestryModel.find({ race: raceId }).populate('race');
      if (ancestries.length === 0) {
        return res.status(404).json({ success: false, message: 'Nie znaleziono pochodzeń dla podanej rasy.' });
      }

      return res.status(200).json({ success: true, ancestries });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new AncestryController();
