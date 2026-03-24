import React from 'react';

interface ProgressBarProps {
    value: number;
    max: number;
    label?: string;
    showValue?: boolean;
    color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
    size?: 'sm' | 'md';
    className?: string;
}

export function ProgressBar({ value, max, label, showValue = true, color = 'indigo', size = 'md', className = '' }: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100);

    const colors = {
        indigo: 'bg-indigo-500',
        emerald: 'bg-emerald-500',
        amber: 'bg-amber-500',
        rose: 'bg-rose-500',
        sky: 'bg-sky-500',
    };

    const bgColors = {
        indigo: 'bg-indigo-100',
        emerald: 'bg-emerald-100',
        amber: 'bg-amber-100',
        rose: 'bg-rose-100',
        sky: 'bg-sky-100',
    };

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
    };

    return (
        <div className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-1.5">
                    {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
                    {showValue && <span className="text-xs font-bold text-gray-900">{value}/{max}</span>}
                </div>
            )}
            <div className={`w-full ${bgColors[color]} rounded-full ${sizes[size]} overflow-hidden`}>
                <div
                    className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
