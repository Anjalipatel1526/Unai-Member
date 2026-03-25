import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../components/Table';
import { Modal } from '../components/Modal';
import { leaveBalances } from '../data/mockData';
import { supabase } from '../../lib/supabase';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

const leaveStatusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
    Approved: 'success',
    Pending: 'warning',
    Rejected: 'danger',
    Forwarded: 'info'
};

const leaveTypeVariant: Record<string, 'primary' | 'info' | 'success'> = {
    'Casual Leave': 'primary',
    'Sick Leave': 'info',
    'Paid Leave': 'success',
};

// Get auth data from localStorage
function getAuth() {
    try {
        const auth = localStorage.getItem('userAuth');
        if (auth) return JSON.parse(auth);
    } catch { }
    return null;
}

export function LeaveRequests() {
    const [type, setType] = useState('Casual Leave');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Notification Modal State
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ title: '', message: '', type: 'success' });

    const auth = getAuth();

    const fetchHistory = async () => {
        if (!auth) return;
        const { data } = await supabase
            .from('company_leaves')
            .select('*')
            .eq('employee_id', auth.employeeId)
            .order('created_at', { ascending: false });

        if (data) setHistory(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchHistory();
        const channel = supabase.channel('leave_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'company_leaves' }, () => {
                fetchHistory();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const calculateDays = (start: string, end: string) => {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diff = d2.getTime() - d1.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setSubmitting(true);

        const days = calculateDays(fromDate, toDate);

        const { error } = await supabase.from('company_leaves').insert({
            company_id: auth.companyId || 'COMP_001',
            employee_id: auth.employeeId,
            employee_name: auth.employeeName,
            leave_type: type,
            from_date: fromDate,
            to_date: toDate,
            reason: reason,
            days: days,
            status: 'Pending'
        });

        if (error) {
            setModalData({
                title: 'Error Submitting Request',
                message: error.message,
                type: 'error'
            });
            setShowModal(true);
        } else {
            setModalData({
                title: 'Success!',
                message: `Leave applied: ${type} from ${fromDate} to ${toDate}\nReason: ${reason}`,
                type: 'success'
            });
            setShowModal(true);
            setFromDate('');
            setToDate('');
            setReason('');
            fetchHistory();
        }
        setSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
                <p className="text-sm text-gray-500 mt-1">Apply for leave and track your requests</p>
            </div>

            {/* Leave Balance */}
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
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Paid Leave">Paid Leave</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                        <Button type="submit" className="w-full" disabled={submitting} icon={submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}>
                            {submitting ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </form>
                </Card>

                {/* Leave History */}
                <div className="lg:col-span-2">
                    <Card title="Leave History">
                        {loading ? (
                            <div className="py-20 text-center text-gray-400">Loading history...</div>
                        ) : history.length > 0 ? (
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
                                    {history.map(leave => (
                                        <TableRow key={leave.id}>
                                            <TableCell>
                                                <Badge variant={leaveTypeVariant[leave.leave_type] || 'default'}>{leave.leave_type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-medium text-gray-600">{leave.from_date} — {leave.to_date}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold text-gray-900">{leave.days}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs text-gray-500 max-w-[150px] truncate block" title={leave.reason}>{leave.reason}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={leaveStatusVariant[leave.status] || 'default'}>{leave.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-20 text-center text-gray-400">
                                <p className="text-sm">No leave history found</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Success/Error Modal */}
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
                    <p className="text-gray-600 whitespace-pre-wrap">{modalData.message}</p>
                </div>
            </Modal>
        </div>
    );
}
