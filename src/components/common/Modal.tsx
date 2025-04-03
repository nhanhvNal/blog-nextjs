"use client";

import React, { useEffect, useState } from "react";

interface ModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onConfirm,
  onCancel,
  message,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 opacity-100">
      <div
        className={`bg-white p-8 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {message}
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
