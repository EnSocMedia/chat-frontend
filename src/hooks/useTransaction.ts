import { onSendingViem } from "@/lib/functions/transaction";
import { onsendingRawTransaction } from "@/lib/functions/rawtransaction";
import { useEffect, useState } from "react";
import { toHexString } from "@/lib/functions/utils";

export const useTransaction = () =>{
    const [isSending,setIsSending] = useState(false);
    const onSendViem = async(publicKey: string, amount: string) => {
      console.log("started transaction");
        try {
            setIsSending(true);
            const {hash} = await onSendingViem(publicKey, amount);
            console.log("hash");
            console.log(hash);
            let sendObj = {
              hash: hash,
            };

            const req = await fetch("http://172.18.203.111:3011/blockchain/send_transaction_hash", {
    method: "POST",
    body: JSON.stringify(sendObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(req);

            setIsSending(false);
          } catch (e) {
            console.log("TRANSACTION", e);
            setIsSending(false);
          }
    };
    const onSendRawTransaction = async(publicKey:string , amount: string) =>{
      try{
        setIsSending(true);
        const {response} = await onsendingRawTransaction(publicKey,amount);
        console.log(response);
        setIsSending(false);
      }
      catch(e)
      {
        console.log("Transaction failed",e);
        setIsSending(false);
      }
    }


    return {
        onSendViem,
        onSendRawTransaction
    };
}