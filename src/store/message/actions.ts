
import { decrypt, encrypt } from "@/lib/ecies";
import { toHexString } from "@/lib/functions/utils";
import { ClientMessage, Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toHex } from "viem";

/*
Send Message Over HTTP
*/

export const sendTransactionHash = createAsyncThunk(
  "hash/sendHash",
  async (hash:string, {rejectWithValue}) => {
    try{
      console.log("started dispatch");
      const hashWithoutPrefix = hash.startsWith('0x') ? hash.slice(2) : hash; // Remove '0x' prefix
      const byteArray = hashWithoutPrefix.match(/[\da-f]{2}/gi)!.map(h => parseInt(h, 16));
      let sendObj = {
        data: byteArray,
      };
      const req = await fetch("http://172.18.203.111:3011/blockchain/send_transaction_hash", {
    method: "POST",
    body: JSON.stringify(sendObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return hash;
    }catch (e) {
      console.log(e);
      return rejectWithValue(hash);
    }
  }
);
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/sendMessage",
  async (message: ClientMessage, { rejectWithValue }) => {
    try {
      console.log("send message");
      const token = localStorage.getItem("token");
      const publicKey = localStorage.getItem("publicKey")!;
      const privateKey = localStorage.getItem("privatekey")!;

      // const doubleLayerEncryptedForm = encryptDoubleLayer(
      //   message.to,
      //   privateKey,
      //   Buffer.from(message.cipher)
      // );

      // console.log("Double layer", doubleLayerEncryptedForm);

      const messageToSend = JSON.parse(JSON.stringify(message));
      const encryptedMessage = encrypt(
        messageToSend.to,
        Buffer.from(messageToSend.cipher)
      );
      const encryptedMessageForSelf = encrypt(
        publicKey,
        Buffer.from(messageToSend.cipher)
      );

      messageToSend.cipher = toHexString(encryptedMessage);
      messageToSend.cipherSelf = toHexString(encryptedMessageForSelf);

      const req = await fetch(
        "http://172.18.203.111:3011/sendMessage",
        {
          method: "POST",
          body: JSON.stringify(messageToSend),
          headers: {
            "Content-Type": "application/json",
            AUTHENTICATION: token ?? "",
          },
        }
      );
      console.log("get request");
      console.log(req.json);

      const res = (await req.json()) as Message;
      console.log("message");
      console.log(res);

      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue(message);
    }
  }
);

/* 
Function to fetch All the message before the mentioned timestamp per chat Id
*/
export const getMessagesUsingUserId = createAsyncThunk(
  "messages/getMessages",
  async (data: any, thunkAPI) => {
    const { userId, limit = 50, before, after } = data;
    const token = localStorage.getItem("token");
    let proce;
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userId}/messages?limit=${limit}`;
    if (before) {
      url = url + `&before=${before}`;
    } else if (after) {
      url = url + `&after=${after}`;
    }
    const req = await fetch(url, {
      headers: {
        AUTHENTICATION: token!,
      },
    });

    const res = (await req.json()) as Message[];

    console.log("HOT RESPONSE", res);
    return { messages: res };
  }
);

/* 
Function to fetch list of users and the latest messages of that user on bootstrapping the app
*/
export const getMessagesOnBootstrap = createAsyncThunk(
  "messages/messagesOnBootstrap",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/messages/getMessagesOnBootstrap`;
    const req = await fetch(url, {
      headers: {
        AUTHENTICATION: token!,
      },
    });

    const res = (await req.json()) as Message[];

    return { messages: res };
  }


);
