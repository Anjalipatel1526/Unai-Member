import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { supabase } from '../../../lib/supabase';
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, CheckCircle, Plus } from 'lucide-react';

export const Billing = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filter, setFilter] = useState('All Statuses');

    const [formData, setFormData] = useState({
        client_id: '',
        amount: 299,
        status: 'Pending',
        due_date: new Date().toISOString().split('T')[0]
    });

    const fetchData = async () => {
        setIsLoading(true);
        const { data: invoicesData, error: invoicesError } = await supabase
            .from('invoices')
            .select('*, clients(name)')
            .order('created_at', { ascending: false });

        if (invoicesData) setInvoices(invoicesData);

        const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('id, name');

        if (clientsData) setClients(clientsData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        const channel = supabase
            .channel('invoices-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.client_id) return alert("Please select a client.");

        const newInvoice = {
            invoice_number: 'INV-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000),
            client_id: formData.client_id,
            amount: formData.amount,
            status: formData.status,
            due_date: formData.due_date
        };

        const { error } = await supabase.from('invoices').insert([newInvoice]);
        if (!error) {
            setIsAddModalOpen(false);
            setFormData({ ...formData, client_id: '', amount: 299 });
            fetchData();
        } else {
            alert('Error creating invoice: ' + error.message);
        }
    };

    const markAsPaid = async (id: string) => {
        const { error } = await supabase.from('invoices').update({ status: 'Paid' }).eq('id', id);
        if (error) alert('Error updating invoice: ' + error.message);
    };

    const deleteInvoice = async (id: string) => {
        if (window.confirm("Delete this invoice?")) {
            await supabase.from('invoices').delete().eq('id', id);
        }
    };

    const filteredInvoices = invoices.filter(inv => {
        if (filter === 'All Statuses') return true;
        return inv.status === filter;
    });

    const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const pendingRevenue = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const failedRevenue = invoices.filter(i => i.status === 'Failed').reduce((acc, curr) => acc + Number(curr.amount), 0);

    const cards = [
        { title: 'Total Revenue (Paid)', value: '$' + totalRevenue.toLocaleString(), icon: DollarSign, trend: '+24.5%', positive: true },
        { title: 'Pending & Overdue', value: '$' + pendingRevenue.toLocaleString(), icon: ArrowUpRight, trend: '+12.4%', positive: true },
        { title: 'Failed Payments', value: '$' + failedRevenue.toLocaleString(), icon: ArrowDownRight, trend: '-2.1%', positive: false },
    ];

    const columns = [
        { header: 'Invoice #', accessor: (row: any) => <span className="font-medium text-gray-900">{row.invoice_number}</span> },
        { header: 'Company', accessor: (row: any) => <span>{row.clients?.name || 'Unknown'}</span> },
        { header: 'Amount', accessor: (row: any) => <span className="font-semibold">${Number(row.amount).toLocaleString()}</span> },
        {
            header: 'Status',
            accessor: (row: any) => (
                <Badge status={row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'warning' : row.status === 'Failed' ? 'danger' : 'neutral'}>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Due Date', accessor: (row: any) => new Date(row.due_date).toLocaleDateString() },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    {row.status !== 'Paid' && (
                        <Button variant="ghost" size="sm" icon={CheckCircle} title="Mark Paid" className="p-1 h-8 w-8 text-emerald-600" onClick={() => markAsPaid(row.id)} />
                    )}
                    <Button variant="ghost" size="sm" icon={Download} title="Download PDF" className="p-1 h-8 w-8" />
                    <Button variant="ghost" size="sm" className="h-8 text-xs px-2 text-red-600" onClick={() => deleteInvoice(row.id)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Revenue & Billing</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage platform revenue, MRR, and client invoices.</p>
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setIsAddModalOpen(true)}>Create Invoice (Test)</Button>
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
                    <select
                        className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option>All Statuses</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                        <option>Failed</option>
                    </select>
                </div>
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading invoices...</div>
                ) : invoices.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No invoices generated yet.</div>
                ) : (
                    <DataTable data={filteredInvoices} columns={columns} />
                )}
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Test Invoice">
                <form className="space-y-4" onSubmit={handleCreateInvoice}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                            value={formData.client_id}
                            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                        >
                            <option value="" disabled>Select a client...</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                            <input
                                type="number" required min="1" step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>Paid</option>
                                <option>Pending</option>
                                <option>Overdue</option>
                                <option>Failed</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <input
                            type="date" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white"
                            value={formData.due_date}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        />
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={clients.length === 0}>Create Invoice</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
