import React from 'react';
import { Download, Filter, Calendar as CalendarIcon, FileSpreadsheet, FileBarChart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';

const reportTypes = [
    { id: 'attendance', title: 'Attendance Report', icon: CalendarIcon, desc: 'Daily, monthly attendance records with late check-ins.' },
    { id: 'leave', title: 'Leave Report', icon: FileSpreadsheet, desc: 'Used leaves, balances, and request history.' },
    { id: 'payroll', title: 'Payroll Report', icon: FileBarChart, desc: 'Salary payouts, deductions, and tax summaries.' },
    { id: 'employee', title: 'Employee Roster', icon: Users, desc: 'Active, inactive employees and role distribution.' },
];

export function Reports() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Reports Hub</h2>
                <p className="text-sm text-gray-500">Generate, filter, and export company data analytics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <Card className="lg:col-span-1 h-fit sticky top-24">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Date Range</label>
                            <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Last 3 Months</option>
                                <option>This Year</option>
                                <option>Custom Range</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>HR</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-2 py-1 transition-colors">Reset</button>
                            <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                Apply
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reportTypes.map((report) => (
                        <Card key={report.id} className="group hover:border-indigo-200 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                                        <report.icon size={24} />
                                    </div>
                                    <Badge variant="info">Ready</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{report.title}</h3>
                                <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                                    {report.desc}
                                </p>
                                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                                    <button className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                                        <Download size={16} />
                                        Download CSV
                                    </button>
                                    <button className="inline-flex justify-center items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                                        Preview
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
