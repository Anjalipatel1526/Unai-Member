import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { useCompanyData } from '../data/CompanyContext';

export function EmployeeProfile() {
    const { id } = useParams();
    const { employees, isLoading } = useCompanyData();
    const employee = employees.find((e: any) => e.id === id) || employees[0];

    if (isLoading || !employee) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Link
                    to="/company-admin/employees"
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Employee Profile</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Info Card */}
                <Card className="lg:col-span-1">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-centertext-center pt-4">
                            <Avatar src={employee.avatar} alt={employee.name} className="h-24 w-24 mb-4 ring-4 ring-indigo-50 mx-auto" />
                            <h3 className="text-xl font-bold text-gray-900 text-center">{employee.name}</h3>
                            <p className="text-sm font-medium text-indigo-600 mt-1 text-center">{employee.role}</p>
                            <div className="mt-2 text-center">
                                <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>{employee.status}</Badge>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail className="h-5 w-5 text-gray-400" />
                                {employee.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone className="h-5 w-5 text-gray-400" />
                                {employee.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                San Francisco, CA
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" /> Department
                                </span>
                                <span className="font-medium text-gray-900">{employee.department}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> Joining Date
                                </span>
                                <span className="font-medium text-gray-900">{employee.joining_date}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <Wallet className="h-4 w-4" /> Salary
                                </span>
                                <span className="font-medium text-gray-900">${employee.salary.toLocaleString()}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Summaries */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500 font-medium">Attendance Summary (This Month)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                    <span>Present: 20 days</span>
                                    <span>Absent: 2 days</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500 font-medium">Leave Balance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900 mb-2">12 <span className="text-sm font-normal text-gray-500">days left</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                    <span>Used: 8 days</span>
                                    <span>Total: 20 days</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payroll History Table Placeholder */}
                    <Card>
                        <CardHeader pb-4 border-b border-gray-100>
                            <CardTitle>Payroll History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-8 text-center text-gray-500 text-sm">
                                <Wallet className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                Payroll history details will appear here. No recent data available for this view yet.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
