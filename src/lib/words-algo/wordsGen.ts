import entropyGenerator from "./entropy";
import { getMnemonic } from "./mnemonic";
import checksum from "./checksum";

async function generateMnemonicWords() {
  //Random generated Bit
  const randomBit = entropyGenerator();

  //Checksum of the Hash
  const checksumBit = await checksum(randomBit);

  //Random entropy bit including checksum
  const randomEntropy = randomBit + checksumBit;

  //Mnemonic words
  const mnemonics = getMnemonic(randomEntropy);

  return mnemonics;
}

export default generateMnemonicWords;
