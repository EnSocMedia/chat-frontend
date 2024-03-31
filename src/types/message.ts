export interface Message {
    uid: string;
    messageType: string;
    cipher: string;
    from: string;
    to: string;
    message_id: string;
    name: string;
    time: number;
  }