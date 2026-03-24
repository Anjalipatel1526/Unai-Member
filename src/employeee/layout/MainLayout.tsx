import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50/50 w-full overflow-x-hidden">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                <Header />
                <main className="flex-1 p-4 md:p-6 animate-in fade-in duration-500 w-full max-w-none">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
