import React from 'react';
import { cn } from './Card';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    color?: string;
}

export function ProgressBar({ value, max = 100, color = 'bg-indigo-600', className, ...props }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div
            className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
            {...props}
        >
            <div
                className={cn("h-full transition-all duration-500 ease-in-out", color)}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}
