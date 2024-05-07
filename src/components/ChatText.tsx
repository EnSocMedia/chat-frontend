import { getDayAndMonth } from "@/lib/functions/moment";
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
  hash?: string;
  to: string;
}

function TickIcon({ className }: { className: string }) {
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

function LoadingIcon({ className }: { className: string }) {
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
  hash,
  to,
}: ChatTextProps) {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const formatterDay = new Intl.DateTimeFormat("en", { day: "2-digit" });
  const day = formatterDay.format(new Date(time));
  const month = formatter.format(new Date(time));
  if (type == "message") {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} p-2 `}>
        <div
          className={`${
            sent ? "bg-[#31363F]" : "bg-gray-200 text-black"
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
      <div className={`flex ${sent ? "justify-end" : "justify-start"} my-2 `}>
        <div className="border border-white p-4 rounded-lg w-[25%]">
          <h1 className="font-bold text-[16px]">Payment To {to} </h1>
          <div className="text-[24px]">{value} ETH</div>
          <div className="text-[14px]">
            Paid {day} {month}
          </div>
          <button className="text-[12px] text-center w-full py-2 text-blue-600">
            <a target="_blank" href={`https://sepolia.etherscan.io/tx/${hash}`}>
              View on Explorer
            </a>
          </button>
        </div>
      </div>
    );
  }
}
