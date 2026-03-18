export const kpiStats = {
    totalClients: 142,
    activeSubscriptions: 128,
    monthlyRevenue: 84500,
    totalEmployees: 12450,
    pendingPayments: 4,
    trialAccounts: 18
};

export const clientsData = [
    { id: '1', name: 'Acme Corp', logo: 'AC', plan: 'Enterprise', usedEmployees: 450, limitEmployees: 500, status: 'Active', payment: 'Paid', joined: '2025-01-15' },
    { id: '2', name: 'Global Tech', logo: 'GT', plan: 'Professional', usedEmployees: 120, limitEmployees: 250, status: 'Active', payment: 'Paid', joined: '2025-02-10' },
    { id: '3', name: 'Nexus Industries', logo: 'NI', plan: 'Basic', usedEmployees: 45, limitEmployees: 50, status: 'Active', payment: 'Overdue', joined: '2025-11-05' },
    { id: '4', name: 'Stark Solutions', logo: 'SS', plan: 'Enterprise', usedEmployees: 890, limitEmployees: 1000, status: 'Active', payment: 'Paid', joined: '2026-01-20' },
    { id: '5', name: 'Wayne Enterprises', logo: 'WE', plan: 'Enterprise', usedEmployees: 5000, limitEmployees: 10000, status: 'Suspended', payment: 'Failed', joined: '2024-06-12' },
    { id: '6', name: 'Umbrella Corp', logo: 'UC', plan: 'Professional', usedEmployees: 210, limitEmployees: 250, status: 'Active', payment: 'Paid', joined: '2025-08-30' },
    { id: '7', name: 'Cyberdyne', logo: 'CB', plan: 'Basic', usedEmployees: 15, limitEmployees: 50, status: 'Trial', payment: 'Pending', joined: '2026-03-01' }
];

export const plansData = [
    {
        id: 'p1', name: 'Basic', price: 99, period: 'monthly', limit: 50, storage: '10GB', support: 'Email Support',
        features: ['Core HR', 'Employee Directory', 'Leave Management'], isActive: true
    },
    {
        id: 'p2', name: 'Professional', price: 299, period: 'monthly', limit: 250, storage: '50GB', support: 'Priority Email & Chat',
        features: ['Core HR', 'Leave Management', 'Payroll Integration', 'Performance Reviews', 'Mobile App'], isActive: true
    },
    {
        id: 'p3', name: 'Enterprise', price: 899, period: 'monthly', limit: 1000, storage: 'Unlimited', support: '24/7 Phone & Dedicated AM',
        features: ['All Pro Features', 'Custom APIs', 'SSO integration', 'Advanced Analytics', 'White-labeling'], isActive: true
    }
];

export const billingData = [
    { id: 'INV-2026-001', company: 'Acme Corp', amount: 899, status: 'Paid', dueDate: '2026-03-01' },
    { id: 'INV-2026-002', company: 'Global Tech', amount: 299, status: 'Paid', dueDate: '2026-03-05' },
    { id: 'INV-2026-003', company: 'Nexus Industries', amount: 99, status: 'Overdue', dueDate: '2026-02-28' },
    { id: 'INV-2026-004', company: 'Stark Solutions', amount: 899, status: 'Paid', dueDate: '2026-03-10' },
    { id: 'INV-2026-005', company: 'Wayne Enterprises', amount: 899, status: 'Failed', dueDate: '2026-02-15' },
];

export const supportTickets = [
    { id: 'TKT-1045', company: 'Acme Corp', subject: 'API Rate Limits', priority: 'High', status: 'Open', admin: 'Sarah J.', lastUpdated: '2h ago' },
    { id: 'TKT-1046', company: 'Nexus Industries', subject: 'Billing Update Issue', priority: 'Medium', status: 'In Progress', admin: 'Mike T.', lastUpdated: '4h ago' },
    { id: 'TKT-1047', company: 'Cyberdyne', subject: 'Trial Extension Request', priority: 'Low', status: 'Resolved', admin: 'Sarah J.', lastUpdated: '1d ago' },
    { id: 'TKT-1048', company: 'Stark Solutions', subject: 'SSO Configuration Help', priority: 'Critical', status: 'Escalated', admin: 'David L.', lastUpdated: '30m ago' }
];

export const systemLogs = [
    { id: '1', time: '10:45 AM', type: 'error', message: 'Database connection timeout in eu-west-1', service: 'DB Cluster' },
    { id: '2', time: '10:30 AM', type: 'warning', message: 'High memory usage detected', service: 'Worker Node 4' },
    { id: '3', time: '09:15 AM', type: 'info', message: 'Automated backup completed successfully', service: 'Backup Service' },
    { id: '4', time: '08:00 AM', type: 'info', message: 'Daily cron jobs executed', service: 'Scheduler' },
];

export const systemMetrics = {
    serverStatus: 'Operational',
    activeSessions: 1450,
    apiResponseTime: '124ms',
    errorRate: '0.04%'
};
