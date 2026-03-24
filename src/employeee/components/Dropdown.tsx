import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
}

export function Dropdown({ trigger, children, align = 'right', className = '' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div
                    className={`absolute z-50 mt-2 w-48 rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 origin-top animate-in fade-in zoom-in-95 ${align === 'right' ? 'right-0' : 'left-0'}`}
                >
                    <div className="p-2 divide-y divide-gray-50">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

export function DropdownItem({ children, onClick, variant = 'default' }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'danger';
}) {
    const colors = {
        default: 'text-gray-700 hover:bg-gray-50',
        danger: 'text-rose-600 hover:bg-rose-50'
    };

    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-2 text-sm font-medium rounded-xl transition-colors ${colors[variant]}`}
        >
            {children}
        </button>
    );
}
