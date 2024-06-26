import { createHash } from "crypto";
import secp256k1 from "secp256k1";
import { fromHexString, toHexString } from "./utils";
import { toHex } from "viem";

export const onRegister = async (privateKey: Uint8Array,name:string) => {
  const msg = "Hello";
  let hash = createHash("sha256").update(msg).digest("hex");

  // get the public key in a compressed format
  const pubKey = secp256k1.publicKeyCreate(privateKey,false);

  // sign the message
  const sigObj = secp256k1.ecdsaSign(fromHexString(hash), privateKey);

  let sendObj = {
    pub_key: toHexString(pubKey),
    signature: toHexString(sigObj.signature),
    message: msg,
    name: name,
  };

  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signin`, {
    method: "POST",
    body: JSON.stringify(sendObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  return {
    publicKey: toHex(pubKey),
    token: res.token,
  };
};
