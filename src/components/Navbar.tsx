import { useState } from "react";
import Image from "next/image";
import logo from "./img/logo.png";
import ProfileModal from "./profileModal";
import ChatIcon from "./Icons/ChatIcon";
import WalletIcon from "./Icons/WalletIcon";
import ProfileIcon from "./Icons/ProfileIcon";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { logOut } = useAuth();
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <nav
        className="bg-white dark:bg-gray-900 flex f border-gray-200 dark:border-gray-600"
        style={{ backgroundColor: "#202020" }}
      >
        {/* <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} className="h-8 w-9" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EnSocMedia
          </span>
        </a> */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"></div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  href="/chat"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white"
                  aria-current="page"
                >
                  <ChatIcon />
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <WalletIcon />
                </Link>
              </li>
              <li>
                <button
                  onClick={openProfileModal}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <ProfileIcon />
                </button>
              </li>

              <li>
                <button
                  onClick={logOut}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isProfileModalOpen && (
        <ProfileModal name="" onClose={closeProfileModal} />
      )}
    </>
  );
}
