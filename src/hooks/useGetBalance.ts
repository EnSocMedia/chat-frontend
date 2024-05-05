import { useEffect, useState } from "react";
import { createPublicClient, formatEther, http } from "viem";
import { sepolia } from "viem/chains";

export const useGetBalance = () => {
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    const address = localStorage.getItem("address") as "0x{string}";
    const privateKey=localStorage.getItem('privatekey');
    console.log(privateKey);
    console.log(address);
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    const bala = await publicClient.getBalance({
      address: address,
    });
    console.log(bala);
    console.log("balance");
    console.log(formatEther(bala));
    const bal = formatEther(bala).substring(0, 7);
    setBalance(bal);
  };

  const refreshBalance = async () => {
    await getBalance();
  };

  useEffect(() => {
    getBalance();
  }, []);

  return { balance, refreshBalance };
};