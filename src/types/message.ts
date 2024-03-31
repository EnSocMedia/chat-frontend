export interface Message {
  id:string
  uid: string;
  messageType: string;
  cipher: string;
  from: string;
  to: string;
  messageId: string;
  name: string;
  time: number;
}

export enum MessageType {
  PrivateMessage,
  AUTHENTICATION,
  GroupMessage,
  TYPING,
}
