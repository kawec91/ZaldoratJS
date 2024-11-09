import React from 'react';

const ConfirmDeleteModal = ({ item, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-gray-800 rounded-md p-4 w-1/3">
      <h3 className="text-center text-white text-2xl mb-4">Confirm Delete</h3>
      <p className="text-white text-center">Are you sure you want to delete {item.name}?</p>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md mx-2" onClick={onConfirm}>
          Confirm
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md mx-2" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDeleteModal;
