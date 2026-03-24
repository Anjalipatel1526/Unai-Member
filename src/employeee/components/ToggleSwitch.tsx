import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full border-2 transition-colors ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-gray-200 border-gray-200'}`} />
                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${checked ? 'translate-x-4' : ''}`} />
            </div>
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        </label>
    );
}
