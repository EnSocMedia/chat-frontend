import { useAppSelector } from "@/store/hooks";

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  const chats = useAppSelector((state) => state.websocket.chatMessages);

  const messages = chats[chatId]?.messages;

  if (messages) {
    return (
      <div>
        {messages.map((message, index) => {
          return <div key={index}>{message.cipher}</div>;
        })}
      </div>
    );
  }

  return <div></div>;
}
