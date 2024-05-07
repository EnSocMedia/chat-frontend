import { getDateFromTimestamp } from "@/lib/functions/moment";
import { useEffect } from "react";

export default function ChatDayTime({ time }: { time: number }) {
  console.log
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const formatterDay = new Intl.DateTimeFormat("en", { day: "2-digit" });

  const day = formatterDay.format(new Date(time * 1000));
  const month = formatter.format(new Date(time * 1000));

  return (
    <div className="flex justify-center">
      <div className=" py-2">
        {day} {month}
      </div>
    </div>
  );
}
