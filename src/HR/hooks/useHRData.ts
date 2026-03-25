import { useState, useEffect, useCallback, useRef } from 'react';
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
    const isInitialMount = useRef(true);

    const fetchData = useCallback(async (isInitial = false) => {
        if (isInitial) setLoading(true);

        try {
            const [
                { data: empData, error: empError },
                { data: attData, error: attError },
                { data: leaveData, error: leaveError },
                { data: docData, error: docError },
                { data: logData, error: logError }
            ] = await Promise.all([
                supabase.from('company_employees').select('*').order('created_at', { ascending: false }),
                supabase.from('company_attendance').select('*').order('date', { ascending: false }),
                supabase.from('company_leaves').select('*, company_employees(name, department)').order('created_at', { ascending: false }),
                supabase.from('company_documents').select('*').order('date', { ascending: false }),
                supabase.from('system_logs').select('*').limit(10).order('created_at', { ascending: false })
            ]);

            if (empError) throw empError;
            if (attError) throw attError;
            if (leaveError) throw leaveError;
            if (docError) throw docError;

            setEmployees(empData as Employee[]);

            setAttendance((attData || []).map(att => {
                const emp = (empData || []).find(e => e.id === att.employee_id);
                return {
                    ...att,
                    employee_name: att.employee_name || emp?.name || 'Unknown',
                    department: att.department || emp?.department || ''
                };
            }) as unknown as AttendanceRecord[]);

            setLeaves((leaveData || []).map(leave => ({
                ...leave,
                employee_name: leave.company_employees?.name || 'Unknown',
                department: leave.company_employees?.department || 'Unknown'
            })) as unknown as LeaveRequest[]);

            setDocuments(docData as Document[]);

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
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            fetchData(true);
            isInitialMount.current = false;
        }

        // Set up Realtime Subscriptions
        const tables = [
            'company_employees',
            'company_attendance',
            'company_leaves',
            'company_documents',
            'system_logs'
        ];

        const channels = tables.map(table =>
            supabase
                .channel(`${table}_changes`)
                .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
                    fetchData(); // Refetch on any change
                })
                .subscribe()
        );

        return () => {
            channels.forEach(channel => channel.unsubscribe());
        };
    }, [fetchData]);

    return { employees, attendance, leaves, documents, activities, loading, error, refreshData: fetchData };
}
