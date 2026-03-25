import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Dropdown, DropdownItem } from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();

    // Get logged-in employee data from localStorage
    const getAuthData = () => {
        try {
            const auth = localStorage.getItem('userAuth');
            if (auth) {
                const parsed = JSON.parse(auth);
                return {
                    name: parsed.employeeName || 'Employee',
                    designation: parsed.designation || 'Employee',
                    email: parsed.email || '',
                };
            }
        } catch { }
        return { name: 'Employee', designation: 'Employee', email: '' };
    };

    const authData = getAuthData();

    const handleLogout = () => {
        localStorage.removeItem('userAuth');
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-gray-900">UNAI Tech Organization</h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
                    Employee Portal
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <Bell size={18} className="text-gray-500" />
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white" />
                </button>

                <Dropdown
                    trigger={
                        <button className="flex items-center gap-3 group outline-none">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{authData.name}</p>
                                <p className="text-xs text-gray-500">{authData.designation}</p>
                            </div>
                            <Avatar size="sm" alt={authData.name} className="ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all" />
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </button>
                    }
                >
                    <DropdownItem onClick={() => navigate('/employee/profile')}>
                        <span className="flex items-center gap-2"><User size={14} /> My Profile</span>
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/employee/settings')}>
                        <span className="flex items-center gap-2"><Settings size={14} /> Settings</span>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout} variant="danger">
                        <span className="flex items-center gap-2"><LogOut size={14} /> Logout</span>
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
}
