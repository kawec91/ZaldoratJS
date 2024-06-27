// controllers/sublocation.controller.js
import Sublocation from '../models/sublocation.model.js';

class SublocationController {
  async createSublocation(req, res) {
    try {
      const { name, file, description } = req.body;

      const newSublocation = new Sublocation({ name, file, description });
      const savedSublocation = await newSublocation.save();

      res.status(201).json(savedSublocation);
    } catch (error) {
      console.error('Error creating sublocation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getSublocation(req, res) {
    try {
      const { id } = req.params;

      const sublocation = await Sublocation.findById(id);

      if (!sublocation) {
        return res.status(404).json({ error: 'Sublocation not found' });
      }

      res.status(200).json(sublocation);
    } catch (error) {
      console.error('Error fetching sublocation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SublocationController();
