import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}>
            {title && (
                <div className="px-4 md:px-5 py-3 border-b border-gray-50 bg-gray-50/30">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
            )}
            <div className="p-4 md:p-5">
                {children}
            </div>
        </div>
    );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`px-6 py-4 border-b border-gray-50 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <h3 className={`text-lg font-bold text-gray-900 ${className}`}>{children}</h3>;
}
