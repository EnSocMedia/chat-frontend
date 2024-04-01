"use client";

import ChatPage from "@/components/ChatPage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
  useEffect(() => {
    dispatch(websocketConnect());
    dispatch(getMessagesOnBootstrap());
  }, []);

  return (
    <div >
      <div>
      <Navbar/>
      <Sidebar/>
      </div>
    </div>
  );
}
