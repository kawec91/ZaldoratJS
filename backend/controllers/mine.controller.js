import MineModel from '../models/mine.model.js';

// Tworzenie nowej kopalni
export const createMine = async (req, res) => {
  try {
    const { name, owner, resource, quantity, location } = req.body;

    const newMine = new MineModel({
      name,
      owner,
      resource,
      quantity,
      location,
    });

    const savedMine = await newMine.save();
    res.status(201).json(savedMine);
  } catch (error) {
    console.error('Error creating mine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Pobieranie informacji o kopalni
export const getMine = async (req, res) => {
  try {
    const { mineId } = req.params;
    const mine = await MineModel.findById(mineId).populate('owner');

    if (!mine) {
      return res.status(404).json({ error: 'Mine not found' });
    }

    res.status(200).json(mine);
  } catch (error) {
    console.error('Error fetching mine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Aktualizacja ilości surowca w kopalni
export const updateMineQuantity = async (req, res) => {
  try {
    const { mineId } = req.params;
    const { quantity } = req.body;

    const updatedMine = await MineModel.findByIdAndUpdate(
      mineId,
      { quantity },
      { new: true }
    );

    if (!updatedMine) {
      return res.status(404).json({ error: 'Mine not found' });
    }

    res.status(200).json(updatedMine);
  } catch (error) {
    console.error('Error updating mine quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Usuwanie kopalni
export const deleteMine = async (req, res) => {
  try {
    const { mineId } = req.params;

    const deletedMine = await MineModel.findByIdAndDelete(mineId);

    if (!deletedMine) {
      return res.status(404).json({ error: 'Mine not found' });
    }

    res.status(200).json({ message: 'Mine deleted successfully' });
  } catch (error) {
    console.error('Error deleting mine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
