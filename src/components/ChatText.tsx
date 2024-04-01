interface ChatTextProps {
  text: string;
  className?: string;
  sent: boolean;
}

export default function ChatText({ text, sent }: ChatTextProps) {
  return (
    <span className={`${sent ? "bg-slate-700" : "bg-lime-600 "}`}>{text}</span>
  );
}
