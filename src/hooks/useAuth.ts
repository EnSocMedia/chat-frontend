import { useEffect, useState } from "react";
import { onRegister } from "@/lib/functions/register";
import { onLogin } from "@/lib/functions/login";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const onUserRegister = async (privateKey: Uint8Array, name: string) => {
    try {
      setIsRegistering(true);

      const { publicKey, token } = await onRegister(privateKey, name);
      localStorage.setItem("token", token);
      localStorage.setItem("publicKey", publicKey);
      router.push("/chat");
      setIsRegistering(false);
    } catch (e) {
      console.log("REGISTERED", e);
      setIsRegistering(false);
    }
  };

  const onUserLogin = async (privateKey: Uint8Array) => {
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
