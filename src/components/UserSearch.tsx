"use client";
import { useUserSearch } from "@/hooks/useUserSearch";
import SearchIcon from "./Icons/SearchIcon";
import { ChangeEvent, useRef, useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createStateForNewUser } from "@/store/socket";


export default function UserSearch() {

  const dispatch = useAppDispatch()
  const [textToSearch, setTextToSearch] = useState("");
  const [finalTextToSearch,setFinalTextToSearch]=useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { users } = useUserSearch(finalTextToSearch);
  const router = useRouter();
  const onClick = (publicKey: string,name:string) => {
    setTextToSearch('')
      dispatch(createStateForNewUser({publicKey,name}))
    router.push(`/chat/${publicKey}`);
  };

  function searchInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    setTextToSearch(searchText);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setFinalTextToSearch(textToSearch);
    }, 400); 
  };

  return (
    <div>
      <div className="flex ">
      <div className='flex-col px-0.5'>
      <div className="bg-[#020212] py-4 px-6 border-gray-400">
            <h2 className="text-lg font-semibold">Search Users </h2>
            <div className="w-full pt-2">  <input
      value={textToSearch}
      type="text"
      className="text-black placeholder:text-black "
      onChange={searchInputHandler}
    />
  </div>
          </div>
  
</div>

        {/* <button className="p-2 rounded-md bg-blue-800 text-white hover:bg-blue-600 focus:outline-none">
          <SearchIcon />
        </button> */}
      </div>
      <div className="w-full">
      <div className="flex flex-col gap-2 ">
      {users.map((user, index) => (
            <div key={user.publicKey} onClick={() => onClick(user.publicKey,user.name)}>
              <div className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600 relative">
                <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
                <a className="text-left focus:outline-none">{user.name}</a>
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
