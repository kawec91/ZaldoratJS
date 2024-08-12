import ResourceModel from '../models/resource.model.js';

export const createResource = async (req, res) => {
  try {
    const { name, weight, price, description, customId } = req.body;
    const newResource = new ResourceModel({
      name,
      weight,
      price,
      description,
      customId,
    });
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await ResourceModel.findById(id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedResource = await ResourceModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await ResourceModel.findByIdAndDelete(id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await ResourceModel.find();
    res.status(200).json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
