import { concatBytes } from "@noble/ciphers/utils";

import { ephemeralKeySize, isEphemeralKeyCompressed } from "./config";
import { PrivateKey, PublicKey } from "./keys";
import {
  decodeHex,
  getValidSecret,
  remove0x,
  symDecrypt,
  symEncrypt,
} from "./utils";

export function encrypt(
  receiverRawPK: string | Uint8Array,
  msg: Uint8Array,
  secret?:Uint8Array
): Buffer {
  //Generate a random private Key
  const ephemeralKey = new PrivateKey();

  //Receiver Public Key
  const receiverPK =
    receiverRawPK instanceof Uint8Array
      ? new PublicKey(receiverRawPK)
      : PublicKey.fromHex(receiverRawPK);

      
  const symKey = ephemeralKey.encapsulate(receiverPK);
  const encrypted = symEncrypt(symKey, msg);

  let pk: Uint8Array;
  if (isEphemeralKeyCompressed()) {
    pk = ephemeralKey.publicKey.compressed;
  } else {
    pk = ephemeralKey.publicKey.uncompressed;
  }
  return Buffer.from(concatBytes(pk, encrypted));
}

export function decrypt(
  receiverRawSK: string | Uint8Array,
  msg: Uint8Array
): Buffer {
  const receiverSK =
    receiverRawSK instanceof Uint8Array
      ? new PrivateKey(receiverRawSK)
      : PrivateKey.fromHex(receiverRawSK);

  const keySize = ephemeralKeySize();
  const senderPK = new PublicKey(msg.subarray(0, keySize));
  const encrypted = msg.subarray(keySize);
  const symKey = senderPK.decapsulate(receiverSK);
  return Buffer.from(symDecrypt(symKey, encrypted));
}

export { ECIES_CONFIG } from "./config";
export { PrivateKey, PublicKey } from "./keys";

export const utils = {
  symEncrypt,
  symDecrypt,
  decodeHex,
  getValidSecret,
  remove0x,
};
