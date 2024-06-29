import ChangelogModel from '../models/changelog.model.js';

class Changelog {
  constructor({ location, description, frontStatus = 'pending', backEndStatus = 'pending' }) {
    this.location = location;
    this.description = description;
    this.frontStatus = frontStatus;
    this.backEndStatus = backEndStatus;
  }

  async save() {
    try {
      const changelogDBObject = {
        location: this.location,
        description: this.description,
        frontStatus: this.frontStatus,
        backEndStatus: this.backEndStatus,
      };

      const newChangelog = new ChangelogModel(changelogDBObject);
      const savedChangelog = await newChangelog.save();
      return savedChangelog;
    } catch (error) {
      console.error("Error saving changelog entry:", error);
      throw new Error("Error saving changelog entry");
    }
  }

  async vote(userId) {
    try {
      const existingVote = await ChangelogModel.findOne({ _id: this._id, 'votes.userId': userId });

      if (existingVote) {
        await ChangelogModel.findByIdAndUpdate(
          this._id,
          { $pull: { votes: { userId } }, $inc: { votesCount: -1 } },
          { new: true }
        );
        this.votes -= 1;
      } else {
        await ChangelogModel.findByIdAndUpdate(
          this._id,
          { $push: { votes: { userId } }, $inc: { votesCount: 1 } },
          { new: true }
        );
        this.votes += 1;
      }

      return this;
    } catch (error) {
      console.error("Error voting for changelog entry:", error);
      throw new Error("Error voting for changelog entry");
    }
  }

  static async findById(id) {
    try {
      const changelogEntry = await ChangelogModel.findById(id);
      return changelogEntry;
    } catch (error) {
      console.error('Error fetching changelog entry by ID:', error);
      throw new Error("Error fetching changelog entry by ID");
    }
  }

  static async findAll() {
    try {
      const changelogEntries = await ChangelogModel.find();
      return changelogEntries;
    } catch (error) {
      console.error('Error fetching all changelog entries:', error);
      throw new Error("Error fetching all changelog entries");
    }
  }

  static async deleteById(id) {
    try {
      const deletedChangelog = await ChangelogModel.findByIdAndDelete(id);
      if (!deletedChangelog) {
        throw new Error('Changelog entry not found');
      }
      return deletedChangelog;
    } catch (error) {
      console.error('Error deleting changelog entry:', error);
      throw new Error("Error deleting changelog entry");
    }
  }

  static async updateById(id, updateData) {
    try {
      const updatedChangelog = await ChangelogModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
      if (!updatedChangelog) {
        throw new Error('Changelog entry not found');
      }
      return updatedChangelog;
    } catch (error) {
      console.error('Error updating changelog entry:', error);
      throw new Error("Error updating changelog entry");
    }
  }
}

export default Changelog;
