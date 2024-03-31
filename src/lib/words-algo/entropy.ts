import { decToBin } from "./conversion";

function entropyGenerator() {
  const arr = new Uint8Array(16);

  crypto.getRandomValues(arr);

  let randomBit = "";

  for (let i = 0; i < 16; i++) {
    randomBit = randomBit + decToBin(arr[i], 8);
  }

  return randomBit;
}

export default entropyGenerator;
