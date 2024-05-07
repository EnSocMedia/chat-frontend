import { NFTResponse, Nft } from "@/types/nft";
import { useEffect, useState } from "react";

export const useNFTs = () => {
  const address = localStorage.getItem("address");
  const [nfts, setNFTs] = useState<Array<Nft>>([]);

  const getNFTs = async () => {
    const req = await fetch(
      `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nft`,
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
