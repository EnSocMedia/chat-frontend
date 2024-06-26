import { Message, RecieverMessage } from "@/types/message";
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
  sendTransactionHash,
} from "./message/actions";
import { decrypt } from "@/lib/ecies";

export interface Chats {
  [publicKey: string]: {
    last_message: string;
    lastMessageId: string;
    isTyping: boolean;
    name: string;
  };
}

export interface ChatMessage {
  [publicKey: string]: {
    messages: Message[];
    pendingMessages: Message[];
    lastTimeStamp: number;
    lastMessageId: string;
  };
}

export interface Messages {
  chats: Chats;
  chatMessages: ChatMessage;
  isFetchingChats: {
    [publicKey: string]: {
      isFecthing: boolean;
    };
  };
  history: {
    [publicKey: string]: {
      transactions: string[];
    };
  };
}

export const createStateForNewUser = createAction<{
  name: string;
  publicKey: string;
}>("Create State For New User ");

// Action creators
const websocketConnect = () => ({ type: "WEBSOCKET_CONNECT" });
const websocketSendMessage = () => ({ type: "SEND_MESSAGE" });
const webSocketReceiveMessage = createAction<{
  message: RecieverMessage;
}>("Receive Websocket Message");
const webSocketReceiveTyping = createAction<{
  name: string;
}>("Receive Typing info");
const webSocketTypingEnded = createAction<{
  name: string;
}>("Ended Typing");

const initialState: Messages = {
  chatMessages: {},
  chats: {},
  isFetchingChats: {},
  history: {},
};

// export const handleTypingTimeout = (publicKey: string) => () => {
//   setTimeout(() => {
//     store.dispatch(webSocketTypingEnded({ publicKey }));
//   }, 3000);
// };

