import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../components/Card';
import { CompanyProvider } from '../data/CompanyContext';

export function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <CompanyProvider>
            <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex">
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />
                <div className={cn(
                    "flex flex-col min-w-0 flex-1 transition-all duration-300",
                    collapsed ? "sm:ml-20" : "sm:ml-64",
                    "ml-0" // Always 0 on absolute/fixed container but we need this for non-fixed parts
                )}>
                    <Header onOpenMobileMenu={() => setMobileOpen(true)} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                        <Outlet />
                    </main>
                </div>
            </div>
        </CompanyProvider>
    );
}
