import React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
            <table className={`w-full text-left text-sm border-collapse ${className}`}>
                {children}
            </table>
        </div>
    );
}

export function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <thead className={`bg-gray-50/50 border-b border-gray-100 ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <tbody className={`divide-y divide-gray-50 ${className}`}>{children}</tbody>;
}

export function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <tr className={`hover:bg-gray-50/50 transition-colors ${className}`}>{children}</tr>;
}

export function TableCell({ children, className = '', colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) {
    return <td className={`px-6 py-4 whitespace-nowrap text-gray-700 ${className}`} colSpan={colSpan}>{children}</td>;
}

export function TableHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <th className={`px-6 py-3 font-semibold text-gray-900 ${className}`}>{children}</th>;
}
