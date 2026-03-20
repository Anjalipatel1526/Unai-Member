import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    FileClock,
    FolderKanban,
    BarChart3,
    UserCircle,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/assistant-hr/dashboard' },
    { name: 'Employees', icon: Users, path: '/assistant-hr/employees' },
    { name: 'Attendance', icon: CalendarCheck, path: '/assistant-hr/attendance' },
    { name: 'Leave Requests', icon: FileClock, path: '/assistant-hr/leave' },
    { name: 'Documents', icon: FolderKanban, path: '/assistant-hr/documents' },
    { name: 'Reports', icon: BarChart3, path: '/assistant-hr/reports' },
    { name: 'Profile', icon: UserCircle, path: '/assistant-hr/profile' },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userAuth');
        navigate('/login');
    };

    return (
        <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-50">
                {!collapsed && <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">UNAI Tech</span>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                        `}
                    >
                        <item.icon size={22} className={collapsed ? 'mx-auto' : ''} />
                        {!collapsed && <span className="font-medium">{item.name}</span>}
                        {!collapsed && (
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="absolute bottom-4 left-0 w-full px-4">
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={22} />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
