"use client";
import React from 'react';
import Image from 'next/image';
import Eth from "./4x/Eth@4x.png"
import bitcoinpic from "./4x/Asset 1@4x.png"
import { useGetBalance } from '@/hooks/useGetBalance';

export default function Cards() {
  const {balance,refreshBalance} = useGetBalance();
    return (
        <div className="max-h-[310px] overflow-y-auto grid grid-rows-1  grid-flow-col gap-2 p-4">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image
            className="p-5 rounded-t-lg"
            src={bitcoinpic}
            alt="product image"
            style={{ width: '250px', height: '200px' }}
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Ethereum
            </h5>
          </a>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {balance} ETH
            </span>
            <button
              onClick={refreshBalance} // Call refreshBalance function on button click
              className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>
      </div>
        

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
          <Image
              className="p-5 rounded-t-lg"
              src={Eth}
              alt="product image"
              style={{ width: '250px', height: '200px' }}
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Bitcoin
              </h5>
            </a>
            
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    );};
