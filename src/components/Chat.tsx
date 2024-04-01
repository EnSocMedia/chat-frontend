import { Message } from "@/types/message";

interface ChatProps{
    userid : string
}
export default function Chat({userid}:ChatProps){
    interface ChatMessage {
        [public_key: string]: {
          messages: Message[];
          lastTimeStamp: number;
          lastMessageId: string;
        };
      };
      const sampleChatMessages: ChatMessage = {
        "public_key_1": {
          messages: [
            {
              id: "1",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "public_key1",
              to: "me",
              messageId: "message_id_1",
              name: "User 1",
              time: 1648859521000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "me",
              to: "public_key1",
              messageId: "message_id_2",
              name: "User 1",
              time: 1648859522000 // Sample timestamp (in milliseconds)
            },
            {
              id: "1",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "public_key1",
              to: "me",
              messageId: "message_id_1",
              name: "User 1",
              time: 1648859521000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "me",
              to: "public_key1",
              messageId: "message_id_2",
              name: "User 1",
              time: 1648859522000 // Sample timestamp (in milliseconds)
            },
            {
              id: "1",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "public_key1",
              to: "me",
              messageId: "message_id_1",
              name: "User 1",
              time: 1648859521000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_1",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "me",
              to: "public_key1",
              messageId: "message_id_2",
              name: "User 1",
              time: 1648859522000 // Sample timestamp (in milliseconds)
            },
            // Add more sample messages here
          ],
          lastTimeStamp: 1648859522000, // Sample timestamp (in milliseconds)
          lastMessageId: "message_id_2" // ID of the last message
        },
        "public_key_2": {
          messages: [
            {
              id: "1",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_1",
              name: "User 2",
              time: 1648859523000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_2",
              name: "User 2",
              time: 1648859524000 // Sample timestamp (in milliseconds)
            },
            {
              id: "1",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_1",
              name: "User 2",
              time: 1648859523000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_2",
              name: "User 2",
              time: 1648859524000 // Sample timestamp (in milliseconds)
            },
            {
              id: "1",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_1",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_1",
              name: "User 2",
              time: 1648859523000 // Sample timestamp (in milliseconds)
            },
            {
              id: "2",
              uid: "user_id_2",
              messageType: "text",
              cipher: "encrypted_text_2",
              from: "sender_2",
              to: "receiver_2",
              messageId: "message_id_2",
              name: "User 2",
              time: 1648859524000 // Sample timestamp (in milliseconds)
            },
            
            // Add more sample messages here
          ],
          lastTimeStamp: 1648859524000, // Sample timestamp (in milliseconds)
          lastMessageId: "message_id_2" // ID of the last message
        }
      };
      const messages=sampleChatMessages[userid]?.messages;
      if (!messages || messages.length === 0) {
        return <div>No messages</div>;
      }
    return (
        <div>
             <div className="flex flex-col gap-4 pt-20">
             {messages.map((message) => (
            
        <div
          key={message.id}
          className= "relative h-24"
        >
          <div className={`max-w-lg mx-auto ${
            message.from === "me" ? "absolute inset-y-0 right-0" : "absolute inset-y-0 left-[350px]"
          }`}>
          <div
            className={`rounded-lg p-4 ${
              message.from === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"
            }`}
            style={{
              textAlign: message.from === "me" ? "right" : "left",
            }}
          >
            <p className="text-sm">{message.name}</p>
            <p className="text-base">{message.cipher}</p>
          </div>
          </div>
        </div>
      ))}
             </div>
        </div>
    );
}