import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { Attendance } from '../pages/Attendance';
import { LeaveRequests } from '../pages/LeaveRequests';
import { Performance } from '../pages/Performance';
import { Payslips } from '../pages/Payslips';
import { Documents } from '../pages/Documents';
import { Profile } from '../pages/Profile';
import { Settings } from '../pages/Settings';

function EmployeeAuthGuard({ children }: { children: React.ReactNode }) {
    const auth = localStorage.getItem('userAuth');
    if (!auth) return <Navigate to="/login" replace />;

    try {
        const parsed = JSON.parse(auth);
        if (parsed.role !== 'employee') return <Navigate to="/login" replace />;
    } catch {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export function EmployeeRoutes() {
    return (
        <EmployeeAuthGuard>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="leave" element={<LeaveRequests />} />
                    <Route path="performance" element={<Performance />} />
                    <Route path="payslips" element={<Payslips />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </EmployeeAuthGuard>
    );
}
