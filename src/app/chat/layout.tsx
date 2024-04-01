"use client";
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

  return (
    <div className="grid grid-cols-4 gap-2 h-[100vh] ">
      <div className="col-span-1 flex flex-col justify-between px-4 pt-4">
        <div className="flex flex-col gap-2">
          {Object.entries(chats).map((chat, index) => {
            return (
              <div
              className="px-4"
                key={index}
                onClick={() => {
                  router.push(`/chat/${chat[0]}`);
                }}
              >
                {chat[0]}
                <div>Message: {chat[1].last_message}</div>
              </div>
            );
          })}
        </div>
        {publicKey && <Profile name="Athul" publicKey={publicKey} />}
      </div>

      <div className="col-span-3">{children}</div>
    </div>
  );
}
