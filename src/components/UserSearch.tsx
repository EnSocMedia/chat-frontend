"use client";
import { useUserSearch } from "@/hooks/useUserSearch";
import SearchIcon from "./Icons/SearchIcon";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSearch() {
  const [textToSearch, setTextToSearch] = useState("");
  const { users } = useUserSearch(textToSearch);
  const router = useRouter();
  const onClick = (publicKey: string) => {
    setTextToSearch('')
    router.push(`/chat/${publicKey}`);
  };

  function searchInputHandler(e: ChangeEvent<HTMLInputElement>) {
    setTextToSearch(e.target.value);
  }

  return (
    <div>
      <div className="flex ">
        <div className="w-full">
          <input
          value={textToSearch}
            type="text"
            className="text-black placeholder:text-black "
            onChange={searchInputHandler}
          />
        </div>

        <button className="p-2 rounded-md bg-blue-800 text-white hover:bg-blue-600 focus:outline-none">
          <SearchIcon />
        </button>
      </div>
      <div className="flex flex-col gap-2 ">
        {users.map((user, index) => {
          return (
            <button
              onClick={() => {
                onClick(user.publicKey);
              }}
              key={index}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
