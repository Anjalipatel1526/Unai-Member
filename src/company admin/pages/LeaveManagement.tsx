import React, { useState } from 'react';
import { CalendarHeart, CalendarOff, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Avatar } from '../components/Avatar';
import { ProgressBar } from '../components/ProgressBar';
import { useCompanyData } from '../data/CompanyContext';
import { supabase } from '../../lib/supabase';

const policyCards = [
    { title: 'Casual Leave (CL)', used: 0, total: 12, icon: CalendarHeart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Sick Leave (SL)', used: 0, total: 8, icon: CalendarOff, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Loss of Pay (LOP)', used: 0, total: 'N/A', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
];

import { AlertCircle } from 'lucide-react';

export function LeaveManagement() {
    const { leaves, employees } = useCompanyData();
    const [actionId, setActionId] = useState<string | null>(null);

    // Notification state
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ title: '', message: '', type: 'success' });

    const handleAction = async (id: string, status: string) => {
        setActionId(id);
        try {
            const { error } = await supabase
                .from('company_leaves')
                .update({ status })
                .eq('id', id);
            if (error) throw error;

            setModalData({
                title: 'Status Updated',
                message: `Leave request has been successfully marked as ${status}.`,
                type: 'success'
            });
            setShowModal(true);
        } catch (err: any) {
            console.error('Error updating leave:', err);
            setModalData({
                title: 'Update Failed',
                message: err.message,
                type: 'error'
            });
            setShowModal(true);
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Leave Management</h2>
                    <p className="text-sm text-gray-500">Approve, reject, and manage employee leave requests.</p>
                </div>
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
                            {leaves.length > 0 ? (
                                leaves.map((leave: any) => {
                                    const emp = employees.find((e: any) => e.id === leave.employee_id) || employees.find((e: any) => e.name === leave.employee_name);
                                    const displayName = leave.employee_name || emp?.name || 'Unknown';

                                    return (
                                        <TableRow key={leave.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={emp?.avatar} alt={displayName} className="h-8 w-8" />
                                                    <span className="font-bold text-gray-900 tracking-tight">{displayName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="info">
                                                    {leave.leave_type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs">
                                                    <div className="font-medium text-gray-900">{leave.from_date}</div>
                                                    <div className="text-gray-400">to {leave.to_date}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[180px] truncate text-xs text-gray-600 italic leading-relaxed" title={leave.reason}>
                                                "{leave.reason}"
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    leave.status === 'Approved' ? 'success' :
                                                        leave.status === 'Pending' ? 'warning' :
                                                            leave.status === 'Forwarded' ? 'info' : 'danger'
                                                }>
                                                    {leave.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {(leave.status === 'Pending' || leave.status === 'Forwarded') && (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(leave.id, 'Approved')}
                                                                disabled={actionId === leave.id}
                                                                className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                            >
                                                                <CheckCircle size={14} /> Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(leave.id, 'Rejected')}
                                                                disabled={actionId === leave.id}
                                                                className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors disabled:opacity-50"
                                                            >
                                                                <XCircle size={14} /> Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {leave.status === 'Approved' && (
                                                        <span className="text-xs bg-gray-50 text-gray-400 px-2 py-1 rounded-md font-medium">Finalized</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-gray-400 text-sm italic">
                                        No leave requests pending.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Notification Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalData.title}
            >
                <div className="flex flex-col items-center text-center py-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modalData.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {modalData.type === 'success' ? <CheckCircle size={32} /> : <div className="text-2xl font-bold">!</div>}
                    </div>
                    <p className="text-gray-600">{modalData.message}</p>
                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </div>
    );
}
