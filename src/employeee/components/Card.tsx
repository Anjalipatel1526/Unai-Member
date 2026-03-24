import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    onClick?: () => void;
}

export function Card({ children, className = '', title, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
        >
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
