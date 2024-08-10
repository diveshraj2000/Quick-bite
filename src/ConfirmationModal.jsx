import React from 'react';
import './App.css';
import questionMark from '../src/images/question.png';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex items-center mx-auto justify-center">
          <img src={questionMark} alt="" />
        </div>

        <h2 className="text-xl font-medium mb-4">
          Are you sure you want to clear the cart?
        </h2>
        <div className="flex justify-around mt-4">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 req-font req-border rounded-lg"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
