import React, { useState, useEffect } from 'react';

export default function ItemPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    idNumber: '',
    name: '',
    cost: '',
    weight: '',
    type: 'Equipment',
    slot: 'None',
    durability: 100,
    power: 0,
    defense: 0,
    special: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [activeTab, setActiveTab] = useState('Create');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [giveItemData, setGiveItemData] = useState({
    itemId: '',
    quantity: 1,
    modifiedStats: { 
      durability: 100, 
      power: 0, 
      defense: 0, 
      special: '' 
    }
  });

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch('/api/characters');
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      const data = await response.json();
      console.log(data); // Log the characters data for debugging
      setCharacters(data); // Set the characters state with the fetched data
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCharacters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGiveItemChange = (e) => {
    const { name, value } = e.target;
    if (name in giveItemData.modifiedStats) {
      setGiveItemData({
        ...giveItemData,
        modifiedStats: { ...giveItemData.modifiedStats, [name]: value },
      });
    } else {
      setGiveItemData({ ...giveItemData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/items/${editItemId}` : '/api/items';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchItems();
        resetForm();
      } else {
        const errorText = await response.text();
        console.error('Failed to create/update item:', errorText);
      }
    } catch (error) {
      console.error('Error creating/updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchItems();
      } else {
        const errorText = await response.text();
        console.error('Failed to delete item:', errorText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      idNumber: '',
      name: '',
      cost: '',
      weight: '',
      type: 'Equipment',
      slot: 'None',
      durability: 100,
      power: 0,
      defense: 0,
      special: '',
    });
    setIsEditing(false);
    setEditItemId(null);
  };

  const handleTypeSelect = (type) => {
    setFormData({
      ...formData,
      type,
      slot: type === 'Resources' ? 'None' : formData.slot,
      durability: type === 'Consumables' ? 0 : 100,
      power: type === 'Consumables' ? 0 : formData.power,
      defense: type === 'Consumables' ? 0 : formData.defense,
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setEditItemId(item._id);
    setActiveTab('Create');
  };

  const handleGiveItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/backpack/${selectedCharacter}/add-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: giveItemData.itemId,
          quantity: giveItemData.quantity,
          modifiedStats: giveItemData.modifiedStats,
        }),
      });

      if (response.ok) {
        alert('Item given successfully!');
        setGiveItemData({ itemId: '', quantity: 1, modifiedStats: { durability: 100, power: 0, defense: 0, special: '' } });
        setSelectedCharacter('');
      } else {
        const errorText = await response.text();
        console.error('Failed to give item:', errorText);
      }
    } catch (error) {
      console.error('Error giving item:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl mb-4">Create or Manage Items</h2>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('Create')}
          className={`flex-1 py-2 text-center ${activeTab === 'Create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Create Item
        </button>
        <button
          onClick={() => setActiveTab('ItemList')}
          className={`flex-1 py-2 text-center ${activeTab === 'ItemList' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Item List
        </button>
        <button
          onClick={() => setActiveTab('GiveItem')}
          className={`flex-1 py-2 text-center ${activeTab === 'GiveItem' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Give Item
        </button>
      </div>

      {/* Create Item Form */}
      {activeTab === 'Create' && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {['Equipment', 'Resources', 'Consumables', 'Other'].map((type) => (
              <div
                key={type}
                className={`border p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200 ${formData.type === type ? 'bg-gray-300' : ''}`}
                onClick={() => handleTypeSelect(type)}
              >
                <h3 className="text-lg font-semibold">{type}</h3>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">ID Number</label>
                <input
                  type="number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="ID Number"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="Cost"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight"
                  className="border p-2 w-full"
                  required
                />
              </div>
              {formData.type !== 'Consumables' && formData.type !== 'Resources' && (
                <div>
                  <label className="block mb-1">Slot</label>
                  <select
                    name="slot"
                    value={formData.slot}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  >
                    <option value="None">None</option>
                    <option value="Head">Head</option>
                    <option value="Body">Body</option>
                    <option value="Legs">Legs</option>
                    <option value="Feet">Feet</option>
                    <option value="Accessory">Accessory</option>
                  </select>
                </div>
              )}
              {formData.type !== 'Resources' && (
                <>
                  <div>
                    <label className="block mb-1">Durability</label>
                    <input
                      type="number"
                      name="durability"
                      value={formData.durability}
                      onChange={handleInputChange}
                      placeholder="Durability"
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Power</label>
                    <input
                      type="number"
                      name="power"
                      value={formData.power}
                      onChange={handleInputChange}
                      placeholder="Power"
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Defense</label>
                    <input
                      type="number"
                      name="defense"
                      value={formData.defense}
                      onChange={handleInputChange}
                      placeholder="Defense"
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Special</label>
                    <input
                      type="text"
                      name="special"
                      value={formData.special}
                      onChange={handleInputChange}
                      placeholder="Special"
                      className="border p-2 w-full"
                    />
                  </div>
                </>
              )}
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              {isEditing ? 'Update Item' : 'Create Item'}
            </button>
          </form>
        </>
      )}

      {/* Item List */}
      {activeTab === 'ItemList' && (
        <div className="mb-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {['ID', 'Name', 'Cost', 'Weight', 'Actions'].map((header) => (
                  <th key={header} className="border border-gray-300 p-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 p-2">{item.idNumber}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.cost}</td>
                  <td className="border border-gray-300 p-2">{item.weight}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Give Item */}
      {activeTab === 'GiveItem' && (
        <form onSubmit={handleGiveItemSubmit} className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Select Character</label>
              <select
                name="selectedCharacter"
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                className="border p-2 w-full"
                required
              >
                <option value="">Select a character</option>
                {characters.map((character) => (
                  <option key={character._id} value={character._id}>
                    {character.character_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Select Item</label>
              <select
                name="itemId"
                value={giveItemData.itemId}
                onChange={handleGiveItemChange}
                className="border p-2 w-full"
                required
              >
                <option value="">Select an item</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={giveItemData.quantity}
                onChange={handleGiveItemChange}
                min="1"
                className="border p-2 w-full"
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Give Item
          </button>
        </form>
      )}
    </div>
  );
}
