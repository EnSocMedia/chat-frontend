// Import necessary packages
"use client";
import React from 'react';
import {useTransaction} from '@/hooks/useTransaction';
import { useEffect, useState } from "react";
import { useGetBalance } from '@/hooks/useGetBalance';
import { privateKeyToAccount } from 'viem/accounts';
import { createPublicClient, formatEther, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';

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
    const {balance,refreshBalance} = useGetBalance();

    const handleConfirm = async () => {
    let audio=new Audio("/sentmoney.mp3");
      setErrors({});
      let formIsValid = true;
    if (publicKey.length != 42) {
      setErrors((prevErrors) => ({ ...prevErrors, publicKey: "Address is incorrect" }));
      formIsValid = false;
    }    
    if (!amount.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, amount: "Amount is required" }));
      formIsValid = false;
      return;
    }
    const privateKey = localStorage.getItem("privatekey");
    const pvtkey='0x'+privateKey;
    const account = privateKeyToAccount(pvtkey as "0x${string}");
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http()
    })

    const gas = await publicClient.estimateGas({ 
      account,
      to: publicKey as '0x{string}',
      value: parseEther(amount)
    })

    const tgas=formatEther(gas);
    const tran=parseFloat(tgas)+parseFloat(amount);
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
        const flag=await onSendViem(publicKey, amount);
        console.log(flag);
        if (flag==true)
          {
            audio.play();
            alert("Payment sent");
            setIsLoading(false);
            closeTransactionPopup();
          }

        setIsLoading(false);
    }
    setIsLoading(false);
    };
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#202020] p-11 rounded-lg relative w-96">
        {/* Close button */}
        <button 
          className="absolute top-0 right-0 p-2 text-white hover:text-gray-900" 
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
          <label htmlFor="publicKey" className="block text-white text-sm font-bold mb-2">Address</label>
          <input
            type="text"
            id="publicKey"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#313131]/90"
            placeholder="Enter wallet address"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          {errors.publicKey && <p className="text-red-500 text-xs italic">{errors.publicKey}</p>}
        </div>
        {/* Amount input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-white text-sm font-bold mb-2">Amount</label>
          <input
            type="text"
            id="amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#313131]/90"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className='flex justify-end text-sm text-white pt-3'>{balance}</div>
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

export default TransactionPopup;
