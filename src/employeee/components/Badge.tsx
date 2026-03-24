import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        primary: "bg-indigo-50 text-indigo-700 border border-indigo-100",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        warning: "bg-amber-50 text-amber-700 border border-amber-100",
        danger: "bg-rose-50 text-rose-700 border border-rose-100",
        info: "bg-sky-50 text-sky-700 border border-sky-100"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
