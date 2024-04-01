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
    <div>
      {children}
    </div>
  );
}
