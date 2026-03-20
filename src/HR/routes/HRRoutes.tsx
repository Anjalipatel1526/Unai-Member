import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { EmployeeList } from '../pages/Employees/EmployeeList';
import { EmployeeProfileDetail } from '../pages/Employees/EmployeeProfileDetail';
import { AttendanceList } from '../pages/Attendance/AttendanceList';
import { LeaveRequests } from '../pages/Leave/LeaveRequests';
import { DocumentGrid } from '../pages/Documents/DocumentGrid';
import { LimitedReports } from '../pages/Reports/LimitedReports';
import { AssistantProfile } from '../pages/Profile/AssistantProfile';

export function HRRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:id" element={<EmployeeProfileDetail />} />
                <Route path="attendance" element={<AttendanceList />} />
                <Route path="leave" element={<LeaveRequests />} />
                <Route path="documents" element={<DocumentGrid />} />
                <Route path="reports" element={<LimitedReports />} />
                <Route path="profile" element={<AssistantProfile />} />
            </Route>
        </Routes>
    );
}
