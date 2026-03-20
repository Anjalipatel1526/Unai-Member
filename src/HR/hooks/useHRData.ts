import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Employee, AttendanceRecord, LeaveRequest, Document, Activity } from '../types';

export function useHRData() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch Employees
                const { data: empData, error: empError } = await supabase
                    .from('company_employees')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (empError) throw empError;
                setEmployees(empData as Employee[]);

                // Fetch Attendance
                const { data: attData, error: attError } = await supabase
                    .from('company_attendance')
                    .select('*, company_employees(name)')
                    .order('date', { ascending: false });

                if (attError) throw attError;

                // Map attendance to include employee name from join
                const mappedAttendance = attData.map(att => ({
                    ...att,
                    employee_name: att.company_employees?.name || 'Unknown'
                }));
                setAttendance(mappedAttendance as unknown as AttendanceRecord[]);

                // Fetch Leaves
                const { data: leaveData, error: leaveError } = await supabase
                    .from('company_leaves')
                    .select('*, company_employees(name)')
                    .order('created_at', { ascending: false });

                if (leaveError) throw leaveError;

                const mappedLeaves = leaveData.map(leave => ({
                    ...leave,
                    employee_name: leave.company_employees?.name || 'Unknown'
                }));
                setLeaves(mappedLeaves as unknown as LeaveRequest[]);

                // Fetch Documents
                const { data: docData, error: docError } = await supabase
                    .from('company_documents')
                    .select('*')
                    .order('date', { ascending: false });

                if (docError) throw docError;
                setDocuments(docData as Document[]);

                // Fetch Activities (using system_logs or a combined view)
                // For now, we'll mock activities from the logs or just keep it empty
                const { data: logData, error: logError } = await supabase
                    .from('system_logs')
                    .select('*')
                    .limit(10)
                    .order('created_at', { ascending: false });

                if (!logError && logData) {
                    setActivities(logData.map(log => ({
                        id: log.id,
                        user: log.service,
                        action: log.message,
                        time: new Date(log.created_at).toLocaleTimeString(),
                        type: log.type as 'success' | 'info' | 'warning'
                    })));
                }

            } catch (err: any) {
                console.error('Error fetching HR data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { employees, attendance, leaves, documents, activities, loading, error };
}
