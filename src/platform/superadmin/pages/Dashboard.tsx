import React, { useState, useEffect } from 'react';
import { Card, Badge, ProgressBar } from '../components/SaaSBase';
import { DataTable } from '../components/DataTable';
import { supabase } from '../../../lib/supabase';
import { Building2, Users, CreditCard, Activity, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
    { name: 'Jan', value: 45000 }, { name: 'Feb', value: 52000 }, { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 }, { name: 'May', value: 59000 }, { name: 'Jun', value: 75000 },
    { name: 'Jul', value: 84500 },
];

export const Dashboard = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (clientsData) setClients(clientsData);

        const { data: invoicesData, error: invoicesError } = await supabase
            .from('invoices')
            .select('*');

        if (invoicesData) setInvoices(invoicesData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        const clientsChannel = supabase
            .channel('dash-clients')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => {
                fetchData();
            })
            .subscribe();

        const invoicesChannel = supabase
            .channel('dash-invoices')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(clientsChannel);
            supabase.removeChannel(invoicesChannel);
        };
    }, []);

    // Calculate dynamic KPIs
    const totalClients = clients.length;
    const activeSubscriptions = clients.filter(c => c.status === 'Active').length;
    const monthlyRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalEmployees = clients.reduce((acc, curr) => acc + Number(curr.limit_employees), 0); // Mocking used as limit for visual
    const pendingPayments = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length;
    const trialAccounts = clients.filter(c => c.status === 'Trial').length;

    const kpiCards = [
        { title: 'Total Clients', value: totalClients, icon: Building2, trend: '+1', isPositive: true },
        { title: 'Active Subscriptions', value: activeSubscriptions, icon: CreditCard, trend: '+0', isPositive: true },
        { title: 'Total Revenue', value: '$' + monthlyRevenue.toLocaleString(), icon: Activity, trend: '+15%', isPositive: true },
        { title: 'Total Employees Cap', value: totalEmployees.toLocaleString(), icon: Users, trend: '+0%', isPositive: true },
    ];

    if (isLoading) {
        return <div className="p-10 text-center text-gray-500">Loading live dashboard data...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Dashboard</h1>
                <div className="flex items-center gap-2">
                    <Badge status="success" className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Sync Active
                        </span>
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((kpi, i) => (
                    <Card key={i} className="p-5 flex flex-col justify-between group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                <kpi.icon className="w-5 h-5" />
                            </div>
                            <div className={cn("flex items-center text-sm font-medium", kpi.isPositive ? "text-emerald-600" : "text-red-600")}>
                                {kpi.trend}
                                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4 ml-0.5" /> : <ArrowDownRight className="w-4 h-4 ml-0.5" />}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">{kpi.title}</h3>
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Revenue Growth (Demo Data)</h2>
                        <select className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500">
                            <option>Last 7 Months</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} tickFormatter={(val) => `$${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">System Health</h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Server Status</p>
                                    <p className="text-xs text-gray-500">Operational</p>
                                </div>
                            </div>
                            <Badge status="success">Healthy</Badge>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Active Sessions</span>
                                <span className="text-gray-900 font-semibold">1,450</span>
                            </div>
                            <ProgressBar progress={65} />
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-between gap-4 mt-auto">
                            <div className="bg-orange-50 rounded-lg p-3 w-full text-center">
                                <p className="text-xs text-orange-600 font-semibold mb-1 uppercase tracking-wider">Pending/Overdue</p>
                                <p className="text-2xl font-bold text-orange-700">{pendingPayments}</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 w-full text-center">
                                <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">Trials</p>
                                <p className="text-2xl font-bold text-blue-700">{trialAccounts}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Client Registrations</h2>
                </div>
                {clients.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No clients registered yet.</div>
                ) : (
                    <DataTable
                        data={clients.slice(0, 5)}
                        columns={[
                            {
                                header: 'Company',
                                accessor: (row) => (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                                            {row.logo_url}
                                        </div>
                                        <span className="font-medium text-gray-900">{row.name}</span>
                                    </div>
                                )
                            },
                            {
                                header: 'Plan',
                                accessor: (row) => <Badge status={row.plan === 'Enterprise' ? 'primary' : 'neutral'}>{row.plan}</Badge>
                            },
                            {
                                header: 'Status',
                                accessor: (row) => (
                                    <Badge status={row.status === 'Active' ? 'success' : row.status === 'Trial' ? 'warning' : 'danger'}>
                                        {row.status}
                                    </Badge>
                                )
                            },
                            { header: 'Joined', accessor: (row) => new Date(row.joined_date).toLocaleDateString() }
                        ]}
                        itemsPerPage={5}
                    />
                )}
            </Card>
        </div>
    );
};

// Utils copy to avoid ts error
const clsx = (...args: any[]) => args.filter(Boolean).join(' ');
const cn = clsx;
