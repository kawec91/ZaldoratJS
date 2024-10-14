import mongoose from 'mongoose';

// Full itemSchema matching your Item model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  weight: { type: Number, required: true },
  type: { type: String, required: true },
  slot: { type: String, required: false },
  durability: { type: Number, required: false },
  power: { type: Number, required: false },
  defense: { type: Number, required: false },
  special: { type: String, required: false },
  quantity: { type: Number, required: true, default: 1 }, // Adding quantity here
  imageUrl: { type: String, required: false }, // Optional image URL
});

// Updated backpackSchema
const backpackSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character', // Assuming Character is another model
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'big'],
    required: true,
  },
  slots: {
    type: Number,
    required: true,
    default: function () {
      // Set default slots based on size
      switch (this.size) {
        case 'small':
          return 30;
        case 'medium':
          return 50;
        case 'big':
          return 70;
        default:
          return 30;
      }
    },
  },
  items: [itemSchema], // Embedding itemSchema to hold item objects
});

// Calculate the current total weight of all items in the backpack
backpackSchema.methods.calculateCurrentWeight = function () {
  return this.items.reduce((total, item) => total + item.weight * item.quantity, 0);
};

// Add an item to the backpack
backpackSchema.methods.addItem = function (newItem) {
  const existingItem = this.items.find(item => item.name === newItem.name);
  
  // Check if the item already exists in the backpack
  if (existingItem) {
    // Increase quantity if it already exists
    existingItem.quantity += newItem.quantity;
  } else {
    // Otherwise, add a new item to the backpack
    this.items.push(newItem);
  }
  return this.save();
};

// Remove an item from the backpack
backpackSchema.methods.removeItem = function (itemName, quantityToRemove = 1) {
  const itemIndex = this.items.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    const item = this.items[itemIndex];

    // Reduce the quantity or remove the item if quantity reaches zero
    if (item.quantity > quantityToRemove) {
      item.quantity -= quantityToRemove;
    } else {
      this.items.splice(itemIndex, 1); // Remove the item if quantity is zero or less
    }
    return this.save();
  } else {
    throw new Error('Item not found in the backpack');
  }
};

// Check if the backpack has space for more items based on the slots available
backpackSchema.methods.hasSpace = function () {
  return this.items.length < this.slots;
};

const BackpackModel = mongoose.model('Backpack', backpackSchema);

export default BackpackModel;
