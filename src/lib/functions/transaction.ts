import { Hash } from "@noble/hashes/utils";
import { useEffect, useState } from "react";
import {
  SendRawTransactionParameters,
  createWalletClient,
  getAddress,
  http,
  parseEther,
} from "viem";
import { privateKeyToAccount, publicKeyToAddress } from "viem/accounts";
import { mainnet, sepolia } from "viem/chains";

export const onSendingViem = async (address: string, amount: string) => {
  const client = createWalletClient({
    chain: sepolia,
    transport: http(),
  });

  console.log("Inside viem");

  const privateKey = localStorage.getItem("privatekey");
  if (privateKey !== null) {
    const account = privateKeyToAccount(privateKey as "0x${string}");
    const request = await client.prepareTransactionRequest({
      account,
      to: address as "0x${string}",
      value: parseEther(amount),
    });
    console.log(request);
    const serializedTransaction = await client.signTransaction(request);
    const hash = await client.sendRawTransaction({ serializedTransaction });

    console.log("FInished transaction");

    return {
      hash: hash as "0x{string}",
    };
  }
  return {
    hash: "Error" as any,
  };
};
