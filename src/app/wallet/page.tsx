"use client";

import Image from "next/image";
import HomePage from './Home'
import Navbar from "@/components/Navbar";
import { balance } from "@/lib/functions/balance";
import { balanceviem } from "@/lib/functions/balanceviem";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";


export default function Home() {
  const [bal,setBal]=useState("");
  const [isLoading,setIsLoading]= useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
        try {
            //const data=await balance();
            const data1=await balanceviem();
            //console.log("balance");
            //console.log(data1);
            setBal(data1);
        } catch (error) {
            console.error(error);
        }
    };
    getData();
}, []);
  return (
    <div>
      <Navbar/>
      <HomePage/>
    </div>
   
  );
}
