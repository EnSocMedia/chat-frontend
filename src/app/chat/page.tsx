"use client";

import ChatPage from "@/components/ChatPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessageUsingHttp } from "@/store/message/actions";
import {
  webSocketReceiveMessage,
  websocketConnect,
  websocketSendMessage,
} from "@/store/socket";
import { useEffect, useState } from "react";

export default function Chat() {
  const [showChatPage, setShowChatPage] = useState<string>("");
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.websocket.chatsMessage);
  useEffect(() => {
    dispatch(websocketConnect());
  }, []);

  return (
    <div>
      {!showChatPage && (
        <div>
          Chat Page
          {Object.entries(chats).map((chat, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setShowChatPage(chat[0]);
                }}
              >
                {chat[0]}
                <div>Message: {chat[1].last_message}</div>
              </div>
            );
          })}
          <button
            onClick={() => {
              dispatch(
                sendMessageUsingHttp({
                  uid: "sfbdsjbf",
                  message_type: "private_message",
                  cipher: "HELLO",
                  public_key:
                    "03e76a177d1bcc2a47e7c85e9c2c224e2ca6b93b90b688eb36c2817cd2e61a80ce",
                })
              );

              dispatch(
                webSocketReceiveMessage({
                  message: {
                    uid: "sfbdsjbf",
                    message_type: "private_message",
                    cipher: "HELLO",
                    public_key:
                      "03e76a177d1bcc2a47e7c85e9c2c224e2ca6b93b90b688eb36c2817cd2e61a80ce",
                  } as any,
                })
              );
            }}
          >
            Send message
          </button>
        </div>
      )}

      {showChatPage && (
        <div>
          <ChatPage chatId={showChatPage} />
        </div>
      )}
    </div>
  );
}
