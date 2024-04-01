interface ChatTextProps {
  text: string;
  className?: string;
  sent: boolean;
}

export default function ChatText({ text, sent }: ChatTextProps) {
  return (
    <div className={`${sent ? "text-right" : "text-left "} p-2 `}>
      <span className={`${sent ? "bg-blue-500" : "bg-gray-200  text-black  "} p-2 rounded-lg `}>{text}</span>
    </div>
  );
}
