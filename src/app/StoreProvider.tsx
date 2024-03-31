"use client";
import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { makeStore, AppStore } from "@/store/store";
import { getPastMessagesUsingLastTimestamp } from "@/store/message/actions";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
