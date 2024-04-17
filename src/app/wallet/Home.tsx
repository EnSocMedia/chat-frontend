// Import necessary packages
"use client";
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import img1 from './Home.jpg';
import Footer from './footer';
import History from './history';
import Cards from './cards';

// Define the MyComponent
const MyComponent = () => {
  // State to manage the visibility of the QR code popup and QR data
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrData, setQRData] = useState('');

  // Function to generate random string and update QR data
  const generateQRData = () => {
    const randomString = Math.random().toString(36).substring(7);
    setQRData(randomString);
    setShowQRPopup(true);
  };

  // Function to close the QR popup
  const closeQRPopup = () => {
    setShowQRPopup(false);
  };

  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-9 lg:overflow-visible">
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
        {/* Navigation bar */}
        <nav className="sticky top-0 z-10 grid place-items-center w-full max-w-full px-4 py-2 text-white bg-blue border rounded-none shadow-md h-max border-red/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div>
            <div className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> Welcome to Wallet page !!</div>
          </div>
        </nav>

        {/* Main content */}
        <div className="grid grid-rows-1 md:grid-cols-2 gap-5 pt-3">
          <div className="relative flex flex-col mb-12 overflow-hidden text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <Image
              src={img1}
              alt="nature"
              className="h-[32rem] w-full object-cover object-center"
            />
          </div>

          <div className="gap-5" >
            <Cards />
            <div className="grid grid-rows-1  grid-flow-col gap-2 p-3">
              {/* Deposit button */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateQRData}>
                Deposit
              </button>
              {/* Withdraw button */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Withdraw
              </button>
            </div>
            {/* History component */}
            <div>
              <History />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Popup */}
      {/* Render popup if showQRPopup is true */}
      {showQRPopup && (
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
      {/* Render QR code with qrData */}
      <QRCode value={qrData} />
    </div>
  </div>
)}

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default MyComponent;
