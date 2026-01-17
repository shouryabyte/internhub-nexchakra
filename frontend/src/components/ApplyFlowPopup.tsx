import React from 'react';
import { Company } from '../types';

interface ApplyFlowPopupProps {
  company: Company;
  onConfirm: () => void;
  onDismiss: () => void;
}

const ApplyFlowPopup: React.FC<ApplyFlowPopupProps> = ({ company, onConfirm, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Did you apply for this internship?</h2>
        <p className="text-gray-600 mb-6">
          You were redirected to <span className="font-semibold">{company.name}</span>'s career page.
          Did you complete your application?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Yes, I Applied
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyFlowPopup;
