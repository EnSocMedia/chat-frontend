import useGenerateMnemonic from "@/hooks/useGenerateMnemonic";
import { sha256 } from "@/lib/words-algo/conversion";
import generateMnemonicWords from "@/lib/words-algo/wordsGen";
import { useRef, useState } from "react";

interface SignUpProps {
  onRegister: (privateKey: Buffer,name:string) => Promise<void>;
}

export default function SignUp({ onRegister }: SignUpProps) {
  const { isGenerating, mnemonic } = useGenerateMnemonic();

  const [userName, setUserName] = useState("");
  async function registerHandler() {
    const privateKey = await sha256(mnemonic.join(" "));
    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    await onRegister(privateKeyBuffer,userName);
  }

  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-[24px]">You Mnemonic Seed phrase</div>
      <div className="grid grid-cols-3 items-center gap-10">
        {mnemonic.map((word, index) => {
          return <div key={index}>{word}</div>;
        })}
      </div>

      <div>Please Enter tour User Name</div>
      <input
      className="text-black"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />

      <div className="flex justify-center">
        <button
          disabled={!userName}
          onClick={registerHandler}
          className="text-center p-4 rounded-md bg-emerald-500"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
