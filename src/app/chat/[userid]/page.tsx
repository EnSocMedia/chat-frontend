"use client";
import ChatText from "@/components/ChatText";
import Chatnavbar from "@/components/Chatnavbar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useGetMessagesUsingUserId } from "@/hooks/useGetMessages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  MessageSend,
  getMessagesUsingUserId,
  sendMessageUsingHttp,
} from "@/store/message/actions";
import { websocketConnect } from "@/store/socket";
import { Message } from "@/types/message";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page({ params }: { params: { userid: string } }) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.websocket.chatMessages);
  const { isFetching } = useGetMessagesUsingUserId(params.userid);
  const [textToSend, setTextToSend] = useState("");
  const router = useRouter();

  useEffect(()=>{
    dispatch(websocketConnect())
  },[])

  function messageSendHandler() {
    const publicKey = localStorage.getItem("publicKey");
    const message = {
      uid: "sds",
      cipher: textToSend,
      messageType: "private_message",
      publicKey: params.userid,
    } as MessageSend;

    dispatch(sendMessageUsingHttp(message));
    setTextToSend("");
  }

  return (
    <div className="h-[88vh] p-4">
      <Chatnavbar userid={params.userid} />
      <div className="text-white h-full">
        <div className="h-full flex flex-col justify-end gap-4">
          {isFetching && <div>Fetching</div>}
          <div className="flex gap-2 flex-col overflow-y-scroll">
            {messages &&
              messages[params.userid] &&
              messages[params.userid].messages
                .map((message, index) => {
                  return (
                    <ChatText
                      key={index}
                      sent={message.to == params.userid}
                      text={message.cipher}
                    />
                  );
                })
                .reverse()}
          </div>
          <div className="w-full flex gap-2 pb-4">
            <input
              value={textToSend}
              onChange={(e) => {
                setTextToSend(e.target.value);
              }}
              type="text"
              className="text-black bg-red w-full rounded-md"
            />
            <button
              className="bg-blue-600 p-2 rounded-md "
              onClick={messageSendHandler}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
