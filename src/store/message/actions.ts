import { ClientMessage, Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

/*
Send Message Over HTTP
*/
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/sendMessage",
  async (message: ClientMessage, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const publicKey = localStorage.getItem("publicKey");
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sendMessage`,
        {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            "Content-Type": "application/json",
            AUTHENTICATION: token ?? "",
          },
        }
      );

      const res = (await req.json()) as Message;

      return res;
    } catch (e) {
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
    let url = `http://172.18.203.111:3011/messages/getMessagesOnBootstrap`;
    const req = await fetch(url, {
      headers: {
        AUTHENTICATION: token!,
      },
    });

    const res = (await req.json()) as Message[];

    return { messages: res };
  }
);