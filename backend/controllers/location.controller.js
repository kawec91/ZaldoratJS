// controllers/location.controller.js
import Location from '../models/location.model.js';

class LocationController {
  async createLocation(req, res) {
    try {
      const { name, file, description, sublocations } = req.body;

      const newLocation = new Location({ name, file, description, sublocations });
      const savedLocation = await newLocation.save();

      res.status(201).json(savedLocation);
    } catch (error) {
      console.error('Error creating location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getLocation(req, res) {
    try {
      const { id } = req.params;

      const location = await Location.findById(id).populate('sublocations');

      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }

      res.status(200).json(location);
    } catch (error) {
      console.error('Error fetching location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new LocationController();
