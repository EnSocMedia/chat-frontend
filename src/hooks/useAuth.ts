import { useEffect, useState } from "react";
import { onRegister } from "@/lib/functions/register";
import { onLogin } from "@/lib/functions/login";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const onUserRegister = async (privateKey: Buffer, name: string) => {
    try {
      setIsRegistering(true);
      console.log("REGSITERING");
      await onRegister(privateKey, name);
      console.log("REGISTERED");
      setIsRegistering(false);
    } catch (e) {
      router.push("/chat");
      console.log("REGISTERED", e);
      setIsRegistering(false);
    }
  };

  const onUserLogin = async (privateKey: Buffer) => {
    try {
      setIsLogging(true);
      const { token, publicKey } = await onLogin(privateKey);
      localStorage.setItem("token", token);
      localStorage.setItem("publicKey", publicKey);
      router.push("/chat");
      setIsLogging(false);
    } catch (e) {
      setIsLogging(false);
    }
  };

  return {
    onUserRegister,
    onUserLogin,
    isRegistering,
    isLogging,
  };
};
