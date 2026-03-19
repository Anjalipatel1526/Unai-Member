import React, { useState } from 'react';
import { CalendarHeart, CalendarOff, AlertCircle, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Avatar } from '../components/Avatar';
import { ProgressBar } from '../components/ProgressBar';
import { useCompanyData } from '../data/CompanyContext';

const policyCards = [
    { title: 'Casual Leave (CL)', used: 4, total: 12, icon: CalendarHeart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Sick Leave (SL)', used: 2, total: 8, icon: CalendarOff, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Loss of Pay (LOP)', used: 1, total: 'N/A', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export function LeaveManagement() {
    const { leaves, employees } = useCompanyData();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Leave Management</h2>
                    <p className="text-sm text-gray-500">Approve, reject, and manage employee leave requests.</p>
                </div>
                <button
                    onClick={() => setIsApplyModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                    <Plus size={16} />
                    Apply Leave
                </button>
            </div>

            {/* Leave Policy Indicators */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {policyCards.map((policy, i) => (
                    <Card key={i}>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${policy.bg}`}>
                                <policy.icon className={`h-6 w-6 ${policy.color}`} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500">{policy.title}</p>
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-2xl font-bold text-gray-900">{policy.used}</h3>
                                    <span className="text-sm font-medium text-gray-400">/ {policy.total}</span>
                                </div>
                                {typeof policy.total === 'number' && (
                                    <ProgressBar value={policy.used} max={policy.total} className="mt-2" color={`bg-${policy.color.split('-')[1]}-500`} />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="border-b border-gray-100 pb-4">
                    <CardTitle>Leave Requests</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Leave Type</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave: any) => {
                                const emp = employees.find((e: any) => e.id === leave.employee_id);
                                return (
                                    <TableRow key={leave.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={emp?.avatar} alt={emp?.name} className="h-8 w-8" />
                                                <span className="font-medium text-gray-900">{emp?.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={leave.leave_type === 'Sick Leave' ? 'warning' : 'info'}>
                                                {leave.leave_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-900">{leave.from_date}</span>
                                                <span className="text-gray-500 mx-1">to</span>
                                                <span className="font-medium text-gray-900">{leave.to_date}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-sm text-gray-600">
                                            {leave.reason}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                leave.status === 'Approved' ? 'success' :
                                                    leave.status === 'Pending' ? 'warning' : 'danger'
                                            }>
                                                {leave.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {leave.status === 'Pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors">
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                    <button className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-md text-xs font-medium hover:bg-rose-100 transition-colors">
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Resolved</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Modal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                title="Apply for Leave"
            >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsApplyModalOpen(false); }}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Leave Type</label>
                        <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                            <option>Casual Leave</option>
                            <option>Sick Leave</option>
                            <option>Loss of Pay</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">From Date</label>
                            <input type="date" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">To Date</label>
                            <input type="date" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" required />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Reason</label>
                        <textarea
                            rows={3}
                            placeholder="Please provide a valid reason..."
                            className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 resize-none"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsApplyModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
