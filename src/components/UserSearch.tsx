"use client";
import { useUserSearch } from "@/hooks/useUserSearch";
import SearchIcon from "./Icons/SearchIcon";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createStateForNewUser } from "@/store/socket";
import { text } from "stream/consumers";

export default function UserSearch() {
  const dispatch = useAppDispatch();
  const [textToSearch, setTextToSearch] = useState("");
  const [finalTextToSearch, setFinalTextToSearch] = useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { users } = useUserSearch(finalTextToSearch);
  const router = useRouter();
  const onClick = (publicKey: string, name: string) => {
    setTextToSearch("");
    setFinalTextToSearch("");
    dispatch(createStateForNewUser({ publicKey, name }));
    router.push(`/chat/${publicKey}`);
  };

  function searchInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    setTextToSearch(searchText);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      //console.log(finalTextToSearch);
      setFinalTextToSearch(searchText);
    }, 400);
  }

  return (
    <div className="pt-2">
      <div className="flex px-2 ">
        <input
          value={textToSearch}
          type="text"
          className="text-white pl-5 py-1 bg-[#313131]/90 w-full rounded-sm placeholder:text-[13px] focus:outline-none focus:border-blue-500"
          onChange={searchInputHandler}
          placeholder="Search Users"
        />
      </div>
      <div className="w-full px-2">
        <div className="bg-[#313131]/20 flex flex-col gap-2 ">
          {users.map((user, index) => (
            <div
              className="cursor-pointer"
              key={user.publicKey}
              onClick={() => onClick(user.publicKey, user.name)}
            >
              <div className="flex items-center p-2 relative hover:bg-[#313131]/20 border-b-[0.1px] border-gray-500/80 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <a className="text-left focus:outline-none pl-2">{user.name}</a>
              </div>
            </div>
          ))}
        </div>
        <div className="py-2">
          <div className="bg-gray-500 h-0.5 w-full"></div>
        </div>
      </div>
    </div>
  );
}
