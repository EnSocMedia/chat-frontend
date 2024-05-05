"use client";
import { useGetTransaction } from '@/hooks/useGetTransaction';
interface HistoryCompProps {
    hash:string
  }
export const HistoryComp = ({ hash  }: HistoryCompProps) => {
    const {bool,id,balance} = useGetTransaction(hash);
    const textColorClass = bool ? "text-green-500" : "text-red-500";
    const symbol = bool ? "+" :"-";
    return (
        <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.freepik.com/256/4128/4128405.png?ga=GA1.1.368707580.1712341458&" alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {id}
                    </p>
                </div>
                <div className={`inline-flex items-center text-base font-semibold ${textColorClass}`}>
        {symbol}{balance}
    </div>
            </div>
        </li>
    );

}

