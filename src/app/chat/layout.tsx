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
  useEffect(() => {
    dispatch(websocketConnect());
    dispatch(getMessagesOnBootstrap());
  }, []);

  useEffect(() => {
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
        <div className="bg-gray-200 col-span-1 pb-20">
          <div className="bg-gray-300 py-4 px-6 border-b border-gray-400">
            <h2 className="text-lg font-semibold">Users </h2>
          </div>
          <div className="p-4">
            <ul>
              {Object.entries(chats).map(([publicKey, chat]) => {
                return (
                  <div key={publicKey}>
                    <div className="rounded-none border-b-2 border-black p-y-2">
                      <li
                        className="py-4"
                        onClick={() => {
                          router.push(`/chat/${publicKey}`);
                        }}
                      >
                        <div className="flex items-center user-item cursor-pointer">
                          <div>
                            <h3 className="text-gray-800 font-semibold">
                              User {publicKey}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {chat.last_message}
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
            </ul>
            <Profile name="Athul" publicKey={publicKey!} />
          </div>
        </div>

        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
}
