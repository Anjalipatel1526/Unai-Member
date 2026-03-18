import React from 'react';
import { Card, Badge, Button } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { supportTickets } from '../data/mockData';
import { MessageSquare, LayoutTemplate, Clock, AlertCircle } from 'lucide-react';

export const Support = () => {
    const metaCards = [
        { title: 'Open Tickets', value: '0', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Avg. Resolution Time', value: '0h', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Escalated Issues', value: '0', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    const columns = [
        { header: 'Ticket ID', accessor: (row: any) => <span className="font-medium text-gray-900">{row.id}</span> },
        {
            header: 'Company / Subject', accessor: (row: any) => (
                <div>
                    <p className="font-semibold text-gray-900">{row.subject}</p>
                    <p className="text-xs text-gray-500">{row.company}</p>
                </div>
            )
        },
        {
            header: 'Priority',
            accessor: (row: any) => (
                <Badge status={row.priority === 'Critical' ? 'danger' : row.priority === 'High' ? 'warning' : 'neutral'}>
                    {row.priority}
                </Badge>
            )
        },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge status={row.status === 'Resolved' ? 'success' : row.status === 'Open' ? 'primary' : 'neutral'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Assignee', accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-[10px] font-bold flex items-center justify-center">
                        {row.admin[0]}
                    </div>
                    <span className="text-sm font-medium">{row.admin}</span>
                </div>
            )
        },
        { header: 'Last Updated', accessor: 'lastUpdated' },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <Button variant="secondary" size="sm" icon={MessageSquare}>View Chat</Button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Support Tickets</h1>
                    <p className="text-sm text-gray-500 mt-1">Resolve platform issues for client admins.</p>
                </div>
                <Button variant="primary" icon={LayoutTemplate}>Ticket Templates</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metaCards.map((card, i) => (
                    <Card key={i} className="p-6 flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
                            <card.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center sm:flex-row flex-col gap-4">
                    <div className="flex gap-4 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        <button className="text-sm font-medium text-primary-600 border-b-2 border-primary-600 pb-1 whitespace-nowrap">All Tickets</button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1 whitespace-nowrap">Open</button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1 whitespace-nowrap">Escalated</button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1 whitespace-nowrap">Resolved</button>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <input type="text" placeholder="Search ticket..." className="w-full sm:w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>
                <DataTable data={supportTickets} columns={columns} />
            </Card>
        </div>
    );
};
