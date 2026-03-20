import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Dropdown, DropdownItem } from '../components/Dropdown';

export function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 w-full">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search employee, data, or reports..."
                        className="w-full bg-gray-50/50 border-none ring-1 ring-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                <Dropdown
                    trigger={
                        <div className="flex items-center gap-3 group">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Assistant HR</p>
                                <p className="text-xs text-gray-500">Limited Access</p>
                            </div>
                            <Avatar size="sm" alt="Assistant HR" className="ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all" />
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    }
                >
                    <DropdownItem>Profile Settings</DropdownItem>
                    <DropdownItem>Help Center</DropdownItem>
                    <DropdownItem variant="danger">Logout</DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
}