const receiveTypingWithTimeout = (name: string) => (dispatch: any) => {
  dispatch(webSocketReceiveTyping({ name: name }));
  setTimeout(() => dispatch(webSocketTypingEnded({ name: name })), 3000);
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
      const privateKey = localStorage.getItem("privatekey")!;
      console.log(message);
      if (!token) return;
      const { public_key } = parseJwt(token);

      let sender_key = message.from;

      if (public_key == sender_key) {
        sender_key = message.to;
        if (message.infoType == "message") {
          message.cipherSelf = decrypt(
            privateKey,
            Buffer.from(message.cipherSelf, "hex")
          ).toString("ascii");
        }
      } else if (message.infoType == "message") {
        message.cipher = decrypt(
          privateKey,
          Buffer.from(message.cipher, "hex")
        ).toString("ascii");
      }
      const prevMessages = state.chatMessages[sender_key]
        ? state.chatMessages[sender_key].messages
        : [];

      const prevPendingMessage = state.chatMessages[sender_key]
        ? state.chatMessages[sender_key].pendingMessages
        : [];
      //If the message is already in the state discard it
      const messageAlreadyExist = prevMessages.some((m) => m.id == message.id);

      if (messageAlreadyExist) return;

      //TODO: Sort the messages according to timestamp
      //Whenever a new message comes
      return {
        chatMessages: {
          ...state.chatMessages,
          [sender_key]: {
            messages: [message, ...prevMessages],
            lastTimeStamp: message.time,
            lastMessageId: message.id,
            pendingMessages: [...prevPendingMessage],
          },
        },
        chats: {
          ...state.chats,
          [sender_key]: {
            last_message:
              message.infoType == "transaction"
                ? "Payment"
                : public_key == sender_key
                ? message.cipherSelf
                : message.cipher,
            name: message.fromName,
            lastMessageId: message.id,
            isTyping: false,
          },
        },
        isFetchingChats: {
          ...state.isFetchingChats,
          [sender_key]: {
            isFecthing: false,
          },
        },
        history: {
          ...state.history,
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
              pendingMessages: [...state.chatMessages[userId].pendingMessages],
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
              isTyping: false,
              name:
                newMessages.length > 0
                  ? newMessages[0].toName
                  : state.chats[userId].name,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [userId]: {
              isFecthing: false,
            },
          },
          history: {
            ...state.history,
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
              pendingMessages: [...state.chatMessages[userId].pendingMessages],
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
              isTyping: false,
              name: newMessages.length > 0 ? newMessages[0].toName : "",
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [userId]: {
              isFecthing: false,
            },
          },
          history: {
            ...state.history,
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
        history: {
          ...state.history,
        },
      };
    })
    .addCase(getMessagesOnBootstrap.fulfilled, (state, action) => {
      const token = localStorage.getItem("token");
      const privateKey = localStorage.getItem("privatekey")!;
      if (!token) return;
      const { public_key } = parseJwt(token);
      const messages = action.payload.messages;
      console.log(messages);
      let foo = {
        chatMessages: {},
        chats: {},
        isFetchingChats: {},
      } as Messages;

      messages.forEach((message) => {
        let sender_key = message.from;
        let toName = message.toName;
        let cipherSelf = message.cipherSelf;
        if (public_key.toLowerCase() == sender_key.toLowerCase()) {
          sender_key = message.to;

          if (message.infoType == "message") {
            message.cipherSelf = decrypt(
              privateKey,
              Buffer.from(message.cipherSelf, "hex")
            ).toString("ascii");
            cipherSelf = message.cipherSelf;
          }
        } else if (message.infoType == "message") {
          toName = message.fromName;
          message.cipher = decrypt(
            privateKey,
            Buffer.from(message.cipher, "hex")
          ).toString("ascii");

          cipherSelf = message.cipher;
        } else {
          toName = message.fromName;
        }

        const prevMessageForThisChat =
          foo.chatMessages && foo.chatMessages[sender_key] !== undefined
            ? foo.chatMessages[sender_key].messages
            : [];
        foo.chatMessages[sender_key] = {
          messages: [...prevMessageForThisChat, message],
          lastMessageId: message.messageId,
          lastTimeStamp: message.time,
          pendingMessages: [],
        };

        foo.chats[sender_key] = {
          last_message:
            message.infoType == "transaction" ? "Payment" : cipherSelf,
          lastMessageId: message.messageId,
          isTyping: false,
          name: toName,
        };
      });
      return foo;
    })
    .addCase(sendMessageUsingHttp.pending, (state, action) => {
      const message = action.meta.arg;

      const publicKey = localStorage.getItem("publicKey");

      const msgObj = {
        id: "",
        cipher: message.cipher,
        from: publicKey,
        messageType: "private_message",
        toName: "Athul",
        fromName: "Rithu",
        status: "Wait",
        time: new Date().getTime(),
        to: message.to,
        messageId: message.messageId,
        infoType: "message",
      } as Message;

      state.chatMessages[message.to].pendingMessages.push(msgObj);
    })
    .addCase(sendTransactionHash.pending, (state, action) => {
      const message = action.meta.arg;

      const publicKey = localStorage.getItem("publicKey");

      const msgObj = {
        id: "",
        cipher: message.cipher,
        from: publicKey,
        messageType: "private_message",
        toName: "Athul",
        fromName: "Rithu",
        status: "Wait",
        time: new Date().getTime(),
        to: message.to,
        messageId: message.messageId,
        infoType: "transaction",
      } as Message;

      if (state.chatMessages[message.to].pendingMessages) {
        state.chatMessages[message.to].pendingMessages.push(msgObj);
      } else {
        state.chatMessages[message.to].pendingMessages = [msgObj];
      }
    })
    .addCase(sendMessageUsingHttp.fulfilled, (state, action) => {
      const privateKey = localStorage.getItem("privatekey")!;
      console.log("hello");
      const message = action.payload;
      console.log(message.cipherSelf);
      state.chatMessages[message.to].pendingMessages = state.chatMessages[
        message.to
      ].pendingMessages.filter((msg) => msg.messageId !== message.messageId);

      console.log(message);

      console.log(message.cipherSelf);
      message.cipherSelf = decrypt(
        privateKey,
        Buffer.from(message.cipherSelf, "hex")
      ).toString("ascii");

      if (state.chatMessages[message.to] === undefined) {
        return {
          chatMessages: {
            ...state.chatMessages,
            [message.to]: {
              messages: [message],
              lastMessageId: message.id,
              lastTimeStamp: message.time,
              pendingMessages: [
                ...state.chatMessages[message.to].pendingMessages,
              ],
            },
          },
          chats: {
            ...state.chats,
            [message.to]: {
              last_message: message.cipherSelf,
              lastMessageId: message.id,
              isTyping: false,
              name: message.fromName,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [message.to]: {
              isFecthing: false,
            },
          },
          history: {
            ...state.history,
          },
        };
      }

      state.chatMessages[message.to].messages.unshift(message);
      state.chatMessages[message.to].lastTimeStamp = message.time;
      state.chatMessages[message.to].lastMessageId = message.id;
      state.chats[message.to].last_message = message.cipherSelf;
      state.chats[message.to].lastMessageId = message.id;
    })
    .addCase(sendTransactionHash.fulfilled, (state, action) => {
      const message = action.payload;
      console.log(message.cipherSelf);
      state.chatMessages[message.to].pendingMessages = state.chatMessages[
        message.to
      ].pendingMessages.filter((msg) => msg.messageId !== message.messageId);

      if (state.chatMessages[message.to] === undefined) {
        return {
          chatMessages: {
            ...state.chatMessages,
            [message.to]: {
              messages: [message],
              lastMessageId: message.id,
              lastTimeStamp: message.time,
              pendingMessages: [
                ...state.chatMessages[message.to].pendingMessages,
              ],
            },
          },
          chats: {
            ...state.chats,
            [message.to]: {
              last_message: message.cipherSelf,
              lastMessageId: message.id,
              isTyping: false,
              name: message.fromName,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
            [message.to]: {
              isFecthing: false,
            },
          },
          history: {
            ...state.history,
          },
        };
      }

      state.chatMessages[message.to].messages.unshift(message);
      state.chatMessages[message.to].lastTimeStamp = message.time;
      state.chatMessages[message.to].lastMessageId = message.id;
      state.chats[message.to].last_message =
        message.infoType == "transaction" ? "Payment" : message.cipherSelf;
      state.chats[message.to].lastMessageId = message.id;
    })
    .addCase(sendMessageUsingHttp.rejected, (state, action) => {
      const message = action.meta.arg;
      state.chatMessages[message.to].pendingMessages = state.chatMessages[
        message.to
      ].pendingMessages.filter((msg) => msg.messageId !== message.messageId);

      const publicKey = localStorage.getItem("publicKey");

      const msgObj = {
        id: "",
        cipher: message.cipher,
        from: publicKey,
        messageType: "private_message",
        fromName: "Athul",
        toName: "Rithu",
        status: "Failed",
        time: new Date().getTime(),
        to: message.to,
        messageId: message.messageId,
      } as Message;

      state.chatMessages[message.to].pendingMessages.push(msgObj);
    })
    .addCase(webSocketReceiveTyping, (state, { payload: { name } }) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (state.chats[name]) {
        if (state.chats[name].isTyping === false) {
          return {
            chatMessages: {
              ...state.chatMessages,
            },
            chats: {
              ...state.chats,
              [name]: {
                ...state.chats[name],
                isTyping: true,
              },
            },
            isFetchingChats: {
              ...state.isFetchingChats,
            },
            history: {
              ...state.history,
            },
          };
        }
      }
      return state;
    })
    .addCase(webSocketTypingEnded, (state, { payload: { name } }) => {
      const token = localStorage.getItem("token");
      console.log("typing ended");
      if (!token) return;
      if (!state.chats[name]) return state;
      if (state.chats[name].isTyping === true) {
        return {
          chatMessages: {
            ...state.chatMessages,
          },
          chats: {
            ...state.chats,
            [name]: {
              ...state.chats[name],
              isTyping: false,
            },
          },
          isFetchingChats: {
            ...state.isFetchingChats,
          },
          history: {
            ...state.history,
          },
        };
      }
      return state;
    })
    .addCase(
      createStateForNewUser,
      (state, { payload: { name, publicKey } }) => {
        if (!state.chats[publicKey]) {
          return {
            chats: {
              ...state.chats,
              [publicKey]: {
                name: name,
                last_message: "",
                isTyping: false,
                lastMessageId: "",
              },
            },
            chatMessages: {
              ...state.chatMessages,
              [publicKey]: {
                lastMessageId: "",
                lastTimeStamp: 343,
                messages: [] as Message[],
                pendingMessages: [] as Message[],
              },
            },
            isFetchingChats: {
              ...state.isFetchingChats,
              [publicKey]: {
                isFecthing: false,
              },
            },
            history: {
              ...state.history,
            },
          };
        } else {
          return {
            ...state,
          };
        }
      }
    )
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
    const messageType = JSON.parse(messsage).messageType;
    switch (messageType) {
      case "private_message":
        store.dispatch(
          webSocketReceiveMessage({
            message: JSON.parse(event.data),
          })
        );
        if (JSON.parse(messsage).infoType=="message"){
          let recmsgaud=new Audio("/receivemessage.mp3")
          recmsgaud.play();
        }
        if (JSON.parse(messsage).infoType == "transaction") {
          let recievemoney = new Audio("/recievemoney.mp3");
          recievemoney.play();
        }
        break;
      case "TYPING":
        store.dispatch(receiveTypingWithTimeout(JSON.parse(event.data).from));

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
          socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);

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
