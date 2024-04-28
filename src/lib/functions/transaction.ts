import { useEffect, useState } from "react";
import { createWalletClient, getAddress, http, parseEther } from "viem";
import { privateKeyToAccount, publicKeyToAddress } from "viem/accounts";
import { mainnet } from 'viem/chains';

export const onSendingViem = async (publicKey: string, amount: string) => {
    const client = createWalletClient({
        chain: mainnet,
        transport: http()
    })
    
    const privateKey = localStorage.getItem("privateKey");
    console.log("got privatekey");
    console.log(privateKey);
    if (privateKey !== null) {
        const account = privateKeyToAccount(privateKey as '0x${string}');
        const hash = await client.sendTransaction({
            account,
            to: publicKey as '0x${string}',
            value: parseEther(amount)
        });
    return {
        hash: hash as any,
    };
}
return {
    hash: "Error" as any
}
};