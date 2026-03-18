import React from 'react';
import { X } from 'lucide-react';
import { cn } from './Card';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity animate-in fade-in"
                onClick={onClose}
            />
            {/* Dialog */}
            <div
                className={cn(
                    "relative w-full max-w-lg rounded-2xl bg-white shadow-xl transition-all animate-in zoom-in-95",
                    className
                )}
            >
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
