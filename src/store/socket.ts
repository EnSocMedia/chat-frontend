import { Message } from "@/types/message";
import {
  Action,
  Dispatch,
  Middleware,
  createAction,
  createReducer,
  current,
  isAnyOf,
} from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import {
  getMessagesOnBootstrap,
  getMessagesUsingUserId,
  sendMessageUsingHttp,
} from "./message/actions";

export interface Chats {
  [public_key: string]: {
    last_message: string;
    lastMessageId: string;
  };
}

export interface ChatMessage {
  [public_key: string]: {
    messages: Message[];
    lastTimeStamp: number;
    lastMessageId: string;
  };
}

export interface Messages {
  chats: Chats;
  chatMessages: ChatMessage;
  isFetchingChats: {
    [public_key: string]: {
      isFecthing: boolean;
    };
  };
}

// Action creators
const websocketConnect = () => ({ type: "WEBSOCKET_CONNECT" });
const websocketSendMessage = () => ({ type: "SEND_MESSAGE" });
const webSocketReceiveMessage = createAction<{
  message: Message;
}>("Receive Websocket Message");

const initialState: Messages = {
  chatMessages: {},
  chats: {},
  isFetchingChats: {},
};

export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}

/* 
  Reducer for websocket actions
*/
export const websocketSlice = createReducer<Messages>(initialState, (builder) =>
  builder
    .addCase(webSocketReceiveMessage, (state, { payload: { message } }) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { public_key } = parseJwt(token);
      let sender_key = message.from;
      if (public_key == sender_key) {
        sender_key = message.to;
      }
      const prevMessages = state.chatMessages[sender_key]
        ? state.chatMessages[sender_key].messages
        : [];

      //If the message is already in the state discard it
      const messageAlreadyExist = prevMessages.some(
        (m) => m.messageId == message.messageId
      );

      if (messageAlreadyExist) return;

      //TODO: Sort the messages according to timestamp
      //Whenever a new message comes

      return {
        chatMessages: {
          ...state.chatMessages,
          [sender_key]: {
            messages: [message, ...prevMessages],
            lastTimeStamp: message.time,
            lastMessageId: message.messageId,
          },
        },
        chats: {
          ...state.chats,
          [sender_key]: {
            last_message: message.cipher,
            lastMessageId: message.messageId,
          },
        },
        isFetchingChats: {
          ...state.isFetchingChats,
          [sender_key]: {
            isFecthing: false,
          },
        },
      };
    })
    .addCase(getMessagesUsingUserId.fulfilled, (state, action) => {
      const messages = action.payload.messages;
      const { userId } = action.meta.arg as { userId: string };

      //TODO: Sort the messages according to timestamp
      //Whenever a new message comes

      //Get the Previous message of the same chatId using UserId
      const prevMessages = state.chatMessages[userId]
        ? state.chatMessages[userId].messages
        : [];

      //Check if the message is already in the state
      const newMessages = messages.filter((message) => {
        if (
          prevMessages.some(
            (prevMessage) => prevMessage.messageId === message.messageId
          )
        ) {
          return false;
        }

        return true;
      });

      if (
        state.chats[userId] !== undefined &&
        state.chatMessages[userId] &&
        state.chatMessages[userId].messages
      ) {
        return {
          chatMessages: {
            ...state.chatMessages,
            [userId]: {
              messages: [...prevMessages, ...newMessages],
              lastTimeStamp:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].time
                  : state.chatMessages[userId].lastTimeStamp,
              lastMessageId:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].messageId
                  : state.chatMessages[userId].lastMessageId,
            },
          },
          chats: {
            ...state.chats,
            [userId]: {
              last_message:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].cipher
                  : state.chats[userId].last_message,
              lastMessageId:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].cipher
                  : state.chats[userId].lastMessageId,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [userId]: {
              isFecthing: false,
            },
          },
        };
      } else {
        const hasMessage = newMessages.length > 0;
        return {
          chatMessages: {
            ...state.chatMessages,
            [userId]: {
              messages: [...newMessages],
              lastTimeStamp:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].time
                  : 0,
              lastMessageId:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].messageId
                  : "",
            },
          },
          chats: {
            ...state.chats,
            [userId]: {
              last_message:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].cipher
                  : "",
              lastMessageId:
                newMessages.length > 0
                  ? newMessages[newMessages.length - 1].cipher
                  : "",
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [userId]: {
              isFecthing: false,
            },
          },
        };
      }
    })
    .addCase(getMessagesUsingUserId.pending, (state, action) => {
      const { userId } = action.meta.arg as { userId: string };

      return {
        chatMessages: {
          ...state.chatMessages,
        },
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
          },
        },
        isFetchingChats: {
          ...state.isFetchingChats,
          [userId]: {
            isFecthing: false,
          },
        },
      };
    })
    .addCase(getMessagesOnBootstrap.fulfilled, (state, action) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { public_key } = parseJwt(token);
      const messages = action.payload.messages;
      console.log("MESSAGES ON BOOTSTRAP", messages);

      let foo = {
        chatMessages: {},
        chats: {},
        isFetchingChats: {},
      } as Messages;

      messages.forEach((message) => {
        let sender_key = message.from;
        if (public_key == sender_key) {
          sender_key = message.to;
        }
        const prevMessageForThisChat =
          foo.chatMessages && foo.chatMessages[sender_key] !== undefined
            ? foo.chatMessages[sender_key].messages
            : [];
        foo.chatMessages[sender_key] = {
          messages: [...prevMessageForThisChat, message],
          lastMessageId: message.messageId,
          lastTimeStamp: message.time,
        };

        foo.chats[sender_key] = {
          last_message: message.cipher,
          lastMessageId: message.messageId,
        };
      });

      return foo;
    })
    .addCase(sendMessageUsingHttp.fulfilled, (state, action) => {
      const message = action.payload;


      if (state.chatMessages[message.to] === undefined) {
        return {
          chatMessages: {
            ...state.chatMessages,
            [message.to]: {
              messages: [message],
              lastMessageId: message.messageId,
              lastTimeStamp: message.time,
            },
          },
          chats: {
            ...state.chats,
            [message.to]: {
              last_message: message.cipher,
              lastMessageId: message.messageId,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [message.to]: {
              isFecthing: false,
            },
          },
        };
      }
      state.chatMessages[message.to].messages.unshift(message);
      state.chatMessages[message.to].lastTimeStamp = message.time;
      state.chatMessages[message.to].lastMessageId = message.messageId;
      state.chats[message.to].last_message = message.cipher;
      state.chats[message.to].lastMessageId = message.messageId;

      console.log("UPDATE");
    })
);

