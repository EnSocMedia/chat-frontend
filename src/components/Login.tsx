import { sha256 } from "@/lib/words-algo/conversion";
import { useState } from "react";

interface LoginProps {
  onLogin: (privateKey: Buffer) => Promise<void>;
}

export default function Login({ onLogin }: LoginProps) {
  const [mnemonic, setMnemonic] = useState("");

async function loginHandler() {
    const privateKey = await sha256(mnemonic)
    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    await onLogin(privateKeyBuffer)
  }

  return (
    <div className="flex items-center flex-col gap-4">
      <div className="text-[24px]">Enter Your Mnemonic Phrase With Space</div>
      <textarea
        onChange={(e) => {
          setMnemonic(e.target.value);
        }}
        className="w-[250px] h-[150px] text-black"
      />

      <button onClick={loginHandler} className="bg-emerald-500  p-4 rounded-md">
        Login
      </button>
    </div>
  );
}
