import React from 'react';
import { CheckCircle2, XCircle, Forward, MessageSquare } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { mockLeaves } from '../../data/mockData';

export function LeaveRequests() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
                    <p className="text-gray-500 text-sm">Review and manage employee time-off applications.</p>
                </div>
            </div>

            <Card className="p-0 overflow-hidden">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Employee Name</TableHeader>
                            <TableHeader>Leave Type</TableHeader>
                            <TableHeader>Duration</TableHeader>
                            <TableHeader>Reason</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader className="text-right">Level 1 Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeaves.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell className="font-bold text-gray-900">{leave.employee_name}</TableCell>
                                <TableCell>
                                    <Badge variant="info">{leave.leave_type}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    <div className="font-medium text-gray-700">{leave.from_date}</div>
                                    <div className="text-xs text-gray-400">to {leave.to_date}</div>
                                </TableCell>
                                <TableCell className="max-w-xs truncate text-gray-500 italic" title={leave.reason}>
                                    "{leave.reason}"
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            leave.status === 'Approved' ? 'success' :
                                                leave.status === 'Pending' ? 'warning' : 'danger'
                                        }
                                    >
                                        {leave.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Level 1">
                                            <CheckCircle2 size={20} />
                                        </button>
                                        <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Reject">
                                            <XCircle size={20} />
                                        </button>
                                        <button className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" title="Forward to HR Manager">
                                            <Forward size={20} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
