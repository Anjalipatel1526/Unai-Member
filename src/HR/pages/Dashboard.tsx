import React from 'react';
import {
    Users,
    UserCheck,
    CalendarOff,
    FileText,
    TrendingUp,
    ArrowRight
} from 'lucide-react';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { mockEmployees, mockActivities } from '../data/mockData';

export function Dashboard() {
    const kpis = [
        { title: 'Total Employees', value: '1,280', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Today Present', value: '1,150', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Pending Leaves', value: '12', icon: CalendarOff, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Docs Pending', value: '8', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Assistant HR</h1>
                <p className="text-gray-500 text-sm mt-1">Here's what's happening in the organization today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title="Recent Activities" className="lg:col-span-2">
                    <Timeline items={mockActivities} />
                </Card>

                <Card title="New Joiners" className="lg:col-span-1">
                    <div className="space-y-6">
                        {mockEmployees.slice(0, 3).map((emp) => (
                            <div key={emp.id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <Avatar src={emp.avatar} alt={emp.name} className="ring-2 ring-gray-100 group-hover:ring-indigo-200 transition-all" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                        <p className="text-xs text-gray-500">{emp.role}</p>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                        ))}
                        <button className="w-full py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                            View All Employees
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
