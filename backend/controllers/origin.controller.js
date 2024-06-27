import Origin from '../models/origin.model.js';

class OriginController {
  async createOrigin(req, res) {
    try {
      const { name, reqRace, description, statsPerk } = req.body;

      const origin = new Origin({
        name,
        reqRace,
        description,
        statsPerk
      });

      const savedOrigin = await origin.save();
      res.status(201).json(savedOrigin);
    } catch (error) {
      console.error("Error creating origin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrigin(req, res) {
    try {
      const origins = await Origin.find();
      res.status(200).json(origins);
    } catch (error) {
      console.error("Error fetching origins:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOrigin(req, res) {
    try {
      const { id } = req.params;
      const deletedOrigin = await Origin.findByIdAndDelete(id);
      if (!deletedOrigin) {
        return res.status(404).json({ error: "Origin not found" });
      }
      res.status(200).json({ message: "Origin deleted successfully" });
    } catch (error) {
      console.error("Error deleting origin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new OriginController();
