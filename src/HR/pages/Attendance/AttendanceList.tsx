import { Search, Filter, Calendar } from 'lucide-react';
import { Card } from '../../components/Card';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { useHRData } from '../../hooks/useHRData';

export function AttendanceList() {
    const { attendance, loading } = useHRData();

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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 border-indigo-100 bg-indigo-50/20">
                    <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Calendar size={18} /> Attendance Filters
                    </h4>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</label>
                            <select className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-white">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>HR</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
                            <input type="date" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-white" />
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-3 p-0 overflow-hidden">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Employee</TableHeader>
                                <TableHeader>Check In</TableHeader>
                                <TableHeader>Check Out</TableHeader>
                                <TableHeader>Status</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendance.length > 0 ? (
                                attendance.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell className="font-medium text-gray-500">{record.date}</TableCell>
                                        <TableCell className="font-bold text-gray-900">{record.employee_name}</TableCell>
                                        <TableCell className="text-indigo-600 font-medium">{record.check_in}</TableCell>
                                        <TableCell className="text-indigo-600 font-medium">{record.check_out}</TableCell>
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
        </div>
    );
}
