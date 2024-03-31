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
  getPastMessagesUsingLastTimestamp,
  sendMessageUsingHttp,
} from "./message/actions";

export interface ChatsMessage {
  [public_key: string]: {
    last_message: string;
  };
}

export interface ChatMessage {
  [public_key: string]: {
    messages: Message[];
    lastTimeStamp: number;
  };
}

export interface Messages {
  chatsMessage: ChatsMessage;
  chatMessage: ChatMessage;
}

// Action creators
const websocketConnect = () => ({ type: "WEBSOCKET_CONNECT" });
const websocketSendMessage = () => ({ type: "SEND_MESSAGE" });
const webSocketReceiveMessage = createAction<{
  message: Message;
}>("Receive Websocket Message");

const initialState: Messages = {
  chatMessage: {},
  chatsMessage: {},
};

function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}

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
      const prevMessages = state.chatMessage[sender_key]
        ? state.chatMessage[sender_key].messages
        : [];

      return {
        chatMessage: {
          [sender_key]: {
            messages: [...prevMessages, message],
            lastTimeStamp: message.time,
          },
        },
        chatsMessage: {
          ...state.chatsMessage,
          [sender_key]: { last_message: message.cipher },
        },
      };
    })
    .addCase(sendMessageUsingHttp.pending, (state, action) => {
      {
      }
    })
);

// return {
//   // chatMessage: [...state.chatMessage.messages],
//   // chatsMessage: {
//   //   ...state.chatsMessage,
//   //   [sender_key]: { last_message: message.cipher },
//   // },
// };
function parsePrivateMessage(message: string) {
  return JSON.parse(message) as ChatMessage;
}

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
