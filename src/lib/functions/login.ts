import { createHash } from "crypto";
import secp256k1 from "secp256k1";
import { fromHexString, toHexString } from "./utils";

export const onLogin = async (privateKey:Buffer) => {
    const msg = "Hello";
    let hash = createHash("sha256").update(msg).digest("hex");

    // get the public key in a compressed format
    const pubKey = secp256k1.publicKeyCreate(privateKey);

    console.log("PRIVATE KEY ON LOGIN", privateKey);
    console.log("PUBLIC KEY ON LOGIN", pubKey);
    // sign the message
    const sigObj = secp256k1.ecdsaSign(fromHexString(hash), privateKey);
    console.log(sigObj);

    let sendObj = {
      pub_key: toHexString(pubKey),
      signature: toHexString(sigObj.signature),
      message: msg,
    };

    const req = await fetch("http://localhost:3011/login", {
      method: "POST",
      body: JSON.stringify(sendObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

