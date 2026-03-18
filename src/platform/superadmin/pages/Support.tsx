import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { supabase } from '../../../lib/supabase';
import { MessageSquare, LayoutTemplate, Clock, AlertCircle, Plus, Check } from 'lucide-react';

export const Support = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');

    const [formData, setFormData] = useState({
        client_id: '',
        subject: '',
        description: '',
        priority: 'Medium'
    });

    const fetchData = async () => {
        setIsLoading(true);
        // Fetch tickets joined with clients to get company name
        const { data: ticketsData, error: ticketsError } = await supabase
            .from('tickets')
            .select('*, clients(name)')
            .order('created_at', { ascending: false });

        if (ticketsData) setTickets(ticketsData);

        const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('id, name');

        if (clientsData) setClients(clientsData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        const channel = supabase
            .channel('tickets-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.client_id) return alert("Please select a client.");

        const newTicket = {
            ticket_number: 'TKT-' + Math.floor(Math.random() * 90000 + 10000),
            client_id: formData.client_id,
            subject: formData.subject,
            description: formData.description,
            priority: formData.priority,
            status: 'Open',
            assignee: 'Unassigned'
        };

        const { error } = await supabase.from('tickets').insert([newTicket]);
        if (!error) {
            setIsAddModalOpen(false);
            setFormData({ client_id: '', subject: '', description: '', priority: 'Medium' });
            fetchData();
        } else {
            alert('Error creating ticket: ' + error.message);
        }
    };

    const updateTicketStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from('tickets').update({ status: newStatus }).eq('id', id);
        if (error) alert('Error updating ticket: ' + error.message);
    };

    const deleteTicket = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            await supabase.from('tickets').delete().eq('id', id);
        }
    };

    const filteredTickets = tickets.filter(t => {
        if (filter === 'All') return true;
        return t.status === filter;
    });

    const openCount = tickets.filter(t => t.status === 'Open').length;
    const escalatedCount = tickets.filter(t => t.status === 'Escalated').length;

    const metaCards = [
        { title: 'Open Tickets', value: openCount.toString(), icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Avg. Resolution Time', value: '1.2h', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Escalated Issues', value: escalatedCount.toString(), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    const columns = [
        { header: 'Ticket #', accessor: (row: any) => <span className="font-medium text-gray-900">{row.ticket_number}</span> },
        {
            header: 'Company / Subject', accessor: (row: any) => (
                <div>
                    <p className="font-semibold text-gray-900">{row.subject}</p>
                    <p className="text-xs text-gray-500">{row.clients?.name || 'Unknown Client'}</p>
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
                <Badge status={row.status === 'Resolved' ? 'success' : row.status === 'Open' ? 'primary' : row.status === 'Escalated' ? 'danger' : 'neutral'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Assignee', accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-[10px] font-bold flex items-center justify-center">
                        {row.assignee[0] || '?'}
                    </div>
                    <span className="text-sm font-medium">{row.assignee}</span>
                </div>
            )
        },
        { header: 'Created', accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex gap-2">
                    {row.status !== 'Resolved' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-600" title="Resolve" onClick={() => updateTicketStatus(row.id, 'Resolved')}><Check className="w-4 h-4" /></Button>
                    )}
                    {row.status === 'Open' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600" title="Escalate" onClick={() => updateTicketStatus(row.id, 'Escalated')}><AlertCircle className="w-4 h-4" /></Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 text-xs px-2" onClick={() => deleteTicket(row.id)}>Delete</Button>
                </div>
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
                <Button variant="primary" icon={Plus} onClick={() => setIsAddModalOpen(true)}>Create Ticket (Test)</Button>
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
                        {['All', 'Open', 'Escalated', 'Resolved'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`text-sm font-medium pb-1 whitespace-nowrap ${filter === tab ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {tab === 'All' ? 'All Tickets' : tab}
                            </button>
                        ))}
                    </div>
                </div>
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading tickets...</div>
                ) : tickets.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No tickets found.</div>
                ) : (
                    <DataTable data={filteredTickets} columns={columns} itemsPerPage={5} />
                )}
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Test Ticket">
                <form className="space-y-4" onSubmit={handleCreateTicket}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client / Company</label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                            value={formData.client_id}
                            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                        >
                            <option value="" disabled>Select a client...</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {clients.length === 0 && <p className="text-xs text-red-500 mt-1">You must create a Client first before creating a ticket.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            placeholder="e.g. Can't login"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={clients.length === 0}>Create Ticket</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
