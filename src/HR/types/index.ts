export interface Employee {
    id: string;
    company_id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    joining_date: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    avatar?: string;
}

export interface AttendanceRecord {
    id: string;
    employee_id: string;
    employee_name: string;
    department: string;
    date: string;
    check_in: string;
    check_out: string;
    status: 'Present' | 'Absent' | 'Late';
}

export interface LeaveRequest {
    id: string;
    employee_id: string;
    employee_name: string;
    leave_type: string;
    from_date: string;
    to_date: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Forwarded';
}

export interface Document {
    id: string;
    title: string;
    type: 'Offer Letter' | 'Certificate' | 'ID Card' | 'Other';
    date: string;
    url: string;
}

export interface Activity {
    id: string;
    user: string;
    action: string;
    time: string;
    type: 'success' | 'info' | 'warning';
}
