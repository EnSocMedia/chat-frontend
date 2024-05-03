"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
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
      <div className="grid grid-cols-4 gap-2 h-[91vh] ">
        <div className="bg-[#020212] col-span-1">
          <div className="overflow-y-auto overflow-x-hidden h-[75vh] border-b border-gray-40 ">
            <UserSearch />
            <div className="bg-[#020212] py-4 px-6 border-b border-gray-400">
              <h2 className="text-lg font-semibold">Users </h2>
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
                        <div className="flex items-center user-item cursor-pointer">
                          <div>
                            <h3 className="text-white-800 font-semibold flex flex-col">
                              <span className="break-all">{chat.name}</span>
                            </h3>
                            {isTyping ? (
                              <p className="text-green-500">...Typing</p>
                            ) : (
                              <p className="text-white-600 text-sm">
                                {chat.last_message}
                              </p>
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
          <div className="pt-2">
            <Profile name="Athul" publicKey={publicKey!} />
          </div>
        </div>

        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
}
