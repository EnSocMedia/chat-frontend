import { useEffect, useState } from "react";
import { createPublicClient, erc20Abi, getContract, http } from "viem";
import { sepolia } from "viem/chains";

export const useFetchBalance = () => {
    const address=localStorage.getItem("address");
    const [balalnce,setBalance]=useState("");

    const fetchBalance = async () => {
        const publicClient = createPublicClient({
            chain: sepolia,
            transport: http(),
          })
        const balance = await publicClient.readContract({
            address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address! as '0x{string}']
          })
          const bal=balance /BigInt((Math.pow(10,6)));
          const strbal=bal.toString();
          setBalance(strbal);
    };

    useEffect(()=>{
        fetchBalance();
    },[]);

    return {
        balalnce
    }
}