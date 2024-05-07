// Import necessary packages
"use client";
import React from 'react';
import {useTransaction} from '@/hooks/useTransaction';
import { useEffect, useState } from "react";

interface TransactionPopupProps {
    closeTransactionPopup: () => void;
  }

// Define the QRCodePopup component
const TransactionPopup = ({closeTransactionPopup }: TransactionPopupProps) => {
    const [publicKey, setPublicKey] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const {onSendViem,onSendRawTransaction } = useTransaction();
    const [selectedOption, setSelectedOption] = useState<string>("option1");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading]= useState(false);


    const handleConfirm = async () => {
      
      setErrors({});
      let formIsValid = true;
    if (publicKey.length != 42) {
      setErrors((prevErrors) => ({ ...prevErrors, publicKey: "Public Key is incorrect" }));
      formIsValid = false;
    }    
    if (!amount.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, amount: "Amount is required" }));
      formIsValid = false;
    }
      if (formIsValid){
      if (selectedOption === "option1") {
        setIsLoading(true);
        console.log("settrue");
        await onSendViem(publicKey, amount);
        console.log("setfalse");
        setIsLoading(false);
      } else {
        console.log("option2");
        onSendRawTransaction(publicKey, amount);
      }
      setIsLoading(false);
    }
    setIsLoading(false);
    };
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-11 rounded-lg relative w-96">
        {/* Close button */}
        <button 
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900" 
          onClick={closeTransactionPopup}
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
        {/* Public Key input */}
        <div className="mb-4">
          <label htmlFor="publicKey" className="block text-gray-700 text-sm font-bold mb-2">Public Key</label>
          <input
            type="text"
            id="publicKey"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          {errors.publicKey && <p className="text-red-500 text-xs italic">{errors.publicKey}</p>}
        </div>
        {/* Amount input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
          <input
            type="text"
            id="amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
        </div>
        {/* <div className="mb-6 flex justify-between">
          <div>
            <input
              type="radio"
              id="option1"
              name="option"
              value="option1"
              checked={selectedOption === "option1"}
              onChange={() => setSelectedOption("option1")}
            />
            <label htmlFor="option1" className="ml-2 text-black">Send via Client    </label>
          </div>
          <div>
            <input
              type="radio"
              id="option2"
              name="option"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={() => setSelectedOption("option2")}
            />
            <label htmlFor="option2" className="ml-2 text-black">Send via Server    </label>
          </div>
        </div> */}
        {/* Confirm button */}
        <div className="flex justify-center">
        { !isLoading ? <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleConfirm}
        >
          Send
        </button> :  <div className="rounded-full border-t-4 border-blue-500 border-solid h-10 w-10 animate-spin"></div>}
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
