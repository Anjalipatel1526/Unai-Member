import React from 'react';
import {
    Users,
    UserCheck,
    CalendarOff,
    FileText,
    ArrowRight
} from 'lucide-react';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { Avatar } from '../components/Avatar';
import { useHRData } from '../hooks/useHRData';

export function Dashboard() {
    const { employees, attendance, leaves, documents, activities, loading } = useHRData();

    const kpis = [
        { title: 'Total Employees', value: employees.length.toString(), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Today Present', value: attendance.filter(a => a.status === 'Present').length.toString(), icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Pending Leaves', value: leaves.filter(l => l.status === 'Pending').length.toString(), icon: CalendarOff, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Docs Pending', value: documents.length.toString(), icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Assistant HR</h1>
                <p className="text-gray-500 text-sm mt-1">Here's what's happening in the organization today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {kpis.map((kpi) => (
                    <Card key={kpi.title} className="hover:border-indigo-100 group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
                                <kpi.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <Card title="Recent Activities" className="lg:col-span-2">
                    {activities.length > 0 ? (
                        <Timeline items={activities} />
                    ) : (
                        <div className="py-10 text-center text-gray-400">
                            <p>No recent activity found.</p>
                        </div>
                    )}
                </Card>

                <Card title="New Joiners" className="lg:col-span-1">
                    <div className="space-y-6">
                        {employees.length > 0 ? (
                            employees.slice(0, 5).map((emp) => (
                                <div key={emp.id} className="flex items-center justify-between group cursor-pointer" onClick={() => window.location.href = `/assistant-hr/employees/${emp.id}`}>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={emp.avatar} alt={emp.name} className="ring-2 ring-gray-100 group-hover:ring-indigo-200 transition-all" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                            <p className="text-xs text-gray-500">{emp.role}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-400">
                                <p>No new employees found.</p>
                            </div>
                        )}
                        <button
                            onClick={() => window.location.href = '/assistant-hr/employees'}
                            className="w-full py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                            View All Employees
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
