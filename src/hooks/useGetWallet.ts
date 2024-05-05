import { useEffect,useState } from "react";
import { privateKeyToAddress } from "viem/accounts";


export const useGetWallet = () =>{
    const [address,setAddress]=useState("");

    const getwallet = async() =>{
    const address=localStorage.getItem("address");
    setAddress(address!);
    }
    useEffect(() => {
        getwallet();
      }, []);
    
    return {address};
}