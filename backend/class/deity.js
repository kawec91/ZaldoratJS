import DeityModel from '../models/deity.model.js';

class DeityController {
  static async createDeity(req, res) {
    try {
      const deityData = req.body;
      const newDeity = new DeityModel(deityData);
      const savedDeity = await newDeity.save();

      res.status(201).json(savedDeity);
    } catch (error) {
      console.error("Error creating deity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getDeity(req, res) {
    try {
      const { id } = req.params;
      const deity = await DeityModel.findById(id);

      if (!deity) {
        return res.status(404).json({ error: "Deity not found" });
      }

      res.status(200).json(deity);
    } catch (error) {
      console.error("Error fetching deity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteDeity(req, res) {
    try {
      const { id } = req.params;
      const deity = await DeityModel.findByIdAndDelete(id);

      if (!deity) {
        return res.status(404).json({ error: 'Deity not found' });
      }

      res.status(200).json({ message: 'Deity deleted successfully' });
    } catch (error) {
      console.error('Error deleting deity:', error);
      res.status(500).json({ error: 'Error deleting deity' });
    }
  }

  static async getAllDeities(req, res) {
    try {
      const deities = await DeityModel.find();
      res.status(200).json(deities);
    } catch (error) {
      console.error("Error in getAllDeities controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateDeity(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const deity = await DeityModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

      if (!deity) {
        return res.status(404).json({ error: "Deity not found" });
      }

      res.status(200).json(deity);
    } catch (error) {
      console.error("Error updating deity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default DeityController;
