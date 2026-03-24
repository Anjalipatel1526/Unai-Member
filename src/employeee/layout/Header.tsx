import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Dropdown, DropdownItem } from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { employeeProfile } from '../data/mockData';

export function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userAuth');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 md:px-6 w-full">
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-900 hidden sm:block">UNAI Tech Organization</h1>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Employee Portal
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => alert('Notifications coming soon')}
                    className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                <Dropdown
                    trigger={
                        <button className="flex items-center gap-3 group outline-none">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{employeeProfile.name || 'Employee'}</p>
                                <p className="text-xs text-gray-500">{employeeProfile.designation || 'Employee'}</p>
                            </div>
                            <Avatar size="sm" alt={employeeProfile.name || 'Employee'} className="ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all" />
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </button>
                    }
                >
                    <DropdownItem onClick={() => navigate('/employee/profile')}>My Profile</DropdownItem>
                    <DropdownItem onClick={() => navigate('/employee/settings')}>Settings</DropdownItem>
                    <DropdownItem variant="danger" onClick={handleLogout}>Logout</DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
}
