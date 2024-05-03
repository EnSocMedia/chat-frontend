import { useEffect, useState } from "react";
import { onRegister } from "@/lib/functions/register";
import { onLogin } from "@/lib/functions/login";
import { useRouter } from "next/navigation";
import { toHexString } from "@/lib/functions/utils";
import { toHex } from "viem";
import { publicKeyToAddress } from "viem/utils";
import { privateKeyToAccount, privateKeyToAddress } from "viem/accounts";

export const useAuth = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const onUserRegister = async (privateKey: Uint8Array, name: string) => {
    try {
      setIsRegistering(true);
      const { publicKey, token } = await onRegister(privateKey, name);
      const address = publicKeyToAddress(publicKey);
      localStorage.setItem("address", address);
      localStorage.setItem("token", token);
      localStorage.setItem("publicKey", publicKey);
      localStorage.setItem("privatekey", toHexString(privateKey));
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
      const address = publicKeyToAddress(publicKey);
      localStorage.setItem("address", address);
      localStorage.setItem("token", token);
      localStorage.setItem("publicKey", publicKey);
      localStorage.setItem("privateKey", toHex(privateKey));
      console.log("Private key");
      console.log(toHex(privateKey));
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
