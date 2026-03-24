import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './platform/superadmin/layout/MainLayout';
import { Dashboard } from './platform/superadmin/pages/Dashboard';
import { Clients } from './platform/superadmin/pages/Clients';

import { Billing } from './platform/superadmin/pages/Billing';
import { Support } from './platform/superadmin/pages/Support';
import { Monitoring } from './platform/superadmin/pages/Monitoring';
import { Features } from './platform/superadmin/pages/Features';
import { Roles } from './platform/superadmin/pages/Roles';
import { Settings } from './platform/superadmin/pages/Settings';
import { Login } from './platform/auth/Login';

import {
  AdminLayout,
  CompanyDashboard,
  CompanyEmployees,
  EmployeeProfile as CompanyEmployeeProfile,
  CompanyAttendance,
  LeaveManagement,
  CompanyPayroll,
  CompanyPerformance,
  CompanyDocuments,
  ExitManagement,
  CompanyReports,
  CompanySettings
} from './company admin';

import { HRRoutes } from './HR/routes/HRRoutes';
import CandidateOnboarding from './Candidate/CandidateOnboarding';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem('userAuth');
  if (!auth) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<CandidateOnboarding />} />
        <Route path="/client-portal" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center p-10"><h1 className="text-3xl font-bold text-gray-900">Client Portal (Coming Soon)</h1></div>} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="billing" element={<Billing />} />
          <Route path="support" element={<Support />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="features" element={<Features />} />
          <Route path="roles" element={<Roles />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* HR SaaS Company Admin Routes */}
        <Route path="/company-admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="employees" element={<CompanyEmployees />} />
          <Route path="employees/:id" element={<CompanyEmployeeProfile />} />
          <Route path="attendance" element={<CompanyAttendance />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="payroll" element={<CompanyPayroll />} />
          <Route path="performance" element={<CompanyPerformance />} />
          <Route path="documents" element={<CompanyDocuments />} />
          <Route path="exit" element={<ExitManagement />} />
          <Route path="reports" element={<CompanyReports />} />
          <Route path="settings" element={<CompanySettings />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Assistant HR Routes */}
        <Route path="/assistant-hr/*" element={<HRRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
