import { useEffect, useState } from "react";
import { createWalletClient, getAddress, http, parseEther } from "viem";
import { privateKeyToAccount, publicKeyToAddress } from "viem/accounts";
import { mainnet } from "viem/chains";
import RLP from "rlp";

export const onsendingRawTransaction = async (
    publicKey: string,
    amount: string
) => {
    const client = createWalletClient({
        chain: mainnet,
        transport: http(),
    });

    const privateKey = localStorage.getItem("privateKey");
    if (privateKey !== null) {
        const account = privateKeyToAccount(privateKey as "0x${string}");
        const pubKey = publicKeyToAddress(publicKey as "0x${string}");
        const request = await client.prepareTransactionRequest({
            account,
            to: pubKey,
            value: parseEther(amount),
        });
        const signature = await client.signTransaction(request);

        const data={
            rawTransaction:JSON.stringify(request),
            signature:signature
        }
        const bodydata=RLP.encode(JSON.stringify(data));

        const req = await fetch("http://localhost:3011/send_transaction", {
            method: "POST",
            body: bodydata,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(req.status);
        if (req.status !== 200) {
            throw new Error("Failed to Login");
        }
        return {
            response: req as any,
        };
    }
    return {
        response: "Error" as any,
    };
};
