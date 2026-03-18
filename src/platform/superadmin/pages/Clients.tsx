import React, { useState } from 'react';
import { Card, Badge, ProgressBar, Button, Modal } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { clientsData } from '../data/mockData';
import { Building2, Plus, Search, Filter, MoreVertical, Eye, Play, Pause, Trash2 } from 'lucide-react';

export const Clients = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clientsData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const columns = [
        {
            header: 'Company',
            accessor: (row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        {row.logo}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">Joined {row.joined}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Subscription Plan',
            accessor: (row: any) => (
                <Badge status={row.plan === 'Enterprise' ? 'primary' : row.plan === 'Professional' ? 'warning' : 'neutral'} className="px-2.5 py-1">
                    {row.plan}
                </Badge>
            )
        },
        {
            header: 'Employee Usage',
            accessor: (row: any) => (
                <div className="w-48">
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-gray-700">{row.usedEmployees}</span>
                        <span className="text-gray-500">of {row.limitEmployees}</span>
                    </div>
                    <ProgressBar progress={(row.usedEmployees / row.limitEmployees) * 100} className={row.usedEmployees / row.limitEmployees > 0.9 ? "[&>div]:bg-red-500" : ""} />
                </div>
            )
        },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge status={row.status === 'Active' ? 'success' : row.status === 'Trial' ? 'warning' : 'danger'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details"><Eye className="w-4 h-4" /></Button>
                    {row.status === 'Suspended' ? (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-600" title="Activate"><Play className="w-4 h-4" /></Button>
                    ) : (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600" title="Suspend"><Pause className="w-4 h-4" /></Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Clients Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all subscribing companies and their resource limits.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} icon={Plus}>
                    Add New Client
                </Button>
            </div>

            <Card className="flex flex-col">
                <div className="p-4 border-b border-gray-100 flex sm:flex-row flex-col gap-4 justify-between items-center bg-gray-50/50">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company name..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" icon={Filter}>
                        Filter By Plan
                    </Button>
                </div>

                <DataTable data={filteredClients} columns={columns} itemsPerPage={8} />
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Onboard New Client">
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="e.g. Stark Industries" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="admin@company.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white">
                                <option>Basic</option>
                                <option>Professional</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white">
                                <option>Monthly</option>
                                <option>Yearly (-20%)</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Limit</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" defaultValue={50} />
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                                <span className="text-sm font-medium text-gray-700">Start 14-Day Trial</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Client</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
