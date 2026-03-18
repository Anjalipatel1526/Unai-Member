import React from 'react';
import { cn } from './Card';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
    ({ className, src, alt, fallback, ...props }, ref) => {
        return (
            <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
                {src ? (
                    <img
                        ref={ref}
                        src={src}
                        alt={alt || "Avatar"}
                        className="aspect-square h-full w-full object-cover"
                        {...props}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                        {fallback || alt?.charAt(0).toUpperCase() || '?'}
                    </div>
                )}
            </div>
        );
    }
);
Avatar.displayName = "Avatar";
