import React from 'react';
import { cn } from '../utils/cn';
import { type LucideIcon, X } from 'lucide-react';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("glass-card", className)}>
        {children}
    </div>
);

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100"
    };
    const sizes = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2 text-sm gap-2",
        lg: "px-5 py-2.5 text-base gap-2"
    };

    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {Icon && <Icon className={cn("shrink-0", size === 'sm' ? "w-4 h-4" : "w-5 h-5")} />}
            {children}
        </button>
    );
};

export const Badge = ({
    children,
    status = 'neutral',
    className
}: {
    children: React.ReactNode;
    status?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
    className?: string;
}) => {
    const styles = {
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        neutral: "bg-gray-100 text-gray-700 border-gray-200",
        primary: "bg-primary-50 text-primary-700 border-primary-200"
    };

    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border", styles[status], className)}>
            {children}
        </span>
    );
};

export const ProgressBar = ({ progress, className }: { progress: number; className?: string }) => (
    <div className={cn("w-full bg-gray-100 rounded-full h-1.5 overflow-hidden", className)}>
        <div
            className="bg-primary-600 h-1.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
    </div>
);

export const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            enabled ? 'bg-primary-600' : 'bg-gray-200'
        )}
    >
        <span
            className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                enabled ? 'translate-x-4' : 'translate-x-0'
            )}
        />
    </button>
);

export const Modal = ({
    isOpen,
    onClose,
    title,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