/*
  Middleware to recieve all sockets messages and dispatch actions accordingly
*/
//@ts-ignore
export const websocketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  const onOpen = (store: any) => () => {
    console.log("Connecting to Websocket ......");
    if (socket) {
      const token = localStorage.getItem("token");
      socket?.send(JSON.stringify({ token: token }));
    }
    // store.dispatch(websocketSlice.actions.websocketConnect());
  };

  const onMessage = (store: any) => (event: any) => {
    const messsage = event.data;
    console.log(messsage);
    const messageType = JSON.parse(messsage).message_type;

    switch (messageType) {
      case "private_message":
        store.dispatch(
          webSocketReceiveMessage({
            message: JSON.parse(event.data),
          })
        );
        break;
      case "typing":

      default:
        console.log("Invalid Message type");
    }
  };

  return (next: Dispatch) => {
    return (action: Action) => {
      switch (action.type) {
        case "WEBSOCKET_CONNECT":
          if (socket !== null) {
            socket.close();
          }
          socket = new WebSocket("ws://127.0.0.1:3011/ws");

          socket.onopen = onOpen(store);
          socket.onmessage = onMessage(store);
          break;
        case "SEND_MESSAGE": {
          if (socket == null || !socket.readyState) {
            return;
          }
          const message = {
            uid: "sfbdsjbf",
            message_type: "private_message",
            cipher: "HELLO",
            public_key:
              "03e76a177d1bcc2a47e7c85e9c2c224e2ca6b93b90b688eb36c2817cd2e61a80ce",
          };
          socket?.send(JSON.stringify(message));

          store.dispatch(
            webSocketReceiveMessage({
              message: message as any,
            })
          );
        }
        // Handle other actions if needed
        default:
          return next(action);
      }
    };
  };
};

export { websocketConnect, websocketSendMessage, webSocketReceiveMessage };
