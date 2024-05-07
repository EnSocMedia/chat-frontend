import { onSendingViem } from "@/lib/functions/transaction";
import { onsendingRawTransaction } from "@/lib/functions/rawtransaction";
import { useEffect, useState } from "react";
import { toHexString } from "@/lib/functions/utils";
import { sendTransactionHash } from "@/store/message/actions";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { ClientMessage } from "@/types/message";
import { v4 } from "uuid";

export const useTransaction = () => {
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onSendViem = async (
    address: string,
    amount: string,
    publicKey?: string
  ) => {
    console.log("started transaction");
    try {
      setIsSending(true);
      const { hash } = await onSendingViem(address, amount);
      if (publicKey) {
        let messagePayload: ClientMessage = {
          cipher: hash,
          cipherSelf: amount,
          infoType: "transaction",
          messageId: v4(),
          messageType: "private_message",
          to: publicKey,
        };
        //console.log(toHexString(hash));
        dispatch(sendTransactionHash(messagePayload));
        setIsSending(false);
        return true;
      }
      return true;
      
    } catch (e) {
      console.log("TRANSACTION", e);
      setIsSending(false);
    }
  };
  const onSendRawTransaction = async (publicKey: string, amount: string) => {
    try {
      setIsSending(true);
      const { response } = await onsendingRawTransaction(publicKey, amount);
      console.log(response);
      setIsSending(false);
    } catch (e) {
      console.log("Transaction failed", e);
      setIsSending(false);
    }
  };
  return {
    onSendViem,
    onSendRawTransaction,
  };
};

function dispatch(arg0: unknown) {
  throw new Error("Function not implemented.");
}
