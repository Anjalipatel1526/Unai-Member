import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Download, Eye, Wallet, IndianRupee } from 'lucide-react';
import { payslips } from '../data/mockData';

export function Payslips() {
    const [selectedPayslip, setSelectedPayslip] = useState<typeof payslips[0] | null>(null);
    const latestPaid = payslips.find(p => p.status === 'Paid');
    const ytdEarnings = payslips.filter(p => p.status === 'Paid').reduce((s, p) => s + p.netSalary, 0);
    const ytdDeductions = payslips.filter(p => p.status === 'Paid').reduce((s, p) => s + p.deductions, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Payslips</h1>
                <p className="text-sm text-gray-500 mt-1">View and download your salary slips</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <IndianRupee size={22} className="text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Net Salary</p>
                            <p className="text-2xl font-extrabold text-gray-900">{latestPaid ? `₹${latestPaid.netSalary.toLocaleString()}` : '—'}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <Wallet size={22} className="text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">YTD Earnings</p>
                            <p className="text-2xl font-extrabold text-gray-900">{ytdEarnings ? `₹${ytdEarnings.toLocaleString()}` : '—'}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-50 rounded-xl">
                            <IndianRupee size={22} className="text-rose-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">YTD Deductions</p>
                            <p className="text-2xl font-extrabold text-gray-900">{ytdDeductions ? `₹${ytdDeductions.toLocaleString()}` : '—'}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Payslip Cards */}
            {payslips.length === 0 ? (
                <Card>
                    <div className="text-center py-8 text-gray-400">
                        <Wallet size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No payslips available</p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {payslips.map(slip => (
                        <Card key={slip.id} className="group cursor-pointer" onClick={() => setSelectedPayslip(slip)}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{slip.month}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{slip.date}</p>
                                </div>
                                <Badge variant={slip.status === 'Paid' ? 'success' : 'warning'}>{slip.status}</Badge>
                            </div>
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Net Salary</p>
                                <p className="text-2xl font-extrabold text-indigo-600 mt-1">₹{slip.netSalary.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    icon={<Eye size={14} />}
                                    onClick={(e) => { e.stopPropagation(); setSelectedPayslip(slip); }}
                                    className="flex-1"
                                >
                                    View
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    icon={<Download size={14} />}
                                    onClick={(e) => { e.stopPropagation(); alert('Download payslip: ' + slip.month); }}
                                    className="flex-1"
                                >
                                    Download
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Salary Breakdown Modal */}
            <Modal
                isOpen={!!selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
                title={`Salary Breakdown — ${selectedPayslip?.month}`}
                footer={
                    <Button variant="outline" icon={<Download size={16} />} onClick={() => alert('Downloading PDF...')}>
                        Download PDF
                    </Button>
                }
            >
                {selectedPayslip && (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Earnings</h4>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Basic Pay</span>
                                <span className="text-sm font-bold text-gray-900">₹{selectedPayslip.basic.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">HRA</span>
                                <span className="text-sm font-bold text-gray-900">₹{(selectedPayslip.allowances * 0.45).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Transport Allowance</span>
                                <span className="text-sm font-bold text-gray-900">₹{(selectedPayslip.allowances * 0.3).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Special Allowance</span>
                                <span className="text-sm font-bold text-gray-900">₹{(selectedPayslip.allowances * 0.25).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deductions</h4>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">PF Contribution</span>
                                <span className="text-sm font-bold text-rose-600">-₹{(selectedPayslip.deductions * 0.5).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Professional Tax</span>
                                <span className="text-sm font-bold text-rose-600">-₹{(selectedPayslip.deductions * 0.15).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Income Tax (TDS)</span>
                                <span className="text-sm font-bold text-rose-600">-₹{(selectedPayslip.deductions * 0.35).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t-2 border-indigo-100">
                            <span className="text-base font-bold text-gray-900">Net Salary</span>
                            <span className="text-xl font-extrabold text-indigo-600">₹{selectedPayslip.netSalary.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
