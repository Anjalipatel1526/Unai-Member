export const mockCompany = {
    company_id: 'COMP_001',
    name: 'UNAI Tech Organization',
    logo: 'https://ui-avatars.com/api/?name=UNAI+Tech&background=4f46e5&color=fff',
};

export const mockEmployees = [
    {
        id: 'EMP_001',
        company_id: 'COMP_001',
        name: 'Alice Johnson',
        email: 'alice.j@unaitech.com',
        phone: '+1 234 567 8900',
        department: 'Engineering',
        role: 'Lead Developer',
        salary: 120000,
        status: 'Active',
        joining_date: '2023-01-15',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
    },
    {
        id: 'EMP_002',
        company_id: 'COMP_001',
        name: 'Bob Smith',
        email: 'bob.s@unaitech.com',
        phone: '+1 234 567 8901',
        department: 'Marketing',
        role: 'Marketing Manager',
        salary: 85000,
        status: 'Active',
        joining_date: '2023-03-22',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random',
    },
    {
        id: 'EMP_003',
        company_id: 'COMP_001',
        name: 'Charlie Davis',
        email: 'charlie.d@unaitech.com',
        phone: '+1 234 567 8902',
        department: 'HR',
        role: 'HR Specialist',
        salary: 75000,
        status: 'On Leave',
        joining_date: '2024-02-10',
        avatar: 'https://ui-avatars.com/api/?name=Charlie+Davis&background=random',
    },
];

export const mockDashboardKPIs = {
    company_id: 'COMP_001',
    totalEmployees: 145,
    todayPresent: 132,
    pendingLeaveRequests: 8,
    payrollProcessing: 'In Progress',
};

export const mockAttendance = [
    {
        id: 'ATT_001',
        company_id: 'COMP_001',
        employee_id: 'EMP_001',
        date: '2026-03-18',
        check_in: '09:05 AM',
        check_out: '06:15 PM',
        status: 'Present',
        is_late: true,
    },
    {
        id: 'ATT_002',
        company_id: 'COMP_001',
        employee_id: 'EMP_002',
        date: '2026-03-18',
        check_in: '08:55 AM',
        check_out: '06:00 PM',
        status: 'Present',
        is_late: false,
    },
];

export const mockLeaves = [
    {
        id: 'LV_001',
        company_id: 'COMP_001',
        employee_id: 'EMP_003',
        leave_type: 'Sick Leave',
        from_date: '2026-03-17',
        to_date: '2026-03-19',
        reason: 'Viral Fever',
        status: 'Approved',
    },
    {
        id: 'LV_002',
        company_id: 'COMP_001',
        employee_id: 'EMP_001',
        leave_type: 'Casual Leave',
        from_date: '2026-03-25',
        to_date: '2026-03-26',
        reason: 'Family Function',
        status: 'Pending',
    },
];

export const mockPerformance = [
    {
        id: 'PRF_001',
        company_id: 'COMP_001',
        employee_id: 'EMP_001',
        goal_title: 'Ship Q3 Release',
        progress: 85,
        rating: 4,
        manager_feedback: 'Excellent progress on the upcoming release.',
    },
];

export const mockDocuments = [
    { id: 'DOC_001', company_id: 'COMP_001', title: 'Offer Letter - Alice', type: 'Offer Letter', date: '2023-01-15' },
    { id: 'DOC_002', company_id: 'COMP_001', title: 'Feb 2026 Payslip', type: 'Payslip', date: '2026-03-01' },
];

export const mockExits = [
    {
        id: 'EXT_001',
        company_id: 'COMP_001',
        employee_name: 'David Wilson',
        notice_period_progress: 60,
        asset_return: 'Partial',
        settlement_status: 'Pending',
    },
];
