import { Search, Filter, Calendar } from 'lucide-react';
import { Card } from '../../components/Card';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { useHRData } from '../../hooks/useHRData';
import React, { useState, useMemo } from 'react';

export function AttendanceList() {
    const { attendance, loading } = useHRData();
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [selectedDate, setSelectedDate] = useState('');

    const filteredAttendance = useMemo(() => {
        return attendance.filter(record => {
            const deptMatch = selectedDept === 'All Departments' ||
                record.department?.trim().toLowerCase() === selectedDept.trim().toLowerCase();
            const dateMatch = !selectedDate || record.date === selectedDate;
            return deptMatch && dateMatch;
        });
    }, [attendance, selectedDept, selectedDate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
                    <p className="text-gray-500 text-sm">Monitor daily check-ins and employee presence.</p>
                </div>
            </div>

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

            <Card className="p-0 overflow-hidden">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Date</TableHeader>
                            <TableHeader>Employee</TableHeader>
                            <TableHeader>Department</TableHeader>
                            <TableHeader>Check In</TableHeader>
                            <TableHeader>Check Out</TableHeader>
                            <TableHeader>Working Hours</TableHeader>
                            <TableHeader>Status</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAttendance.length > 0 ? (
                            filteredAttendance.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium text-gray-500">{record.displayDate || record.date}</TableCell>
                                    <TableCell className="font-bold text-gray-900">{record.employee_name}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">{record.department}</TableCell>
                                    <TableCell className="text-indigo-600 font-medium">{record.check_in}</TableCell>
                                    <TableCell className="text-indigo-600 font-medium">{record.check_out || '—'}</TableCell>
                                    <TableCell className="font-semibold text-gray-700">{record.working_hours ? `${record.working_hours}h` : '—'}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                record.status === 'Present' ? 'success' :
                                                    record.status === 'Late' ? 'warning' : 'danger'
                                            }
                                        >
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-gray-400">
                                    No attendance records found for the selected filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
