import { useEffect, useState } from "react";
import { createPublicClient, formatEther, http } from "viem";
import { privateKeyToAddress, publicKeyToAddress } from "viem/accounts";
import { sepolia } from "viem/chains";

export const useGetTransaction = (hash: string) => {
  const address=localStorage.getItem("address");
  const [balance, setBalance] = useState("");
  const [id,setId]=useState("");
  const [bool,setBool]=useState(false);
  const getTransaction = async () => {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    const transaction = await publicClient.getTransaction({ 
        hash: hash as '0x{string}'
      });
    if (address==transaction.to)
      {
        setBool(true);
        setId(transaction.from);
      }
    else
    {
      setBool(false);
      setId(transaction.to!);
    }
    const bal = formatEther(transaction.value).substring(0, 7);
    setBalance(bal);
  };
  useEffect(() => {
    getTransaction();
  }, []);

  return {bool,id,balance};
};
