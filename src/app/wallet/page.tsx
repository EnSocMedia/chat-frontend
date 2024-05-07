"use client";

import Image from "next/image";
import HomePage from "../../components/Wallet/Home";
import Navbar from "@/components/Navbar";
import { balance } from "@/lib/functions/balance";
import { balanceviem } from "@/lib/functions/balanceviem";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNFTs } from "@/hooks/useGetNFTs";

export default function Home() {
  const [bal, setBal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { nfts } = useNFTs();

  return (
    <div>
      <Navbar />
      <HomePage nfts={nfts} />
    </div>
  );
}
