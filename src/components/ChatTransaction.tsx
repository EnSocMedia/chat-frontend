// Import necessary packages
"use client";
import React from 'react';
import {useTransaction} from '@/hooks/useTransaction';
import { useEffect, useState } from "react";
import secp256k1, { publicKeyConvert } from "secp256k1";
import { toHexString } from '@/lib/functions/utils';
import { publicKeyToAddress } from 'viem/utils';
import { useGetBalance } from '@/hooks/useGetBalance';

interface TransactionPopupProps {
    publicKey:string,
    closeTransactionPopup: () => void;
  }

// Define the QRCodePopup component
const ChatTransactionPopup = ({publicKey,closeTransactionPopup }: TransactionPopupProps) => {
    const [amount, setAmount] = useState<string>("");
    const {onSendViem,onSendRawTransaction } = useTransaction();
    const [selectedOption, setSelectedOption] = useState<string>("option1");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading]= useState(false);
    const pubkey="0x"+publicKey
    const address=publicKeyToAddress(pubkey as '0x{string');
    const {balance,refreshBalance} = useGetBalance();
    let audio=new Audio("/sentmoney.mp3");
    const handleConfirm = async () => {
      setErrors({});
      let formIsValid = true; 
    if (!amount.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, amount: "Amount is required" }));
      formIsValid = false;
      return;
    } 
    const tran=parseFloat(amount)+0.001;
    const bal=parseFloat(balance);
    if (tran>bal)
      {
        console.log(parseFloat(amount)-0.001);
        console.log(parseFloat(balance));
        setErrors((prevErrors)=>({...prevErrors,amount:"Amount is not sufficient"}))
        formIsValid=false;
      }
      if (formIsValid){
        setIsLoading(true);
        const flag=await onSendViem(address, amount,publicKey);
        setIsLoading(false);
        if (flag==true)
          {
            audio.play();
            alert("Payment sent");
            setIsLoading(false);
            closeTransactionPopup();
          }
    }
    };
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border-4 border-gray-200 border-opacity-25 rounded-full animate-spin w-12 h-12"></div> :<div className="bg-white p-11 rounded-lg relative w-96">
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
          <div className='flex justify-end text-sm text-black'>{balance}</div>
          {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
        </div>
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

export default ChatTransactionPopup;
