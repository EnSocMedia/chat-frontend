"use client";
import { useEvmNativeBalance } from '@moralisweb3/next';
import Image from "next/image";
import HomePage from "../../components/Wallet/Home";
import Navbar from "@/components/Navbar";
import { balance } from "@/lib/functions/balance";
import { balanceviem } from "@/lib/functions/balanceviem";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Home() {
  const [bal, setBal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: nativeBalance } = useEvmNativeBalance({ address:"0x4847eB930c61eFC853494503eC91DF73cE3da867" });
  console.log(nativeBalance)
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}
