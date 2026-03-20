import React from 'react';

interface TimelineItem {
    id: string;
    user: string;
    action: string;
    time: string;
    type?: 'success' | 'info' | 'warning';
}

interface TimelineProps {
    items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {items.map((item, idx) => (
                    <li key={item.id}>
                        <div className="relative pb-8">
                            {idx !== items.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${item.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                                            item.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                                                'bg-indigo-50 text-indigo-600'
                                        }`}>
                                        <div className="h-2 w-2 rounded-full bg-current" />
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold text-gray-900">{item.user}</span>{' '}
                                            {item.action}
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-xs text-gray-400">
                                        <time date-time={item.time}>{item.time}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
