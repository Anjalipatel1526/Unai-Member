import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../components/Card';
import { CompanyProvider } from '../data/CompanyContext';

export function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <CompanyProvider>
            <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className={cn("flex flex-col min-w-0 flex-1 transition-all duration-300", collapsed ? "sm:ml-20 ml-0" : "sm:ml-64 ml-0")}>
                    <Header />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                        <Outlet />
                    </main>
                </div>
            </div>
        </CompanyProvider>
    );
}
