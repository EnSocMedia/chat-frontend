"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Profile1 from "@/components/Profile1";
import UserSearch from "@/components/UserSearch";
import { useUserSearch } from "@/hooks/useUserSearch";
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
  //const [textToSearch, setTextToSearch] = useState("");

  //const { users } = useUserSearch(textToSearch);

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
      <div className="grid grid-cols-4">
        <div className="bg-[#020212] col-span-1">
          <Profile1 name="" />
          <div className="overflow-y-auto overflow-x-hidden h-[85vh] border-b border-gray-40 ">
            <UserSearch />
            <div className="bg-[#020212]/20 py-4 px-6 border-b border-gray-400">
              <h2 className="text-lg font-semibold">Chats </h2>
            </div>

            <ul>
              {Object.entries(chats).map(([publicKey, chat]) => {
                let isTyping = false;
                if (chat) {
                  isTyping = chat.isTyping;
                }
                return (
                  <div key={publicKey}>
                    <div className="rounded-none border-b-2 border-[#30323E] p-y-2 ">
                      <li
                        className="py-4"
                        onClick={() => {
                          router.push(`/chat/${publicKey}`);
                        }}
                      >
                        <div className="flex items-center user-item cursor-pointer hover:bg-gray-100 hover:text-blue-600">
                          {/* User Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>

                          {/* Chat Information */}
                          <div className="pl-3">
                            <h2 className="text-white-800 font-bold text-lg">
                              <span className="break-all">{chat.name}</span>
                            </h2>
                            {isTyping ? (
                              <p className="text-green-500 mt-1">...Typing</p>
                            ) : (
                              <p className="text-white-600 text-sm mt-1">{chat.last_message}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          {/* <div className="pt-2">
            {/* <Profile name="Athul" publicKey={publicKey!} /> */}
          {/* </div> */}
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
}
