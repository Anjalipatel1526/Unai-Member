import React from 'react';
import { UserMinus, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Avatar } from '../components/Avatar';
import { useCompanyData } from '../data/CompanyContext';

export function ExitManagement() {
    const { exits } = useCompanyData();
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Exit Management</h2>
                    <p className="text-sm text-gray-500">Manage resignations, notice periods, and asset retrieval.</p>
                </div>
            </div>

            <Card>
                <CardHeader className="border-b border-gray-100 pb-4">
                    <CardTitle>Resignation Requests & Offboarding</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead className="w-1/4">Notice Period Progress</TableHead>
                                <TableHead>Asset Return</TableHead>
                                <TableHead>Final Settlement</TableHead>
                                <TableHead className="text-right">Checklist</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {exits.map((exit: any) => (
                                <TableRow key={exit.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={`https://ui-avatars.com/api/?name=${exit.employee_name.replace(' ', '+')}&background=random`} alt={exit.employee_name} className="h-8 w-8" />
                                            <div>
                                                <div className="font-medium text-gray-900">{exit.employee_name}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <UserMinus size={12} /> Resigned
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2 items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-900">{exit.notice_period_progress}% served</span>
                                        </div>
                                        <ProgressBar value={exit.notice_period_progress} color="bg-amber-500" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {exit.asset_return === 'Complete' ? (
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            ) : exit.asset_return === 'Partial' ? (
                                                <Circle size={16} className="text-amber-500 border-amber-500 border rounded-full bg-amber-50" />
                                            ) : (
                                                <Circle size={16} className="text-gray-300" />
                                            )}
                                            <span className="text-sm font-medium text-gray-700">{exit.asset_return}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={exit.settlement_status === 'Pending' ? 'warning' : 'success'}>
                                            {exit.settlement_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100 bg-white shadow-sm">
                                            View Checklist
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
