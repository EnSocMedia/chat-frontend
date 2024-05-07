import moment from "moment";
import { toHex } from "viem";

interface ChatTextProps {
  text: string;
  className?: string;
  sent: boolean;
  status: string;
  time: number;
  type: string;
  value?: string;
}

function TickIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function LoadingIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function ChatText({
  text,
  sent,
  status,
  time,
  type,
  value,
}: ChatTextProps) {
  if (type == "message") {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} p-2 `}>
        <div
          className={`${
            sent ? "bg-blue-500" : "bg-gray-200 text-black"
          } p-2 rounded-lg inline-block gap-1 flex items-center`}
        >
          <div>{text}</div>
          {status && status === "true" ? (
            <LoadingIcon
              className={`h-5 w-5 ${
                sent ? "text-white" : "text-blue-500"
              } ml-1`}
            />
          ) : (
            <TickIcon
              className={`h-5 w-5 ${
                sent ? "text-white" : "text-blue-500"
              } ml-1`}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Transaction hash :{text}
        <div>Value {value}</div>
      </div>
    );
  }
}
