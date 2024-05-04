// /*
// 1. Encrypt the message with reciever public key
// 2. Encrypt that encrypted form with sender private key
// */

// import { PrivateKey, encrypt } from "../ecies";

// export function encryptDoubleLayer(senderSk: string, encryptedMessage: Buffer) {
//   const senderKey = PrivateKey.fromHex(senderSk);
//   const ephemeralKey = new PrivateKey();

//   const symKey = ephemeralKey.encapsulate(senderKey);

// }

// /*
// 1. Decrypt the message with sender public key
// 2. Derypt that encrypted form with receiver private key
// */

// export function decryptDoubleLayer(
//   receiverSk: string,
//   senderPk: string,
//   msg: Uint8Array
// ) {}
