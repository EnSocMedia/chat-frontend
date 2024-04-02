"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { randomBytes, createHash } from "crypto";
import secp256k1 from "secp256k1";
import { useAppDispatch } from "@/store/hooks";
import { websocketConnect, websocketSendMessage } from "@/store/socket";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getMessagesOnBootstrap } from "@/store/message/actions";
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [privateKey, setPrivateKey] = useState(Buffer.from([]));
  const [showAuth, setShowAuth] = useState(false);
  const { isLogging, isRegistering, onUserLogin, onUserRegister } = useAuth();
  const [page,setPage] =useState("Signin");
  function setsignup()
  {
    setPage("Signup");
  }
  function setsignin()
  {
    setPage("Signin");
  }


  return (
    <main className="flex items-center justify-center min-h-screen">
      {/* <button onClick={onLogin}>Login</button> */}
      {page ==="Signin" && <Login onLogin={onUserLogin} setsignup={setsignup} />}
      {page === "Signup" && <SignUp onRegister={onUserRegister} setsignin={setsignin} />}
    </main>
  );
}
