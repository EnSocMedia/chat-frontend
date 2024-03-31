import {bin2hex,sha256,hex2bin} from "./conversion"

async function checksum(randomBit:string) {

    //Convert Binary to Hex

    const hexOfRandomBit = bin2hex(randomBit)
  
  
    //Get the sha256 hash of the randomEntropy
    const hashOfHex = await sha256(hexOfRandomBit);
    console.log("HexOF random",hexOfRandomBit)
    const checksumBit = hex2bin(hashOfHex).slice(0, 4);
  
    return checksumBit;
  
  }
  
export default checksum