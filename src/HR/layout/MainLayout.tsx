import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`transition-all duration-300 ${collapsed ? 'pl-20' : 'pl-64'}`}>
                <Header />
                <main className="p-6 md:p-8 animate-in fade-in duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
