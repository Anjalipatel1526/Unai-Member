import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    icon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
        danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-200",
        ghost: "text-gray-600 hover:bg-gray-100"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
}
