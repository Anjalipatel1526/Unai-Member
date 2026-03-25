import React, { useState } from 'react';
import { Calendar, Clock, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { useCompanyData } from '../data/CompanyContext';
import { Avatar } from '../components/Avatar';

export function Attendance() {
    const { attendance, employees } = useCompanyData();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [selectedDate, setSelectedDate] = useState('');

    const filteredAttendance = React.useMemo(() => {
        return attendance.filter(record => {
            const emp = employees.find(e => e.id === record.employee_id) || employees.find(e => e.name === record.employee_name);
            const dept = record.department || emp?.department || 'N/A';
            const deptMatch = selectedDept === 'All Departments' || dept.trim().toLowerCase() === selectedDept.trim().toLowerCase();
            const dateMatch = !selectedDate || record.date === selectedDate;
            return deptMatch && dateMatch;
        });
    }, [attendance, employees, selectedDept, selectedDate]);

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
                </div>
            </div>

            {/* Top Filter Bar */}
            <Card className="border-indigo-100 bg-indigo-50/20 p-4">
                <div className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-1 space-y-1.5 w-full">
                        <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                            <Filter size={14} /> Department
                        </label>
                        <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2.5 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-white"
                        >
                            <option>All Departments</option>
                            <option>Developer</option>
                            <option>Full Stack Developer</option>
                            <option>Frontend</option>
                            <option>Backend</option>
                            <option>UI/UX Design</option>
                            <option>Automation Testing</option>
                            <option>Manual Testing</option>
                            <option>Marketing</option>
                            <option>HR</option>
                            <option>Sales</option>
                            <option>Finance</option>
                        </select>
                    </div>
                    <div className="flex-1 space-y-1.5 w-full">
                        <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                            <Calendar size={14} /> Date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2.5 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-white"
                        />
                    </div>
                    <div className="flex-[0.5] w-full">
                        <button
                            onClick={() => { setSelectedDept('All Departments'); setSelectedDate(''); }}
                            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-100 rounded-xl text-sm font-bold transition-colors shadow-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </Card>

            {/* Attendance Table */}
            <Card className="p-0 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Check In</TableHead>
                            <TableHead>Check Out</TableHead>
                            <TableHead>Working Hours</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAttendance.map((record: any) => {
                            const emp = employees.find((e: any) => e.id === record.employee_id) || employees.find((e: any) => e.name === record.employee_name);
                            const displayName = record.employee_name || emp?.name || 'Unknown';
                            const displayDept = emp?.department || record.department || 'N/A';

                            let displayDate = record.date;
                            if (record.date && record.date.includes('-')) {
                                const [y, m, d] = record.date.split('-');
                                displayDate = `${d}/${m}/${y.substring(2)}`;
                            }

                            return (
                                <TableRow key={record.id}>
                                    <TableCell className="text-xs text-gray-500 font-medium">{displayDate}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Avatar src={emp?.avatar} alt={displayName} className="h-8 w-8" />
                                            <div className="font-bold text-gray-900">{displayName}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">{displayDept}</TableCell>
                                    <TableCell className="font-medium text-gray-900 text-sm whitespace-nowrap">{record.check_in}</TableCell>
                                    <TableCell className="font-medium text-gray-900 text-sm whitespace-nowrap">{record.check_out || '—'}</TableCell>
                                    <TableCell className="font-semibold text-gray-700 text-sm">{record.working_hours ? `${record.working_hours}h` : '—'}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 scale-90 origin-left">
                                            <Badge variant={record.status === 'Present' ? 'success' : record.status === 'Half Day' ? 'info' : 'danger'}>
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
            </Card>
        </div>
    );
}
