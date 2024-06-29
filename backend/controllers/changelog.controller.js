import Changelog from '../class/changelog.js';

export const createChangelog = async (req, res) => {
  try {
    const { location, description } = req.body;
    const newChangelog = new Changelog({
      location,
      description,
    });
    const savedChangelog = await newChangelog.save();
    res.status(201).json(savedChangelog);
  } catch (error) {
    console.error("Error creating changelog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllChangelogs = async (req, res) => {
  try {
    const changelogs = await Changelog.findAll();
    res.status(200).json(changelogs);
  } catch (error) {
    console.error("Error fetching changelogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChangelogById = async (req, res) => {
  try {
    const { id } = req.params;
    const changelog = await Changelog.findById(id);
    if (!changelog) {
      return res.status(404).json({ error: "Changelog not found" });
    }
    res.status(200).json(changelog);
  } catch (error) {
    console.error("Error fetching changelog by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteChangelogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChangelog = await Changelog.deleteById(id);
    if (!deletedChangelog) {
      return res.status(404).json({ error: "Changelog not found" });
    }
    res.status(200).json({ message: 'Changelog deleted successfully' });
  } catch (error) {
    console.error("Error deleting changelog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateChangelogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedChangelog = await Changelog.updateById(id, updateData);
    if (!updatedChangelog) {
      return res.status(404).json({ error: "Changelog not found" });
    }
    res.status(200).json(updatedChangelog);
  } catch (error) {
    console.error("Error updating changelog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const voteForChangelog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Vote logic handled within the Changelog class
    const changelog = await Changelog.findById(id);
    if (!changelog) {
      return res.status(404).json({ error: "Changelog not found" });
    }

    await changelog.vote(userId);

    res.status(200).json(changelog);
  } catch (error) {
    console.error("Error voting for changelog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
