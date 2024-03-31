import generateMnemonicWords from "@/lib/words-algo/wordsGen";
import { useEffect, useState } from "react";

export default function useGenerateMnemonic() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  useEffect(() => {
    generateMnemonicWords().then((words) => {
      setMnemonic(words);
    });
  }, []);

  return {
    mnemonic,
    isGenerating,
  };
}
