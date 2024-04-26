"use client";

import Image from "next/image";
import HomePage from './Home'
import Navbar from "@/components/Navbar";
import { balance } from "@/lib/functions/balance";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";


export default function Home() {
  const [bal,setBal]=useState(null);
  const [isLoading,setIsLoading]= useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
        try {
            const data=await balance();
            setBal(data);
        } catch (error) {
            console.error(error);
        }
    };
    getData();
}, []);

  console.log("balance inside the wallet");
  console.log(bal);
  return (
    <div>
      <Navbar/>
      <HomePage/>
    </div>
   
  );
}
