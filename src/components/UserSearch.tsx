"use client";
import { useUserSearch } from "@/hooks/useUserSearch";
import SearchIcon from "./Icons/SearchIcon";
import { ChangeEvent, useRef, useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createStateForNewUser } from "@/store/socket";
import { text } from "stream/consumers";


export default function UserSearch() {

  const dispatch = useAppDispatch()
  const [textToSearch, setTextToSearch] = useState("");
  const [finalTextToSearch,setFinalTextToSearch]=useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { users } = useUserSearch(finalTextToSearch);
  const router = useRouter();
  const onClick = (publicKey: string,name:string) => {
    setTextToSearch("");
    setFinalTextToSearch("");
      dispatch(createStateForNewUser({publicKey,name}));
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
  };

  return (
    <div>
      <div className="flex ">
      <div className='flex-col px-0.5'>
      <div className="bg-[#020212] py-4 px-6 border-gray-400">
            <h2 className="text-lg font-semibold">Search Users </h2>
            <div className="w-full pt-2">  
            <div className="relative">
              
  <input
    value={textToSearch}
    type="text"
    className="text-black pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
    onChange={searchInputHandler}
    placeholder="Search..."
  />
  <svg
  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeWidth="2"  strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 21l-4.685-4.686M15.47 9.882A5.999 5.999 0 1 1 9.883 15.47 5.999 5.999 0 0 1 15.47 9.882zM5 11a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
  ></path>
</svg>
</div>
  </div>
          </div>
  
</div>

        {/* <button className="p-2 rounded-md bg-blue-800 text-white hover:bg-blue-600 focus:outline-none">
          <SearchIcon />
        </button> */}
      </div>
      <div className="w-full">
      <div className="bg-[#153448] flex flex-col gap-2 ">
      {users.map((user, index) => (
            <div key={user.publicKey} onClick={() => onClick(user.publicKey,user.name)}>
              <div className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600 relative">
                <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                <a className="text-left focus:outline-none pl-2">{user.name}</a>
              </div>
            </div>
          ))}
      </div>
      <div className="py-2">
      <div className="bg-white h-0.5 w-full"></div>
      </div>
    </div>
    </div>
  );
}
