import { getDateFromTimestamp } from "@/lib/functions/moment";

export default function ChatDayTime({time}:{time: number}) {
  return (
    <div className="flex justify-center">
      <div className="bg-blue-400">{getDateFromTimestamp(time)}</div>
    </div>
  );
}
