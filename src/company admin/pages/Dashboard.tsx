import React from 'react';
import {
    Users,
    UserCheck,
    CalendarOff,
    Wallet,
    TrendingUp,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { useCompanyData } from '../data/CompanyContext';

export function Dashboard() {
    const { employees, attendance, leaves, isLoading } = useCompanyData();

    // Calculate KPIs
    const totalEmployees = employees.length;
    const today = new Date().toISOString().split('T')[0];
    const todayPresent = attendance.filter(a => a.date === today && (a.status === 'Present' || a.status === 'Late')).length;
    const pendingLeaveRequests = leaves.filter(l => l.status === 'Pending').length;
    const payrollProcessing = 5;

    const statCards = [
        {
            title: 'Total Employees',
            value: isLoading ? '...' : totalEmployees,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: '+12%',
        },
        {
            title: 'Today Present',
            value: isLoading ? '...' : todayPresent,
            icon: UserCheck,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: '+2%',
        },
        {
            title: 'Leave Requests',
            value: isLoading ? '...' : pendingLeaveRequests,
            icon: CalendarOff,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
        {
            title: 'Payroll Processing',
            value: isLoading ? '...' : payrollProcessing,
            icon: Wallet,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
                <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Card key={i} className="group cursor-pointer">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                    {stat.trend && (
                                        <span className="flex items-center text-sm font-medium text-emerald-600">
                                            <ArrowUpRight className="h-4 w-4" />
                                            {stat.trend}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content Area (Charts / Tables ) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="flex flex-col min-h-[400px]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Attendance Trend</CardTitle>
                            <TrendingUp className="h-5 w-5 text-gray-400" />
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center text-gray-400">
                            {/* Replace with Recharts in real implementation */}
                            <div className="text-center">
                                <TrendingUp className="h-10 w-10 mx-auto text-indigo-200 mb-2" />
                                <p>Chart Placeholder (Recharts)</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leaves.slice(0, 3).map((leave, i) => (
                                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                                            <Clock size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {employees.find(e => e.id === leave.employee_id)?.name || 'Employee'} applied for {leave.leave_type}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {leave.from_date} to {leave.to_date}
                                            </p>
                                        </div>
                                        <Badge variant={leave.status === 'Approved' ? 'success' : 'warning'}>
                                            {leave.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Space */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>New Joiners</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {employees.slice(0, 3).map((emp) => (
                                    <div key={emp.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={emp.avatar} alt={emp.name} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                                                <p className="text-xs text-gray-500">{emp.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium text-gray-400">{emp.joining_date}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
