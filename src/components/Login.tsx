import { sha256 } from "@noble/hashes/sha256";
import { useState } from "react";

interface LoginProps {
  onLogin: (privateKey: Uint8Array) => Promise<void>;
  setsignup: any;
}

export default function Login({ onLogin, setsignup }: LoginProps) {
  const [mnemonic, setMnemonic] = useState("");

  async function loginHandler() {
    console.log("Mnbemonic is", mnemonic);
    const privateKeyBuffer = sha256(mnemonic);
    await onLogin(privateKeyBuffer);
  }

  return (
    <div className="flex items-center flex-col gap-7">
      <div className="text-3xl"> Log in to EnSocMedia</div>
      <div className=" flex items-center flex-col border-solid border-4 rounded-lg border-white py-5 px-8">
        <div className="text-xl text-white text-center">
          Welcome back! Sign in using your mnemonic words
        </div>
        <div className="flex pt-5 pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-11 h-11"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              clip-rule="evenodd"
            />
          </svg>

          <div className="flex-1 pl-3 w-[400px]">
            <textarea
              onChange={(e) => {
                setMnemonic(e.target.value);
              }}
              className="w-[350px] text-black"
              placeholder="Enter the Mnemonic words"
            ></textarea>
          </div>
        </div>
        <button
          onClick={loginHandler}
          className="bg-emerald-500 p-4 rounded-md pt"
        >
          Login
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex-1 border-t-2 border-white"></div>
        <span className="px-3 text-white">or</span>
        <div className="flex-1 border-t-2 border-white"></div>
      </div>
      <button onClick={setsignup} className="bg-emerald-500 p-4 rounded-md pt">
        Dont Have a wallet
      </button>
    </div>
  );
}
