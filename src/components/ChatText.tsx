import { decrypt } from "eciesjs";
import moment from "moment";
import { toHex } from "viem";

interface ChatTextProps {
  text: string;
  className?: string;
  sent: boolean;
  status: string;
  time: number;
}

export default function ChatText({ text, sent, status, time }: ChatTextProps) {

  console.log("CIUPHER HERE", text);
  return (
    <div className={`${sent ? "text-right" : "text-left "} p-2 `}>
      <div
        className={`${
          sent ? "bg-blue-500" : "bg-gray-200  text-black  "
        } p-2 rounded-lg inline-block gap-1 `}
      >
        <div>{text}</div>
      </div>
      <span>{status}</span>
    </div>
  );
}
