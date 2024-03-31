import { Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

/*
Send Message Over HTTP
*/
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/fetchByIdStatus",
  async (message: any, thunkAPI) => {
    const token = localStorage.getItem("token");
    const req = await fetch("http://localhost:3011/sendMessage", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "AUTHENTICATION": token ?? "",
      },
    });

    const res = await req.json();
    console.log(res);
    return {} as Message;
  }
);

/* 
Function to fetch All the message before the mentioned timestamp per chat Id
*/
export const getMessagesUsingUserId = createAsyncThunk(
  "messages/getMessages",
  async (data: any, thunkAPI) => {
    const { userId, limit = 50, before, after } = data;
    console.log("Getting messages",data)
    const token = localStorage.getItem("token");
    let url = `http://localhost:3011/user/${userId}/messages?limit=${limit}`;
    if (before) {
      url = url + `before=${before}`;
    } else if (after) {
      url = url + `before=${after}`;
    }
    const req = await fetch(url,{
      headers:{
        "AUTHENTICATION":token!
      }
    });

    const res = (await req.json()) as Message[];
    console.log("HOT RESPONSE",res)
    return {messages:res};
  }
);

/* 
Function to fetch list of users and the latest messages of that user on bootstrapping the app
*/
export const getMessagesOnBootstrap = createAsyncThunk(
  "messages/messagesOnBootstrap",
  async () => {
    return {};
  }
);
