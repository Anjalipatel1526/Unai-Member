import React from 'react';
import { Card, Badge, Button } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { billingData, kpiStats } from '../data/mockData';
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, Send } from 'lucide-react';

export const Billing = () => {
    const cards = [
        { title: 'Total Revenue (YTD)', value: '$' + (kpiStats.monthlyRevenue * 12).toLocaleString(), icon: DollarSign, trend: '+24.5%', positive: true },
        { title: 'Monthly Recurring', value: '$' + kpiStats.monthlyRevenue.toLocaleString(), icon: ArrowUpRight, trend: '+12.4%', positive: true },
        { title: 'Failed Payments', value: '$' + (kpiStats.pendingPayments * 299).toLocaleString(), icon: ArrowDownRight, trend: '-2.1%', positive: false },
    ];

    const columns = [
        { header: 'Invoice ID', accessor: (row: any) => <span className="font-medium text-gray-900">{row.id}</span> },
        { header: 'Company', accessor: 'company' },
        { header: 'Amount', accessor: (row: any) => <span className="font-semibold">${row.amount.toLocaleString()}</span> },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge status={row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'warning' : 'danger'}>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Due Date', accessor: 'dueDate' },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon={Download} title="Download PDF" className="p-1 h-8 w-8" />
                    {row.status !== 'Paid' && (
                        <Button variant="ghost" size="sm" icon={Send} title="Send Reminder" className="p-1 h-8 w-8 text-primary-600" />
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Revenue & Billing</h1>
                <p className="text-sm text-gray-500 mt-1">Manage platform revenue, MRR, and client invoices.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <Card key={idx} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 rounded-lg bg-primary-50 text-primary-600">
                                <card.icon className="w-6 h-6" />
                            </div>
                            <Badge status={card.positive ? 'success' : 'danger'}>{card.trend}</Badge>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
                    <select className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500">
                        <option>All Statuses</option>
                        <option>Paid</option>
                        <option>Overdue</option>
                        <option>Failed</option>
                    </select>
                </div>
                <DataTable data={billingData} columns={columns} />
            </Card>
        </div>
    );
};
