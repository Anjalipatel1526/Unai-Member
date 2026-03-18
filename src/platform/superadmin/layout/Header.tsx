import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 px-6 flex items-center justify-between shadow-sm">
            <div className="flex-1 max-w-lg">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search clients, plans, or tickets..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all font-medium placeholder:font-normal placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-transparent"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <button className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-primary-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white ring-2 ring-white shadow-sm">
                        <span className="text-sm font-semibold tracking-wide">SA</span>
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm font-semibold text-gray-900">Super Admin</span>
                        <span className="text-xs font-medium text-gray-500">Platform Owner</span>
                    </div>
                </button>
            </div>
        </header>
    );
};
