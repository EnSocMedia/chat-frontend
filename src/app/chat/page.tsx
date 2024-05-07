"use client";

import ChatPage from "@/components/ChatPage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from 'next/image';
import img1 from './img/6493507.jpg';
import {
  getMessagesOnBootstrap,
  getMessagesUsingUserId,
  sendMessageUsingHttp,
} from "@/store/message/actions";
import {
  webSocketReceiveMessage,
  websocketConnect,
  websocketSendMessage,
} from "@/store/socket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chat() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.websocket.chats);


  return (
    <div className="flex justify-center items-center h-full" >
      <div className="font-bold text-[24px] px-10 text-center" >
        Welcome to EncSoMedia Chat With anyone in this world securely with just 
        cryptographic keys
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={img1} alt="chatPic" width={500} height={500}  style={{ borderRadius: '10%' }}/>
        </div>

      </div>
    </div>
  );
}
