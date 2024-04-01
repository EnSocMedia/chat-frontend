import useGenerateMnemonic from "@/hooks/useGenerateMnemonic";
import generateMnemonicWords from "@/lib/words-algo/wordsGen";
import { sha256 } from "@noble/hashes/sha256";
import { useRef, useState } from "react";

interface SignUpProps {
  onRegister: (privateKey: Uint8Array,name:string) => Promise<void>;
  setsignin:any;
}

export default function SignUp({ onRegister,setsignin  }: SignUpProps) {
  const { isGenerating, mnemonic } = useGenerateMnemonic();

  const [userName, setUserName] = useState("");
  async function registerHandler() {
    console.log("Mnemoni on signup",mnemonic.join(" "))
    const privateKeyBuffer =  sha256(mnemonic.join(" "));

    await onRegister(privateKeyBuffer,userName);
  }

  return (
    <div className="flex justify-center flex-col items-center gap-5">
      <div className="flex items-center flex-col border-solid border-4 rounded-lg border-white py-7 px-11">
      <div className="text-[24px] pb-5 font-bold">You Mnemonic Seed phrase</div>
      <div className="grid grid-cols-3 items-center gap-10">
        {mnemonic.map((word, index) => {
          return (
            <div
              className="flex items-center justify-center self-auto outline-offset-4 bg-white font-semibold text-lg font-sans border-rose-300 border-solid border-4 rounded-lg border-white pl-2 pt-2 pb-2 pr-2 text-black"
              key={index}
            >
              {word}
            </div>
          );
        })}
      </div>
      <div className="flex pt-7 pb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-11 h-11"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <div className="pl-3 pt-2">
          <input
            className="text-black"
            placeholder="Enter your name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
      </div>

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
      <div className="flex items-center">
  <div className="flex-1 border-t-2 border-white"></div>
  <span className="px-3 text-white">or</span>
  <div className="flex-1 border-t-2 border-white"></div>
</div>
<button onClick={setsignin} className="bg-emerald-500 p-4 rounded-md">
        Already Have a wallet
      </button>
    </div>
  );
}
