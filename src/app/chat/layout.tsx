"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Profile1 from "@/components/Profile1";
import UserSearch from "@/components/UserSearch";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMessagesOnBootstrap } from "@/store/message/actions";
import { websocketConnect } from "@/store/socket";
import Image from "next/image";
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
      <div className="grid grid-cols-4 relative">
        <div className="bg-[#202020] col-span-1 h-[100vh] flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-center text-[20px] pt-4">Chats</h1>
            <div className="overflow-y-auto overflow-x-hidden ">
              <UserSearch />
              <ul>
                {Object.entries(chats).map(([publicKey, chat]) => {
                  let isTyping = false;
                  if (chat) {
                    isTyping = chat.isTyping;
                  }
                  return (
                    <div
                      key={publicKey}
                      className="border-b-[0.1px] border-gray-500/20"
                    >
                      <div className="rounded-none  p-y-2">
                        <li
                          className="py-4  hover:bg-[#313131]/20 "
                          onClick={() => {
                            router.push(`/chat/${publicKey}`);
                          }}
                        >
                          <div className="flex items-center user-item cursor-pointer ">
                            {/* User Icon */}
                            <Image
                             className="rounded-full"
                              src={`https://i.pravatar.cc/150?u=${chat.name}`}
                              width={50}
                              height={50}
                              alt="avatar"
                            />

                            {/* Chat Information */}
                            <div className="pl-3">
                              <h2 className="text-white-800 font-bold text-lg">
                                <span className="break-all">{chat.name}</span>
                              </h2>
                              {isTyping ? (
                                <p className="text-green-500 mt-1">...Typing</p>
                              ) : (
                                <p className="text-white-600 text-sm mt-1">
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
          </div>
          {/* <div className="pt-2">
            {/* <Profile name="Athul" publicKey={publicKey!} /> */}
          {/* </div> */}
          <div className="">
            <Navbar />
          </div>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
}
