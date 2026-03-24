import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function Avatar({ src, alt = 'User', size = 'md', className = '' }: AvatarProps) {
    const sizes = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
        xl: "h-20 w-20 text-2xl"
    };

    return (
        <div className={`shrink-0 rounded-xl overflow-hidden ${sizes[size]} bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold border border-white shadow-sm ring-1 ring-gray-100 ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                alt.charAt(0).toUpperCase()
            )}
        </div>
    );
}
