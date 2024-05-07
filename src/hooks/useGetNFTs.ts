import { useEffect, useState } from "react";

export const useNFTs =  () => {
    const address = localStorage.getItem("address");
    const [NFTs,setNFTs] = useState(" ");

    const getNFTs =async () => {
        const req=await fetch(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nft`);
        console.log(req);
        console.log("request");
        console.log(await req.json());
        
    }
    
    useEffect(()=>{
        getNFTs();
    },[])

}