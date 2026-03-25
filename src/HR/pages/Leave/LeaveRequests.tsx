import { CheckCircle2, XCircle, Forward, Loader2 } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { Modal } from '../../components/Modal';
import { useHRData } from '../../hooks/useHRData';
import { supabase } from '../../../lib/supabase';
import React, { useState } from 'react';

export function LeaveRequests() {
    const { leaves, loading, refreshData } = useHRData();
    const [actionId, setActionId] = useState<string | null>(null);

    // Notification state
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ title: '', message: '', type: 'success' });

    const handleLeaveAction = async (id: string, newStatus: string) => {
        setActionId(id);
        try {
            const { error } = await supabase
                .from('company_leaves')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            await refreshData();

            setModalData({
                title: 'Status Updated',
                message: `Leave request has been successfully marked as ${newStatus}.`,
                type: 'success'
            });
            setShowModal(true);
        } catch (err: any) {
            console.error('Error updating leave status:', err);
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
                        {leaves.length > 0 ? (
                            leaves.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell className="font-bold text-gray-900">{leave.employee_name}</TableCell>
                                    <TableCell>
                                        <Badge variant="info">{leave.leave_type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <div className="font-medium text-gray-700">{leave.from_date}</div>
                                        <div className="text-xs text-gray-400">to {leave.to_date}</div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate text-gray-500 italic" title={leave.reason}>
                                        "{leave.reason}"
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                leave.status === 'Approved' ? 'success' :
                                                    leave.status === 'Pending' ? 'warning' :
                                                        leave.status === 'Forwarded' ? 'info' : 'danger'
                                            }
                                        >
                                            {leave.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {leave.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleLeaveAction(leave.id, 'Approved')}
                                                        disabled={actionId === leave.id}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle2 size={20} className={actionId === leave.id ? 'animate-pulse' : ''} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleLeaveAction(leave.id, 'Rejected')}
                                                        disabled={actionId === leave.id}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={20} className={actionId === leave.id ? 'animate-pulse' : ''} />
                                                    </button>
                                                </>
                                            )}
                                            {leave.status === 'Approved' && (
                                                <button
                                                    onClick={() => handleLeaveAction(leave.id, 'Forwarded')}
                                                    disabled={actionId === leave.id}
                                                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Forward to HR Manager"
                                                >
                                                    <Forward size={20} className={actionId === leave.id ? 'animate-pulse' : ''} />
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                                    No leave requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalData.title}
                footer={
                    <Button onClick={() => setShowModal(false)} className="w-full sm:w-auto">
                        OK
                    </Button>
                }
            >
                <div className="flex flex-col items-center text-center py-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modalData.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {modalData.type === 'success' ? <CheckCircle2 size={32} /> : <div className="text-2xl font-bold">!</div>}
                    </div>
                    <p className="text-gray-600">{modalData.message}</p>
                </div>
            </Modal>
        </div>
    );
}
