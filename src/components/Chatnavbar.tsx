import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatTransactionPopup from "./ChatTransaction";
interface Chatnavbarprops {
  userid: string,
  publicKey: string,
}
const truncateString = (str: string) => {
  return str.length > 15 ? str.substring(0, 15) + "..." : str;
}

export default function Chatnavbar({ userid , publicKey}: Chatnavbarprops) {
  const router = useRouter();
  const chat = useAppSelector((state) => state.websocket.chats[userid]);
  let isTyping=false;
  if (chat) {
    isTyping = chat.isTyping;
  }
  const trunuserid=truncateString(userid);

  const [sendTran,setSendTran]=useState(false);

  const showSendTransaction = () => {
    setSendTran(true);
  }

  const closeTransactionPopup = () => {
    setSendTran(false);
  }

  //isTyping= chat.isTyping;
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => {
              router.push("/chat", {
                scroll: true,
              });
            }}
            className="text-gray-600 focus:outline-none focus:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 pl-2">{trunuserid}</h1>
          <div>
      {isTyping ? <div className="text-green-500">...Typing</div> : null}
    </div>
          <div className="flex items-center">
          <button className="text-gray-600 focus:outline-none focus:text-gray-900 mr-2 pr-2" onClick={showSendTransaction}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>

            <button className="text-gray-600 focus:outline-none focus:text-gray-900 mr-2 pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </button>
            <button className="text-gray-600 focus:outline-none focus:text-gray-900 pl-2 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {sendTran && <ChatTransactionPopup publicKey={publicKey} closeTransactionPopup={closeTransactionPopup}/>}
    </div>
  );
}
