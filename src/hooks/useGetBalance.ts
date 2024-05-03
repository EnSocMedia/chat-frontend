import { useEffect, useState } from "react";
import { createPublicClient, formatEther, http } from "viem";
import { privateKeyToAddress, publicKeyToAddress } from "viem/accounts";
import { sepolia } from "viem/chains";

export const useGetBalance = () => {
  const [balance, setBalance] = useState("");

  const getbalance = async () => {
    const address = localStorage.getItem("address") as "0x{string}"
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    const bala = await publicClient.getBalance({
      address: address,
    });
    const bal = formatEther(bala).substring(0, 7);

    setBalance(bal);
  };
  useEffect(() => {
    getbalance();
  }, []);

  return { balance };
};
