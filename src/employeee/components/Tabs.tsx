import React from 'react';

interface TabsProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
    return (
        <div className={`flex gap-1 bg-gray-100 rounded-xl p-1 ${className}`}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
