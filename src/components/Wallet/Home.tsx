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
import { Nft } from "@/types/nft";
import NftCard from "./NftCard";

// Define the MyComponent
export default function MyComponent({ nfts }: { nfts: Nft[] }) {
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
        <nav className="grid justify-items-center w-full max-w-full px-4 py-2 text-white h-max  lg:px-8 lg:py-4">
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

        <div>
          <h1 className="font-bold  text-[30px] py-2">NFTs</h1>
          <div className="flex gap-2">
            {nfts.map((nft, index) => {
              return (
                <div key={index}>
                  <NftCard
                    collectionName={nft.collection}
                    tradeurl={nft.opensea_url}
                    image={nft.image_url}
                    name={nft.name}
                  />
                </div>
              );
            })}
            {nfts.length === 0 && <div>You donot hold any NFTs</div>}
          </div>
        </div>

        {/* <div>
          <h1 className="font-bold  text-[30px] py-2">Tokens</h1>
          <table className="w-full">
            <thead>
              <th>
                <td>Token</td>
              </th>
              <th>
                <td>Price</td>
              </th>
              <th>
                <td>Holdings</td>
              </th>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <h1 className="font-bold  text-[30px] py-2 pt-4">Tokens</h1>
        <div className="grid grid-rows-1 md:grid-cols-2 gap-5 pt-3">
          <div className="gap-5 w-[350px]">
            <Cards />
            <div className="grid grid-rows-1  grid-flow-col gap-2 pt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white transition-all duration-300 font-bold py-2 px-4 rounded"
                onClick={generateQRData}
              >
                Deposit
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 transition-all duration-300 text-white font-bold py-2 px-4 rounded"
                onClick={showSendTransaction}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {!sendTran && showQRPopup && <QRCodePopup closeQRPopup={closeQRPopup} />}
      {sendTran && (
        <TransactionPopup closeTransactionPopup={closeTransactionPopup} />
      )}
    </div>
  );
}
