import React, { useState } from "react";
import man from "../components/Wallet/4x/man.png";

import Image from "next/image";
import { useGetWallet } from "@/hooks/useGetWallet";
import { useGetBalance } from "@/hooks/useGetBalance";
interface ProfileProps {
  name: string;
  onClose: any;
}
function ProfileModal({ onClose }: ProfileProps) {
  const { address } = useGetWallet();
  const [name, setName] = useState("");
  const { balance, refreshBalance } = useGetBalance();
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            <Image
              className="w-32 h-32 rounded-full mx-auto"
              src={man}
              alt="Profile picture"
            />
            <h2 className="text-center text-gray-600 mt-1">{name}</h2>
            <p className="text-center text-gray-600 mt-1">Address:{address}</p>
            <p className="text-center text-gray-600 mt-1">
              Balance : {balance}
            </p>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
