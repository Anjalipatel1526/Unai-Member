import type { Employee, AttendanceRecord, LeaveRequest, Document, Activity } from '../types';

export const mockEmployees: Employee[] = [
    {
        id: 'EMP001',
        company_id: 'COMP_001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        department: 'Engineering',
        role: 'Senior Developer',
        joining_date: '2023-01-15',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff'
    },
    {
        id: 'EMP002',
        company_id: 'COMP_001',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234 567 891',
        department: 'Marketing',
        role: 'Creative Lead',
        joining_date: '2023-05-20',
        status: 'On Leave',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
    },
    {
        id: 'EMP003',
        company_id: 'COMP_001',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1 234 567 892',
        department: 'HR',
        role: 'HR Executive',
        joining_date: '2022-11-10',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=f59e0b&color=fff'
    }
];

export const mockAttendance: AttendanceRecord[] = [
    {
        id: 'ATT001',
        employee_id: 'EMP001',
        employee_name: 'John Doe',
        date: '2024-03-19',
        check_in: '09:00 AM',
        check_out: '06:00 PM',
        status: 'Present'
    },
    {
        id: 'ATT002',
        employee_id: 'EMP003',
        employee_name: 'Michael Brown',
        date: '2024-03-19',
        check_in: '09:15 AM',
        check_out: '06:15 PM',
        status: 'Late'
    }
];

export const mockLeaves: LeaveRequest[] = [
    {
        id: 'LV001',
        employee_id: 'EMP002',
        employee_name: 'Jane Smith',
        leave_type: 'Sick Leave',
        from_date: '2024-03-20',
        to_date: '2024-03-22',
        reason: 'Flu symptoms',
        status: 'Pending'
    }
];

export const mockDocuments: Document[] = [
    {
        id: 'DOC001',
        title: 'Offer Letter - John Doe',
        type: 'Offer Letter',
        upload_date: '2023-01-10',
        url: '#'
    },
    {
        id: 'DOC002',
        title: 'Degree Certificate - Jane Smith',
        type: 'Certificate',
        upload_date: '2023-05-15',
        url: '#'
    }
];

export const mockActivities: Activity[] = [
    {
        id: 'ACT001',
        user: 'Assistant HR',
        action: 'Added new employee: John Doe',
        time: '2 hours ago',
        type: 'success'
    },
    {
        id: 'ACT002',
        user: 'Assistant HR',
        action: 'Approved leave level 1 for Jane Smith',
        time: '5 hours ago',
        type: 'info'
    }
];
