import { createHash } from "crypto";
import secp256k1 from "secp256k1";
import { fromHexString, toHexString } from "./utils";
import { toHex } from "viem";

export const onLogin = async (privateKey: Uint8Array) => {
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
  };

  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
    method: "POST",
    body: JSON.stringify(sendObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(req.status);

  const res = (await req.json()) as { token: string };

  if (req.status !== 200) {
    throw new Error("Failed to Login");
  }
  return {
    publicKey: toHexString(pubKey),
    token: res.token,
  };
};
