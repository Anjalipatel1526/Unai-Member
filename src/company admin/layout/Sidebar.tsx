import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    CalendarOff,
    Wallet,
    Target,
    Files,
    LogOut,
    FileBarChart,
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '../components/Card';
import { useCompanyData } from '../data/CompanyContext';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/company-admin/dashboard' },
    { name: 'Employees', icon: Users, path: '/company-admin/employees' },
    { name: 'Attendance', icon: CalendarCheck, path: '/company-admin/attendance' },
    { name: 'Leave Management', icon: CalendarOff, path: '/company-admin/leave' },
    { name: 'Payroll', icon: Wallet, path: '/company-admin/payroll' },
    { name: 'Performance', icon: Target, path: '/company-admin/performance' },
    { name: 'Documents', icon: Files, path: '/company-admin/documents' },
    { name: 'Exit Management', icon: LogOut, path: '/company-admin/exit' },
    { name: 'Reports', icon: FileBarChart, path: '/company-admin/reports' },
    { name: 'Settings', icon: Settings, path: '/company-admin/settings' },
];

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const { company } = useCompanyData();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r border-gray-100 bg-white transition-all duration-300 ease-in-out flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Brand */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
                <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "opacity-0 invisible w-0")}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                        {company.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900 truncate tracking-tight">{company.name}</span>
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 shrink-0"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                                collapsed && "justify-center px-0"
                            )
                        }
                        title={collapsed ? item.name : undefined}
                    >
                        <item.icon
                            size={20}
                            className={cn("shrink-0", collapsed ? "" : "text-gray-500 group-hover:text-gray-900", "group-[.active]:text-indigo-700")}
                        />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}
