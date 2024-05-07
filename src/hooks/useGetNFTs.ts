import { NFTResponse, Nft } from "@/types/nft";
import { useEffect, useState } from "react";

export const useNFTs = () => {
  const address = localStorage.getItem("address");
  const [nfts, setNFTs] = useState<Array<Nft>>([]);

  const getNFTs = async () => {
    const req = await fetch(
      `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/0xa7a0a01ec000cf704be944fe368b369e22fd1b13/nft`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = (await req.json()) as NFTResponse;
    setNFTs(response.nfts);
  };

  useEffect(() => {
    getNFTs();
  }, []);

  return {
    nfts
  }
};
