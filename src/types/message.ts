//The Message Object That user get's on bootstrap
export interface Message {
  id: string; // Db Unique Id
  messageId: string; //Message Id
  from: string; // Public Key/Address of the Sender
  to: string; // Public Key/Address of the Receiver
  name: string; // Name of the Receiver
  cipher: string; //Encrypted Message
  messageType: string; // Type of the Messgae
  time: number; //Time at which the Message has been sent
  status: string; // What's the Status of the Message (Seem,Delivered,Sent)
}

//The type that the Client Send to Reciever
export interface ClientMessage {
  messageId: string;
  to: string;
  cipher: string;
  messageType: string;
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
