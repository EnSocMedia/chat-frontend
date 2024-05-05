/* eslint-disable react/no-unescaped-entities */
import { sha256 } from "@noble/hashes/sha256";
import { ClipboardEvent, useEffect, useState } from "react";
import Image from "next/image";
import login from "./img/Login.png";
import verify from "@/lib/words-algo/verifymnemonic/verify";
import DashRow from "./Dashrow";

interface LoginProps {
  onLogin: (privateKey: Uint8Array) => Promise<void>;
  setsignup: any;
}

export default function Login({ onLogin, setsignup }: LoginProps) {
  const [isValid, setIsValid] = useState(true);
  const [mnemonic, setMnemonic] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
  });

  async function setMnemonicHandler(index: number, mnemonicString: string) {
    console.log(mnemonicString);
    setMnemonic({
      ...mnemonic,
      [index]: mnemonicString,
    });
    console.log(Object.values(mnemonic));
  }

  useEffect(() => {
    const validateMnemonic = async () => {
      const isFilledAllInputField = Object.values(mnemonic).find(
        (pharse) => pharse.length === 0
      );

      if (isFilledAllInputField) {
        setIsValid(false);
        return;
      }

      const mnemonicPhrase = Object.values(mnemonic);
      console.log(mnemonicPhrase);
      const verifyMenmonic = await verify(mnemonicPhrase);
      setIsValid(verifyMenmonic);
    };

    validateMnemonic();
  }, [mnemonic]);

  async function loginHandler() {
    console.log("Mnbemonic is", mnemonic);
    const privateKeyBuffer = sha256(Object.values(mnemonic).join(" "));
    //isValidMnemonicPhrase();
    await onLogin(privateKeyBuffer);
  }

  return (
    <div className="flex items-center flex-col gap-7 text-white outline p-5">
      <h1 className="font-bold text-[24px]">
        Login Using your Mnemonic Phrase
      </h1>
      <div className="flex gap-2 flex-col">
        <RenderMnemonicInputBoxes setMnemonic={setMnemonicHandler} words={12} />
        <div className="flex justify-center ">
          <button
            disabled={!isValid}
            onClick={loginHandler}
            type="button"
            className="text-white disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
      </div>
      <DashRow/>
      <div className="flex flex-col gap-2">
        <div> Generate New Account </div>
        <button
          onClick={setsignup}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

function RenderMnemonicInputBoxes({
  words,
  setMnemonic,
}: {
  words: number;
  setMnemonic: any;
}) {
  function onPasteEventHandler(e: ClipboardEvent<HTMLInputElement>) {
    const pastedWords = e.clipboardData.getData('text/plain');
    const mnemonicWords = pastedWords.split(" ");
    //console.log("pasted words");
    //console.log(pastedWords);
    // console.log("Mnemonic Words");
    // console.log(mnemonicWords);
    // for (let i=0;i<mnemonicWords.length;i++)
    //   {
    //     console.log(i);
    //     console.log(mnemonicWords[i]);
    //     setMnemonic(i+1,mnemonicWords[i])
    //     console.log("called setMnemonic");
    //   }
  }
  const indexTrack = 0;
  return (
    <div className="grid grid-col-3 gap-2">
      <div className="flex gap-2">
        <input 
          onChange={(e) => {
            setMnemonic(1, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
          onPasteCapture={onPasteEventHandler}
        />
        <input
          onChange={(e) => {
            setMnemonic(2, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          onChange={(e) => {
            setMnemonic(3, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          onChange={(e) => {
            setMnemonic(4, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
          onPasteCapture={onPasteEventHandler}
        />
        <input
          onChange={(e) => {
            setMnemonic(5, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          onChange={(e) => {
            setMnemonic(6, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          onChange={(e) => {
            setMnemonic(7, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
          onPasteCapture={onPasteEventHandler}
        />
        <input
          onChange={(e) => {
            setMnemonic(8, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          onChange={(e) => {
            setMnemonic(9, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          onChange={(e) => {
            setMnemonic(10, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
          onPasteCapture={onPasteEventHandler}
        />
        <input
          onChange={(e) => {
            setMnemonic(11, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          onChange={(e) => {
            setMnemonic(12, e.target.value);
          }}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
    </div>
  );
}