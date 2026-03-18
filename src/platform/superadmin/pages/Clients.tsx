import React, { useState, useEffect } from 'react';
import { Card, Badge, ProgressBar, Button, Modal } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { supabase } from '../../../lib/supabase';
import { Building2, Plus, Search, Filter, Eye, Play, Pause, Trash2 } from 'lucide-react';

export const Clients = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: 'Basic',
        limit_employees: 50,
        isTrial: false,
    });

    const fetchClients = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching clients:', error);
        } else if (data) {
            setClients(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchClients();

        const channel = supabase
            .channel('clients-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => {
                fetchClients();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        const newClient = {
            name: formData.name,
            logo_url: formData.name.substring(0, 2).toUpperCase(),
            plan: formData.plan,
            limit_employees: Number(formData.limit_employees),
            status: formData.isTrial ? 'Trial' : 'Active',
            used_employees: 0,
            payment_status: formData.isTrial ? 'Pending' : 'Paid',
        };

        const { error } = await supabase.from('clients').insert([newClient]);

        if (error) {
            alert("Error creating client: " + error.message);
        } else {
            setIsAddModalOpen(false);
            setFormData({ name: '', email: '', plan: 'Basic', limit_employees: 50, isTrial: false });
            fetchClients(); // Refresh data
        }
    };

    const toggleClientStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Suspended' ? 'Active' : 'Suspended';
        const { error } = await supabase
            .from('clients')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) fetchClients();
    };

    const deleteClient = async (id: string, confirmName: string) => {
        if (window.confirm(`Are you sure you want to completely delete ${confirmName}?`)) {
            const { error } = await supabase.from('clients').delete().eq('id', id);
            if (!error) fetchClients();
        }
    };

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const columns = [
        {
            header: 'Company',
            accessor: (row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        {row.logo_url || 'N/A'}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">Joined {row.joined_date || 'Recently'}</p>
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
                        <span className="font-medium text-gray-700">{row.used_employees}</span>
                        <span className="text-gray-500">of {row.limit_employees}</span>
                    </div>
                    <ProgressBar progress={(row.used_employees / row.limit_employees) * 100} className={row.used_employees / row.limit_employees > 0.9 ? "[&>div]:bg-red-500" : ""} />
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
                        <Button
                            variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-600" title="Activate"
                            onClick={() => toggleClientStatus(row.id, row.status)}
                        ><Play className="w-4 h-4" /></Button>
                    ) : (
                        <Button
                            variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600" title="Suspend"
                            onClick={() => toggleClientStatus(row.id, row.status)}
                        ><Pause className="w-4 h-4" /></Button>
                    )}
                    <Button
                        variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600" title="Delete"
                        onClick={() => deleteClient(row.id, row.name)}
                    ><Trash2 className="w-4 h-4" /></Button>
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
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading clients from Supabase...</div>
                ) : filteredClients.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No clients found. Add one to get started!</div>
                ) : (
                    <DataTable data={filteredClients} columns={columns} itemsPerPage={8} />
                )}
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Onboard New Client">
                <form className="space-y-4" onSubmit={handleCreateClient}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="e.g. Stark Industries"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                        <input
                            type="email" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="admin@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                                value={formData.plan}
                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            >
                                <option>Basic</option>
                                <option>Professional</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Limit</label>
                            <input
                                type="number" required min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.limit_employees}
                                onChange={(e) => setFormData({ ...formData, limit_employees: Number(e.target.value) })}
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                    checked={formData.isTrial}
                                    onChange={(e) => setFormData({ ...formData, isTrial: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-gray-700">Start 14-Day Trial</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Client</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
