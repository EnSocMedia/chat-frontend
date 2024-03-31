"use client";
import { useGetMessagesUsingUserId } from "@/hooks/useGetMessages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMessagesUsingUserId } from "@/store/message/actions";
import { Message } from "@/types/message";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Page({ params }: { params: { userid: string } }) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.websocket.chatMessages);
  const { isFetching } = useGetMessagesUsingUserId(params.userid);

  return (
    <div className="text-white">
      <div>
        Hello
        {params.userid}
      </div>

      <button>Get message</button>
      {isFetching && <div>Fetching</div>}
      {messages &&
        messages[params.userid] &&
        messages[params.userid].messages.map((message, index) => {
          return <div key={index}>{message.cipher}</div>;
        })}
    </div>
  );
}
