import { decToBin,bin2hex } from "./conversion"
import words from "./words"
import pbkdf2 from "pbkdf2"

function getMnemonic(entropy:string) {

    const mnemonic = []
  
    const wordBit = new Array()
  
    let i = 0;
  
    while (i < entropy.length) {
  
      wordBit.push(entropy.slice(i, i + 11))
  
      i = i + 11;
  
    }
  
  
    for (let i = 0; i < words.length; i++) {
  
      const bin = decToBin(i, 11);
  
  
      for (let j = 0; j < wordBit.length; j++) {
  
  
        if (wordBit[j] === bin) {
  
          mnemonic[j] = words[i]
        }
  
      }
  
  
  
    }
  
    return mnemonic
  
  
  }


  async function mnemonicToSeed(mnemonic:string[],pass="") {

    const mnemonicString = mnemonic.join(' ');
    console.log(mnemonicString)
    const data = pbkdf2.pbkdf2Sync(mnemonicString, "mnemonic"+pass, 2048, 64, 'sha512')
    console.log(data)
    return data.toString('hex');
  
  
  }
  
export default mnemonicToSeed
export {getMnemonic}

 