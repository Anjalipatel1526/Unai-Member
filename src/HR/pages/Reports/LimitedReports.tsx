import React from 'react';
import { BarChart3, Download, FileSpreadsheet, FilePieChart } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

export function LimitedReports() {
    const reportCards = [
        {
            title: 'Attendance Report',
            description: 'Monthly summary of employee presence, late-comings and absences.',
            icon: FileSpreadsheet,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            title: 'Leave Report',
            description: 'Summary of all leave types, remaining balances per employee.',
            icon: FilePieChart,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-500 text-sm">Access and export organization metrics (Limited View).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportCards.map((report) => (
                    <Card key={report.title} className="hover:border-indigo-100 transform hover:-translate-y-1">
                        <div className="flex gap-6">
                            <div className={`p-4 rounded-2xl ${report.bg} ${report.color} h-fit`}>
                                <report.icon size={28} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {report.description}
                                </p>
                                <Button variant="primary" size="sm" icon={<Download size={16} />}>
                                    Export CSV
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-gray-50 border-dashed border-2 border-gray-200 shadow-none">
                <div className="p-8 text-center flex flex-col items-center">
                    <BarChart3 className="text-gray-300 mb-2" size={48} />
                    <p className="text-gray-500 font-medium">Additional reports (Financial, Performance) are restricted to HR Manager only.</p>
                </div>
            </Card>
        </div>
    );
}
