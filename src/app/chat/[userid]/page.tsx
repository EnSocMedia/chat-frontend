"use client";
import ChatDayTime from "@/components/ChatDayTime";
import ChatText from "@/components/ChatText";
import Chatnavbar from "@/components/Chatnavbar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useGetMessagesUsingUserId } from "@/hooks/useGetMessages";
import { useMovementAudio } from "@/hooks/useMovementAudio";
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
import { useEffect, useMemo, useState } from "react";
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
  const { playing, toggle } = useMovementAudio();
  const chats = useAppSelector((state) => state.websocket.chats);
  const { isFetching } = useGetMessagesUsingUserId(params.userid);
  const [textToSend, setTextToSend] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   dispatch(websocketConnect());
  // }, []);

  function messageSendHandler() {
    if (textToSend.trim().length==0)
      {
        return;
      }
    const message = {
      cipher: textToSend,
      cipherSelf: textToSend,
      messageType: "private_message",
      messageId: v4(),
      to: params.userid,
      infoType: "message",
    } as ClientMessage;
    dispatch(sendMessageUsingHttp(message));

    setTextToSend("");
    toggle();
  }
  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      messageSendHandler();
    }
  };
  
  const groupedMessages = useMemo(() => {
    if (messages[params.userid]?.messages) {
      return groupBy(
        messages[params.userid].messages
          .concat(messages[params.userid].pendingMessages)
          .sort(sortByTime),
        "time"
      );
    } else {
      return {};
    }
  }, [messages, params.userid]);

  useEffect(() => {
    var elem = document.getElementById("chatdata");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [groupedMessages]);

  if (!chats[params.userid]?.name) {
    router.push("/chat");
    return;
  }

  return (
    <div className="h-[94vh]">
      <Chatnavbar
        userid={chats[params.userid].name}
        publicKey={params.userid}
      />
      <div className="text-white h-full">
        <div className="h-full flex flex-col justify-end gap-4">
          {isFetching && <div>Fetching</div>}
          <div
            id="chatdata"
            className="flex gap-2 flex-col overflow-y-scroll px-8"
          >
            {Object.entries(groupedMessages).map((value, index) => {
              return (
                <div key={index}>
                  <ChatDayTime time={parseInt(value[0])} />
                  {value[1].map((msg, index) => {
                    return (
                      <ChatText
                        to={msg.toName}
                        hash={msg.cipher}
                        type={msg.infoType}
                        sent={msg.to == params.userid}
                        status={msg.status}
                        text={
                          msg.to == params.userid ? msg.cipherSelf : msg.cipher
                        }
                        time={msg.time}
                        key={index}
                        value={
                          msg.infoType == "transaction"
                            ? msg.cipherSelf
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="w-full flex gap-2 pb-4 px-10 !pl-8">
            <input
              value={textToSend}
              onChange={(e) => {
                sendTypingInfo(params.userid);
                setTextToSend(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              type="text"
              className="text-black bg-red w-full rounded-md"
            />
            <button
              className="bg-[#9400FF] p-2 rounded-md "
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
