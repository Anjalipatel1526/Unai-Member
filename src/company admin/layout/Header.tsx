import React from 'react';
import { Search, Bell, User as UserIcon, Menu } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { useCompanyData } from '../data/CompanyContext';

interface HeaderProps {
    onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
    const { company } = useCompanyData();
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 pl-4 pr-2 backdrop-blur-md w-full">
            <div className="flex flex-1 items-center gap-4">
                <button
                    onClick={onOpenMobileMenu}
                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg sm:hidden"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
                    {company.name} Workspace
                </h1>
                {/* Search */}
                <div className="relative w-full max-w-md hidden sm:block ml-4">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                        placeholder="Search employees, documents..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-indigo-600"></span>
                    <Bell size={20} />
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <button className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-50 transition-colors">
                    <Avatar
                        src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff"
                        alt="Admin"
                        className="h-8 w-8 border border-white shadow-sm"
                    />
                    <span className="hidden text-sm font-medium text-gray-700 md:block">
                        Admin
                    </span>
                </button>
            </div>
        </header>
    );
}
