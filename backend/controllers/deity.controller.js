import DeityModel from '../models/deity.model.js';

export const createDeity = async (req, res) => {
  try {
    const deityData = req.body;
    const newDeity = new DeityModel(deityData);
    const savedDeity = await newDeity.save();

    res.status(201).json(savedDeity);
  } catch (error) {
    console.error("Error creating deity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDeity = async (req, res) => {
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
};

export const deleteDeity = async (req, res) => {
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
};

// @desc    Get all deities
// @route   GET /api/deities/getall
export const getAllDeities = async (req, res) => {
  try {
    const deities = await DeityModel.find();
    res.status(200).json(deities);
  } catch (error) {
    console.error("Error in getAllDeities controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Update specific fields of a deity
// @route   PATCH /api/deities/:id
export const updateDeity = async (req, res) => {
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
};
