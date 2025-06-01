import React from "react";

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/30 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-transform duration-300 ease-out scale-100 hover:scale-[1.02]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="confirm-modal-title"
          className="text-2xl font-semibold text-gray-900 mb-6 text-center"
        >
          {message}
        </h3>
        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition"
            autoFocus
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
