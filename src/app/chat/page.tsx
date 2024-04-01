"use client";

import ChatPage from "@/components/ChatPage";
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
        Chat Page
        {Object.entries(chats).map((chat, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                router.push(`chat/${chat[0]}`);
              }}
            >
              {chat[0]}
              <div>Message: {chat[1].last_message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
