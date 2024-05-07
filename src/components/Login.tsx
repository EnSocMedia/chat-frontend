/* eslint-disable react/no-unescaped-entities */
import { sha256 } from "@noble/hashes/sha256";
import {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
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
    console.log("Updating");
    setMnemonic((prev) => {
      return {
        ...prev,
        [index]: mnemonicString,
      };
    });
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
      console.log("Meno", mnemonicPhrase);
      const verifyMenmonic = await verify(mnemonicPhrase);
      setIsValid(verifyMenmonic);
    };

    validateMnemonic();
  }, [mnemonic]);

  async function loginHandler() {
    console.log("Mnbemonic is", Object.values(mnemonic));
    const privateKeyBuffer = sha256(Object.values(mnemonic).join(" "));
    await onLogin(privateKeyBuffer);
  }

  return (
    <div className="flex items-center flex-col gap-7 text-white outline p-5">
      <h1 className="font-bold text-[24px]">
        Login Using your Mnemonic Phrase
      </h1>
      <div className="flex gap-2 flex-col">
        <RenderMnemonicInputBoxes
          selectedMnemonics={mnemonic}
          setMnemonic={setMnemonic}
          words={12}
        />
        <div className="flex justify-center ">
          <button
            onClick={loginHandler}
            type="button"
            className="text-white disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
      </div>
      <DashRow />
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
  selectedMnemonics,
}: {
  words: number;
  setMnemonic: any;
  selectedMnemonics: any;
}) {
  // function onPasteEventHandler(e: ClipboardEvent<HTMLInputElement>) {
  //   const pastedWords = e.clipboardData.getData("text/plain");
  //   const mnemonicWords = pastedWords.split(" ");
  //   setMnemonic({
  //     1: mnemonicWords[0],
  //     2: mnemonicWords[1],
  //     3: mnemonicWords[2],
  //     4: mnemonicWords[3],
  //     5: mnemonicWords[4],
  //     6: mnemonicWords[5],
  //     7: mnemonicWords[6],
  //     8: mnemonicWords[7],
  //     9: mnemonicWords[8],
  //     10: mnemonicWords[9],
  //     11: mnemonicWords[10],
  //     12: mnemonicWords[11],
  //   });
  // }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>, n: number) {
    const mnemonic = e.target.value;
    const mnemonicArray = mnemonic.split(" ");
    if (mnemonicArray.length === 12) {
      for (let i = 0; i < mnemonicArray.length; i++) {
        setMnemonic((prev: any) => {
          return {
            ...prev,
            [i + 1]: mnemonicArray[i],
          };
        });
      }
    } else {
      setMnemonic((prev: any) => {
        return {
          ...prev,
          [n]: mnemonic,
        };
      });
    }
  }

  console.log(selectedMnemonics);
  const indexTrack = 0;
  return (
    <div className="grid grid-col-3 gap-2">
      <div className="flex gap-2">
        <input
          value={selectedMnemonics[1]}
          onChange={(e) => onChangeHandler(e, 1)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[2]}
          onChange={(e) => onChangeHandler(e, 2)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[3]}
          onChange={(e) => onChangeHandler(e, 3)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          value={selectedMnemonics[4]}
          onChange={(e) => onChangeHandler(e, 4)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[5]}
          onChange={(e) => onChangeHandler(e, 5)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[6]}
          onChange={(e) => onChangeHandler(e, 6)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          value={selectedMnemonics[7]}
          onChange={(e) => onChangeHandler(e, 7)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[8]}
          onChange={(e) => onChangeHandler(e, 8)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[9]}
          onChange={(e) => onChangeHandler(e, 9)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <input
          value={selectedMnemonics[10]}
          onChange={(e) => onChangeHandler(e, 10)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[11]}
          onChange={(e) => onChangeHandler(e, 11)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
        <input
          value={selectedMnemonics[12]}
          onChange={(e) => onChangeHandler(e, 12)}
          className="p-2 outline-none bg-[#7b92b7] rounded-lg"
        />
      </div>
    </div>
  );
}
