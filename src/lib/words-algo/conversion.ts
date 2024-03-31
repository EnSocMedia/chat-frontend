import { Ewert } from "next/font/google";

function decToBin(dec: number, len = 8) {
  let r;
  let binary = "";
  while (dec > 0) {
    r = dec % 2;
    binary = binary + String(r);
    dec = Math.floor(dec / 2);
  }

  if (binary.length !== len) {
    let n = binary.length;

    for (let i = 0; i < len - n; i++) {
      binary = binary + "0";
    }
  }

  return binary.split("").reverse().join("");
}

function bin2hex(b: any) {
  return b.match(/.{4}/g).reduce(function (acc: any, i: any) {
    return acc + parseInt(i, 2).toString(16);
  }, "");
}

function hex2bin(h: string) {
  return h.split("").reduce(function (acc, i) {
    return acc + ("000" + parseInt(i, 16).toString(2)).substr(-4, 4);
  }, "");
}

function byteToBit(byte: []) {
  let bit = "";

  for (let i = 0; i < byte.length; i++) {
    bit = bit + decToBin(byte[i]);
  }

  return bit;
}

function arbuf2hex(buffer: ArrayBuffer) {
  var hexCodes = [];
  var view = new DataView(buffer);

  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i);
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16);
    // We use concatenation and slice for padding
    var padding = "00000000";
    var paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}

async function sha256(hexstr: string) {
  // We transform the string into an arraybuffer.
  if (!hexstr.match(/[\da-f]{2}/gi)) throw new Error("Provider")
    var buffer = new Uint8Array(
      hexstr.match(/[\da-f]{2}/gi)!.map(function (h) {
        return parseInt(h, 16);
      })
    );
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return arbuf2hex(hash);
}

const _decToBin = decToBin;
export { _decToBin as decToBin };
const _bin2hex = bin2hex;
export { _bin2hex as bin2hex };
const _hex2bin = hex2bin;
export { _hex2bin as hex2bin };
const _byteToBit = byteToBit;
export { _byteToBit as byteToBit };
const _sha256 = sha256;
export { _sha256 as sha256 };
