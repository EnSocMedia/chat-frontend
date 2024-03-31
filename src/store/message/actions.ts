import { Message } from "@/types/message";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

/*
Send Message Over HTTP
*/
export const sendMessageUsingHttp = createAsyncThunk(
  "messages/fetchByIdStatus",
  async ( message:any,thunkAPI) => {
    const token = localStorage.getItem("token");
    const req = await fetch("http://localhost:3011/sendMessage", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        AUTHENTICATION: token ?? "",
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
export const getPastMessagesUsingLastTimestamp = createAsyncThunk(
  "messages/messagesUsingLastTimestamp",
  async () => {
    return {};
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
