"use client";
import ChatDayTime from "@/components/ChatDayTime";
import ChatText from "@/components/ChatText";
import Chatnavbar from "@/components/Chatnavbar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useGetMessagesUsingUserId } from "@/hooks/useGetMessages";
import { getDateFromTimestamp } from "@/lib/functions/moment";
import sendTypingInfo from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getMessagesUsingUserId,
  sendMessageUsingHttp,
} from "@/store/message/actions";
import { websocketConnect } from "@/store/socket";
import { ClientMessage, Message } from "@/types/message";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { text } from "stream/consumers";
import { v4 } from "uuid";
import { toHex } from "viem";

function sortByTime(a: Message, b: Message) {
  if (a.time > b.time) return 1;
  if (a.time < b.time) return -1;

  return 0;
}

function getStartOfDayTimestamp(timestamp: number) {
  // Convert timestamp to Moment.js object
  const date = moment(timestamp);

  // Set time to start of the day (00:00:00)
  date.startOf("day");

  // Get Unix timestamp of the start of the day
  const startOfDayTimestamp = date.unix();
  console.log(startOfDayTimestamp);

  return startOfDayTimestamp;
}

function groupBy(array: Message[], property: string) {
  return array.reduce((acc: { [key: number]: Array<Message> }, obj: any) => {
    const key = obj[property];
    const keyStartTime = getStartOfDayTimestamp(key);
    if (!acc[keyStartTime]) {
      acc[keyStartTime] = [];
    }
    acc[keyStartTime].push(obj);
    return acc;
  }, {});
}

export default function Page({ params }: { params: { userid: string } }) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.websocket.chatMessages);

  const chats = useAppSelector((state) => state.websocket.chats);
  const { isFetching } = useGetMessagesUsingUserId(params.userid);
  const [textToSend, setTextToSend] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(websocketConnect());
  }, []);

  function messageSendHandler() {
    const message = {
      cipher: textToSend,
      cipherSelf: textToSend,
      messageType: "private_message",
      messageId: v4(),
      to: params.userid,
    } as ClientMessage;

    dispatch(sendMessageUsingHttp(message));
    setTextToSend("");
  }

  if (!chats[params.userid]?.name) {
    router.push("/chat");
    return;
  }

  const groupedMessages = groupBy(
    messages[params.userid].messages
      .concat(messages[params.userid].pendingMessages)
      .sort(sortByTime),
    "time"
  );

  console.log("hrouped", groupedMessages);

  return (
    <div className="h-[88vh] p-4">
      <Chatnavbar userid={chats[params.userid].name} />
      <div className="text-white h-full">
        <div className="h-full flex flex-col justify-end gap-4">
          {isFetching && <div>Fetching</div>}
          <div className="flex gap-2 flex-col overflow-y-scroll">
            {Object.entries(groupedMessages).map((value, index) => {
              return (
                <div key={index}>
                  <ChatDayTime time={parseInt(value[0])} />
                  {value[1].map((msg, index) => {
                    return (
                      <ChatText
                        sent={msg.to == params.userid}
                        status={msg.status} 
                        text={
                          msg.to == params.userid ? msg.cipherSelf : msg.cipher
                        }
                        time={msg.time}
                        key={index}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="w-full flex gap-2 pb-4">
            <input
              value={textToSend}
              onChange={(e) => {
                sendTypingInfo(params.userid);
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
