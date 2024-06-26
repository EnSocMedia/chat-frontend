import { secp256k1 } from "@noble/curves/secp256k1";
import { bytesToHex, createPublicClient, formatEther, http } from "viem";
import { privateKeyToAddress, publicKeyToAddress } from "viem/accounts";
import { sepolia } from "viem/chains";

export const balanceviem = async () =>{
    const token = localStorage.getItem("token");
    const privateKey=localStorage.getItem("privateKey");
    const publicKey=localStorage.getItem("publicKey");

    const address1=publicKeyToAddress(publicKey as '0x{string}');
    const address=privateKeyToAddress(privateKey as '0x{string}');

    const pubkey= bytesToHex(
      secp256k1.getPublicKey(privateKey!.slice(2), false),
    );
    console.log("Using viem");
    console.log(pubkey);
    console.log(publicKeyToAddress(pubkey));
    // console.log("private Key");
    // console.log(address);
    console.log("Public Key");
    console.log(publicKey);
    console.log(address1);
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(),
      });
      const balance = await publicClient.getBalance({ 
        address: address,
      })
    const bal=formatEther(balance);
    return bal;
}