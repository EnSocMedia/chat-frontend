//The Message Object That user get's on bootstrap
export interface Message {
  id: string; // Db Unique Id
  messageId: string; //Message Id
  from: string; // Public Key/Address of the Sender
  to: string; // Public Key/Address of the Receiver
  toName: string; // Name of the Receiver
  fromName: string;
  cipher: string; //Encrypted Message
  cipherSelf:string;
  messageType: string; // Type of the Messgae
  time: number; //Time at which the Message has been sent
  status: string; // What's the Status of the Message (Seem,Delivered,Sent)
  infoType:string
}

//The type that the Client Send to Reciever
export interface ClientMessage {
  messageId: string;
  to: string;
  cipher: string;
  messageType: string;
  cipherSelf:string
  infoType:string
}

//The type that the Receiver Send to Client
export type RecieverMessage = Message;

//Type of the Message
export enum MessageType {
  PrivateMessage,
  AUTHENTICATION,
  GroupMessage,
  TYPING,
}
