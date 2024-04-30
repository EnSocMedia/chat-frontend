import { ClientMessage, Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";


/*
Send Message Over HTTP
*/
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/sendMessage",
  async (message: ClientMessage, thunkAPI) => {
    const token = localStorage.getItem("token");
    const publicKey = localStorage.getItem("publicKey");
    console.log("URL is", process.env.SERVER_URL);
    const req = await fetch(`http://localhost:3011/sendMessage`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        AUTHENTICATION: token ?? "",
      },
    });

    //Insert this into pending queue
    return {
      id: "sd",
      cipher: message.cipher,
      from: publicKey,
      messageType: "private_message",
      name: "Athul",
      status: "Sent",
      time: new Date().getTime(),
      to: message.to,
      messageId: message.messageId,
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
    let proce;
    let url = `${process.env.SERVER_URL}/user/${userId}/messages?limit=${limit}`;
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
