// Data placeholders for Employee Self-Service Dashboard
// Ready for backend API integration

export const employeeProfile = {
    company_id: '',
    employee_id: '',
    role: 'EMPLOYEE',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joining_date: '',
    avatar: '',
    manager: '',
    location: '',
    status: '',
};

export const attendanceRecords: {
    date: string;
    checkIn: string;
    checkOut: string;
    hours: string;
    status: string;
}[] = [];

export const calendarAttendance: Record<string, 'present' | 'absent' | 'halfday' | 'late' | 'weekend' | 'holiday'> = {};

export const leaveBalances: {
    type: string;
    total: number;
    used: number;
    remaining: number;
}[] = [];

export const leaveHistory: {
    id: number;
    type: string;
    from: string;
    to: string;
    days: number;
    reason: string;
    status: string;
}[] = [];

export const performanceData = {
    overallRating: 0,
    departmentRank: 0,
    totalInDepartment: 0,
    reviewPeriod: '',
    goals: [] as { id: number; title: string; progress: number; status: string }[],
    managerFeedback: {
        text: '',
        reviewer: '',
        date: '',
    },
    history: [] as { period: string; rating: number; status: string }[],
};

export const payslips: {
    id: number;
    month: string;
    date: string;
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: string;
}[] = [];

export const documents: {
    id: number;
    name: string;
    type: string;
    date: string;
    size: string;
    icon: string;
}[] = [];

export const notifications: {
    id: number;
    message: string;
    time: string;
    read: boolean;
}[] = [];
