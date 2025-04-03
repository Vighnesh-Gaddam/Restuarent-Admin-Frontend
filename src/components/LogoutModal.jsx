import React from "react";

const LogoutModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-full"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
