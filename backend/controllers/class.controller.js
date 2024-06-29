import CharacterClass from '../class/class.js';
import ClassModel from '../models/class.model.js';

export const createClass = async (req, res) => {
  try {
    const classData = req.body;
    const characterClass = new CharacterClass(classData);
    const classDBObject = characterClass.toDBObject();

    const newClass = new ClassModel(classDBObject);
    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getClass = async (req, res) => {
  try {
    const { id } = req.params;

    const characterClass = await ClassModel.findById(id);

    if (!characterClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json(characterClass);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const characterClass = await ClassModel.findByIdAndDelete(id);

    if (!characterClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ error: 'Error deleting class' });
  }
};

// Nowa funkcja do pobierania wszystkich klas
export const getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc    Update specific fields of a class
// @route   PATCH /api/classes/:id
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const characterClass = await ClassModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    if (!characterClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json(characterClass);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
