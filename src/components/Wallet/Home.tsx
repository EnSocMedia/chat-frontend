// Import necessary packages
"use client";
import React, { useState } from "react";
import QRCode from "qrcode.react";
import Image from "next/image";
import img1 from "./Home.jpg";
import Footer from "./footer";
import History from "./history";
import Cards from "./cards"; // Import the new component
import QRCodePopup from "@/components/QrCode";
import TransactionPopup from "@/components/Transaction";
import { useGetWallet } from "@/hooks/useGetWallet";
import CopyableText from "@/components/CopyableText";

// Define the MyComponent
export default function MyComponent() {
  // State to manage the visibility of the QR code popup and QR data
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [sendTran, setSendTran] = useState(false);
  const [qrData, setQRData] = useState("");
  const { address } = useGetWallet();

  // Function to generate random string and update QR data
  const generateQRData = () => {
    const randomString = Math.random().toString(36).substring(7);
    setQRData(randomString);
    setShowQRPopup(true);
  };

  const showSendTransaction = () => {
    setSendTran(true);
  };

  // Function to close the QR popup
  const closeQRPopup = () => {
    setShowQRPopup(false);
  };

  const closeTransactionPopup = () => {
    setSendTran(false);
  };

  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-9 lg:overflow-visible">
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
        {/* Navigation bar */}
        <nav className="sticky top-0 z-10 grid justify-items-center w-full max-w-full px-4 py-2 text-white bg-blue border rounded-none shadow-md h-max border-red/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              Welcome to Wallet page !!
            </div>
            <div className="pt-2">
              <div className="flex justify-center">
                <CopyableText text={address} />
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="grid grid-rows-1 md:grid-cols-2 gap-5 pt-3">
          <div className="relative flex flex-col mb-12 overflow-hidden text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <Image
              src={img1}
              alt="nature"
              className="h-[36rem] w-full object-cover object-center"
            />
          </div>

          <div className="gap-5">
            <Cards />
            <div className="grid grid-rows-1  grid-flow-col gap-2 p-3">
              {/* Deposit button */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generateQRData}
              >
                Deposit
              </button>

              {/* Send button */}
              <button
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={showSendTransaction}
              >
                Send
              </button>
            </div>
            {/* History component */}
            <div>
              <History address={address} />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Popup */}
      {/* Render popup if showQRPopup is true */}
      {!sendTran && showQRPopup && (
        <QRCodePopup qrData={qrData} closeQRPopup={closeQRPopup} />
      )}
      {sendTran && (
        <TransactionPopup closeTransactionPopup={closeTransactionPopup} />
      )}
      {/*sendTran && </>*/}
      {/* Footer component */}
      <Footer />
    </div>
  );
}
