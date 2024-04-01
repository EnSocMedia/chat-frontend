import { Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface MessageSend {
  uid: string;
  messageType: string;
  cipher: string;
  publicKey: string;
}

/*
Send Message Over HTTP
*/
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/sendMessage",
  async (message: MessageSend, thunkAPI) => {
    
    const token = localStorage.getItem("token");
    const publicKey = localStorage.getItem("publicKey");
    const req = await fetch("http://localhost:3011/sendMessage", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        AUTHENTICATION: token ?? "",
      },
    });
    return {
      cipher: message.cipher,
      from: publicKey,
      time: 23523445,
      messageId: "sdsdsd",
      messageType: "private_message",
      id:'efgrsdgv',
      name:'Athul',
      to:message.publicKey,
      uid:'sdsds'
    } as Message;
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
    let url = `http://localhost:3011/user/${userId}/messages?limit=${limit}`;
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
    let url = `http://localhost:3011/messages/getMessagesOnBootstrap`;
    const req = await fetch(url, {
      headers: {
        AUTHENTICATION: token!,
      },
    });

    const res = (await req.json()) as Message[];

    return { messages: res };
  }
);
