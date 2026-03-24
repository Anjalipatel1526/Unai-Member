import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Calendar } from '../components/Calendar';
import { Tabs } from '../components/Tabs';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../components/Table';
import { LogIn, LogOut, Clock, CalendarCheck } from 'lucide-react';
import { attendanceRecords, calendarAttendance } from '../data/mockData';

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
    Present: 'success',
    Absent: 'danger',
    Late: 'warning',
    'Half Day': 'info',
    Weekend: 'default',
};

export function Attendance() {
    const [tab, setTab] = useState('Calendar');
    const [checkedIn, setCheckedIn] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your daily attendance and working hours</p>
                </div>
                <div className="flex gap-3">
                    {!checkedIn ? (
                        <Button
                            icon={<LogIn size={16} />}
                            onClick={() => {
                                setCheckedIn(true);
                                alert('Checked in at ' + new Date().toLocaleTimeString());
                            }}
                        >
                            Check In
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            icon={<LogOut size={16} />}
                            onClick={() => {
                                setCheckedIn(false);
                                alert('Checked out at ' + new Date().toLocaleTimeString());
                            }}
                        >
                            Check Out
                        </Button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-emerald-600">—</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Present Days</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-rose-600">—</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Absent Days</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-amber-600">—</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Late Arrivals</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-sky-600">—</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Half Days</p>
                    </div>
                </Card>
            </div>

            {/* Today Status */}
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <Clock size={22} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Today</p>
                            <p className="text-xs text-gray-500 mt-0.5">No attendance data yet</p>
                        </div>
                    </div>
                    <Badge variant="default">—</Badge>
                </div>
            </Card>

            {/* Tabs */}
            <Tabs tabs={['Calendar', 'Table']} activeTab={tab} onChange={setTab} className="w-fit" />

            {tab === 'Calendar' ? (
                <Card>
                    <Calendar year={new Date().getFullYear()} month={new Date().getMonth()} attendance={calendarAttendance} />
                </Card>
            ) : (
                <Card title="Attendance Records">
                    {attendanceRecords.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Date</TableHeader>
                                    <TableHeader>Check In</TableHeader>
                                    <TableHeader>Check Out</TableHeader>
                                    <TableHeader>Working Hours</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceRecords.map((record, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell><span className="font-medium">{record.date}</span></TableCell>
                                        <TableCell>{record.checkIn}</TableCell>
                                        <TableCell>{record.checkOut}</TableCell>
                                        <TableCell><span className="font-semibold">{record.hours}</span></TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[record.status] || 'default'}>{record.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <CalendarCheck size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No attendance records available</p>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
