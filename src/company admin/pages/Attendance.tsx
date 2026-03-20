import React, { useState } from 'react';
import { Calendar, Clock, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { useCompanyData } from '../data/CompanyContext';
import { Avatar } from '../components/Avatar';

export function Attendance() {
    const { attendance, employees } = useCompanyData();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Attendance</h2>
                    <p className="text-sm text-gray-500">Track and manage employee attendance records.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
                        <Clock size={16} className="text-indigo-600" />
                        {currentTime}
                    </div>
                    <button
                        onClick={() => setIsCheckedIn(!isCheckedIn)}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold shadow-sm transition-colors ${isCheckedIn
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500'
                            }`}
                    >
                        {isCheckedIn ? 'Check Out' : 'Check In'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar View Placeholder */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Calendar View</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center p-6 border-2 border-dashed border-gray-100 rounded-xl">
                            <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500">Monthly Calendar Grid Component</p>
                        </div>
                        <div className="mt-6 space-y-3">
                            <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Today's Summary</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Present</span>
                                <span className="font-medium text-emerald-600">
                                    {attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && (a.status === 'Present' || a.status === 'Late')).length}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Absent</span>
                                <span className="font-medium text-rose-600">
                                    {attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'Absent').length}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Late</span>
                                <span className="font-medium text-amber-600">
                                    {attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && a.is_late).length}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Attendance Table */}
                <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                        <CardTitle>Attendance Records</CardTitle>
                        <div className="flex gap-2">
                            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Filter size={16} />
                                Filters
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Download size={16} />
                                Export
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Check Out</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendance.map((record: any) => {
                                    const emp = employees.find((e: any) => e.id === record.employee_id);
                                    return (
                                        <TableRow key={record.id}>
                                            <TableCell className="text-sm text-gray-500">{record.date}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={emp?.avatar} alt={emp?.name} className="h-8 w-8" />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{emp?.name}</div>
                                                        <div className="text-xs text-gray-500">{emp?.department}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-gray-900">{record.check_in}</TableCell>
                                            <TableCell className="font-medium text-gray-900">{record.check_out}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={record.status === 'Present' ? 'success' : 'danger'}>
                                                        {record.status}
                                                    </Badge>
                                                    {record.is_late && <Badge variant="warning">Late</Badge>}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
