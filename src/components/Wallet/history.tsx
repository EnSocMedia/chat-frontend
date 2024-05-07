import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react';
import { HistoryComp } from './historycomp';
import { hashDomain } from 'viem';
interface HistoryProps {
    address:string
  }

export default function History({ address  }: HistoryProps) {
    const dispatch = useAppDispatch();
    const history = useAppSelector((state) => state.websocket.history);
    const hashhistory=history[address]?.transactions;
    return (
        <div className="overflow-y-auto grid grid-rows-1 grid-flow-col gap-4  p-3">
            <div className="max-h-[200px] overflow-y-auto">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 ">
                    <h1>History</h1>
                    {hashhistory===undefined ? <div>
                        <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.freepik.com/256/4128/4128405.png?ga=GA1.1.368707580.1712341458&" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                   No trasactions yet
                                </p>

                            </div>
                        </div>
                    </li>
                    </div>: hashhistory.map((item, index) => (
            <div key={index}>
                <HistoryComp hash={hashhistory[index]}/>
            </div>
        ))}

                </ul>
            </div>
        </div>
    );
}

