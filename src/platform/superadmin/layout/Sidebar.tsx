import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import {
    Building2,
    LayoutDashboard,
    CreditCard,
    Receipt,
    Users,
    LifeBuoy,
    Activity,
    ToggleRight,
    ShieldAlert,
    Settings,
    ChevronLeft,
    ChevronRight,
    Blocks
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Clients', path: '/clients', icon: Building2 },
    { name: 'Subscription Plans', path: '/plans', icon: CreditCard },
    { name: 'Revenue & Billing', path: '/billing', icon: Receipt },
    { name: 'Support Tickets', path: '/support', icon: LifeBuoy },
    { name: 'System Monitoring', path: '/monitoring', icon: Activity },
    { name: 'Feature Control', path: '/features', icon: ToggleRight },
    { name: 'Roles & Permissions', path: '/roles', icon: ShieldAlert },
    { name: 'Platform Settings', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-30 flex flex-col transition-all duration-300 ease-in-out shadow-sm",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex items-center justify-between h-16 border-b border-gray-100 px-4">
                {!isCollapsed && (
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900 tracking-tight animate-in fade-in zoom-in-95 duration-200">
                        <Blocks className="w-6 h-6 text-primary-600" />
                        <span>Unai Member</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <Blocks className="w-7 h-7 text-primary-600" />
                    </div>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }: { isActive: boolean }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                            isActive
                                ? "bg-primary-50 text-primary-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            isCollapsed && "justify-center px-0"
                        )}
                        title={isCollapsed ? item.name : undefined}
                    >
                        <item.icon className={cn(
                            "shrink-0 transition-transform group-hover:scale-110",
                            isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        )} />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex w-full items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5 text-gray-500" />}
                    {!isCollapsed && <span className="ml-2 text-sm font-medium">Collapse</span>}
                </button>
            </div>
        </aside>
    );
};
