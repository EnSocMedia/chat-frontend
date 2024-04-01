"use client";
import { useGetMessagesUsingUserId } from "@/hooks/useGetMessages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  MessageSend,
  getMessagesUsingUserId,
  sendMessageUsingHttp,
} from "@/store/message/actions";
import { Message } from "@/types/message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page({ params }: { params: { userid: string } }) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.websocket.chatMessages);
  const { isFetching } = useGetMessagesUsingUserId(params.userid);
  const [textToSend, setTextToSend] = useState("");
  const router = useRouter();

  function messageSendHandler() {
    const publicKey = localStorage.getItem("publicKey");
    const message = {
      uid: "sds",
      cipher: textToSend,
      messageType: "private_message",
      publicKey: params.userid,
    } as MessageSend;

    dispatch(sendMessageUsingHttp(message));
  }

  return (
    <div className="text-white">
      <div
        onClick={() => {
          router.push("/chat", {
            scroll: true,
          });
        }}
      >
        Go back
      </div>
      {isFetching && <div>Fetching</div>}
      {messages &&
        messages[params.userid] &&
        messages[params.userid].messages.map((message, index) => {
          return <div key={index}>{message.cipher}</div>;
        })}

      <div>
        <input
          onChange={(e) => {
            setTextToSend(e.target.value);
          }}
          type="text"
          className="text-black"
        />
        <button onClick={messageSendHandler}>Send</button>
      </div>
    </div>
  );
}
