// Import necessary packages
"use client";
import React from 'react';
import QRCode from 'qrcode.react';
import { useGetWallet } from '@/hooks/useGetWallet';

interface QRCodePopupProps {
  closeQRPopup: () => void;
}

// Define the QRCodePopup component
const QRCodePopup = ({ closeQRPopup }: QRCodePopupProps) => {
  const { address } = useGetWallet();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        {/* Close button */}
        <button 
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900" 
          onClick={closeQRPopup}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        {/* Render QR code with address */}
        <QRCode value={address} />
      </div>
    </div>
  );
};

export default QRCodePopup;
