import { onSendingViem } from "@/lib/functions/transaction";
import { onsendingRawTransaction } from "@/lib/functions/rawtransaction";
import { useEffect, useState } from "react";

export const useTransaction = () =>{
    const [isSending,setIsSending] = useState(false);
    const onSendViem = async(publicKey: string, amount: string) => {
      console.log("started transaction");
        try {
            setIsSending(true);
            const {hash} = await onSendingViem(publicKey, amount);
            console.log(hash);
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