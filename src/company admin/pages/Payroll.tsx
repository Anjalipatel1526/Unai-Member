import React from 'react';
import { DollarSign, FileText, CheckCircle, Download, CreditCard, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { ProgressBar } from '../components/ProgressBar';
import { useCompanyData } from '../data/CompanyContext';

const summaryCards = [
    { title: 'Total Payout (Mar 2026)', value: '$845,200', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Pending Payslips', value: '12', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Processed Payroll', value: '133', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export function Payroll() {
    const { employees } = useCompanyData();
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Payroll</h2>
                    <p className="text-sm text-gray-500">Process salaries, generate payslips, and view summaries.</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Export CSV
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                        <CreditCard size={16} />
                        Process Payroll
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {summaryCards.map((card, i) => (
                    <Card key={i}>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.bg}`}>
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <CardTitle>Employee Payslips</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Net Salary</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Payslip</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.slice(0, 5).map((emp: any, i) => (
                                    <TableRow key={emp.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={emp.avatar} alt={emp.name} className="h-8 w-8" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{emp.name}</div>
                                                    <div className="text-xs text-gray-500">{emp.role}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900">${emp.salary.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={i === 0 ? 'warning' : 'success'}>
                                                {i === 0 ? 'Pending' : 'Processed'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {i === 0 ? (
                                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                                                    Generate
                                                </button>
                                            ) : (
                                                <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                                    <Download size={14} /> Download
                                                </button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-indigo-600" />
                            Salary Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Basic Pay</span>
                                <span className="font-medium text-gray-900">45%</span>
                            </div>
                            <ProgressBar value={45} color="bg-indigo-600" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Allowances (HRA, TA)</span>
                                <span className="font-medium text-gray-900">35%</span>
                            </div>
                            <ProgressBar value={35} color="bg-emerald-500" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Deductions (Tax, PF)</span>
                                <span className="font-medium text-gray-900">20%</span>
                            </div>
                            <ProgressBar value={20} color="bg-rose-500" />
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Average Net Salary</span>
                            <span className="text-lg font-bold text-indigo-700">$7,280</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
