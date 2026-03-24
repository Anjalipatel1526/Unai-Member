import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../components/Table';
import { CalendarPlus, Send } from 'lucide-react';
import { leaveBalances, leaveHistory } from '../data/mockData';

const leaveStatusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
    Approved: 'success',
    Pending: 'warning',
    Rejected: 'danger',
};

const leaveTypeVariant: Record<string, 'primary' | 'info' | 'success'> = {
    Casual: 'primary',
    Sick: 'info',
    Paid: 'success',
};

export function LeaveRequests() {
    const [type, setType] = useState('Casual');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Leave applied: ${type} from ${fromDate} to ${toDate}\nReason: ${reason}`);
        setFromDate('');
        setToDate('');
        setReason('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
                <p className="text-sm text-gray-500 mt-1">Apply for leave and track your requests</p>
            </div>

            {/* Leave Balance */}
            {leaveBalances.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {leaveBalances.map(leave => (
                        <Card key={leave.type}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-700">{leave.type}</p>
                                <Badge variant={leave.remaining > leave.total * 0.5 ? 'success' : leave.remaining > leave.total * 0.25 ? 'warning' : 'danger'}>
                                    {leave.remaining} left
                                </Badge>
                            </div>
                            <ProgressBar
                                value={leave.used}
                                max={leave.total}
                                showValue={false}
                                color={leave.remaining > leave.total * 0.5 ? 'emerald' : leave.remaining > leave.total * 0.25 ? 'amber' : 'rose'}
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>Used: {leave.used}</span>
                                <span>Total: {leave.total}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <div className="text-center py-4 text-gray-400">
                        <p className="text-sm">No leave balance data available</p>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Apply Leave Form */}
                <Card title="Apply Leave" className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Leave Type</label>
                            <select
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                            >
                                <option value="Casual">Casual Leave</option>
                                <option value="Sick">Sick Leave</option>
                                <option value="Paid">Paid Leave</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={e => setFromDate(e.target.value)}
                                required
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={e => setToDate(e.target.value)}
                                required
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Reason</label>
                            <textarea
                                value={reason}
                                onChange={e => setReason(e.target.value)}
                                required
                                rows={3}
                                placeholder="Describe the reason for your leave..."
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            />
                        </div>
                        <Button type="submit" className="w-full" icon={<Send size={16} />}>
                            Submit Request
                        </Button>
                    </form>
                </Card>

                {/* Leave History */}
                <div className="lg:col-span-2">
                    <Card title="Leave History">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Type</TableHeader>
                                    <TableHeader>Date Range</TableHeader>
                                    <TableHeader>Days</TableHeader>
                                    <TableHeader>Reason</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaveHistory.map(leave => (
                                    <TableRow key={leave.id}>
                                        <TableCell>
                                            <Badge variant={leaveTypeVariant[leave.type] || 'default'}>{leave.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs">{leave.from} — {leave.to}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-bold">{leave.days}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-gray-500 max-w-[150px] truncate block">{leave.reason}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={leaveStatusVariant[leave.status]}>{leave.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
