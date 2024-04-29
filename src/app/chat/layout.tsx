"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMessagesOnBootstrap } from "@/store/message/actions";
import { websocketConnect } from "@/store/socket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.websocket.chats);
  const [textToSearch, setTextToSearch] = useState("");


  const searchbutton = () => {
    //setIsVisible(!isVisible);
    router.push(`/chat/${textToSearch}`);
  };
  useEffect(() => {
    dispatch(websocketConnect());
    dispatch(getMessagesOnBootstrap());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    const publicKey = localStorage.getItem("publicKey");
    setPublicKey(publicKey);
  }, []);

  useEffect(() => {
    dispatch(websocketConnect());
    dispatch(getMessagesOnBootstrap());
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-2 h-[91vh] ">
        <div className="bg-[#020212] col-span-1">
            <div className="">
              <div className="flex items-center px-4 py-4 flex-col lg:flex-row gap-3">
                <input
                  onChange={(e) => {
                    setTextToSearch(e.target.value);
                  }}
                  type="text"
                  className="h-10 w-50 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                  placeholder="Type here..."
                />
               <button
          onClick={searchbutton}
          className="p-2 rounded-md bg-blue-800 text-white hover:bg-blue-600 focus:outline-none"
        >
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
        </button>
              </div>
            </div>
          <div className="bg-[#020212] py-4 px-6 border-b border-gray-400">
            <h2 className="text-lg font-semibold">Users </h2>
          </div>
          <div className="p-4 overflow-y-auto overflow-x-hidden h-[60vh] border-b border-gray-40 ">
            <ul>
              {Object.entries(chats).map(([name, chat]) => {
                let isTyping=false;
                if (chat) {
                  isTyping = chat.isTyping;
                }
                return (
                  <div key={name}>
                    <div className="rounded-none border-b-2 border-[#30323E] p-y-2 ">
                      <li
                        className="py-4"
                        onClick={() => {
                          router.push(`/chat/${name}`);
                        }}
                      >
                        <div className="flex items-center user-item cursor-pointer">
                          <div>
                            <h3 className="text-white-800 font-semibold flex flex-col">
                              <span>User</span>
                              <span className="break-all">{name}</span>
                            </h3>
                            {isTyping ? <p className="text-green-500">...Typing</p> :
                            <p className="text-white-600 text-sm">
                              {chat.last_message}
                            </p>}
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="pt-2">
            <Profile name="Athul" publicKey={publicKey!} />
          </div>
        </div>

        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
}
