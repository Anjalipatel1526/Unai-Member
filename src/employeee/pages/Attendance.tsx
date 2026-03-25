import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Calendar } from '../components/Calendar';
import { Tabs } from '../components/Tabs';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../components/Table';
import { LogIn, LogOut, Clock, CalendarCheck, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
    Present: 'success',
    Absent: 'danger',
    Late: 'warning',
    'Half Day': 'info',
    Weekend: 'default',
};

// Get auth data from localStorage
function getAuth() {
    try {
        const auth = localStorage.getItem('userAuth');
        if (auth) return JSON.parse(auth);
    } catch { }
    return null;
}

export function Attendance() {
    const [tab, setTab] = useState('Calendar');
    const [todayRecord, setTodayRecord] = useState<any>(null);
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const auth = getAuth();
    const today = new Date().toISOString().split('T')[0];

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch attendance data
    const fetchAttendance = async () => {
        if (!auth) return;

        // Fetch all records for this employee
        const { data } = await supabase
            .from('company_attendance')
            .select('*')
            .eq('company_id', auth.companyId || 'COMP_001')
            .eq('employee_name', auth.employeeName)
            .order('date', { ascending: false });

        if (data) {
            setRecords(data);
            // Find today's record
            const todayRec = data.find((r: any) => r.date === today);
            setTodayRecord(todayRec || null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAttendance();

        // Realtime subscription
        const channel = supabase
            .channel('attendance_employee')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'company_attendance' }, () => {
                fetchAttendance();
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    // Check In
    const handleCheckIn = async () => {
        if (!auth) return;
        setActionLoading(true);

        const now = new Date();
        const checkInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30);

        const { error } = await supabase.from('company_attendance').insert({
            company_id: auth.companyId || 'COMP_001',
            employee_id: auth.employeeId,
            employee_name: auth.employeeName,
            department: auth.department || '',
            date: today,
            check_in: checkInTime,
            check_out: null,
            status: 'Present',
            is_late: isLate,
        });

        if (error) {
            alert('Error checking in: ' + error.message);
        } else {
            await fetchAttendance();
        }
        setActionLoading(false);
    };

    // Check Out
    const handleCheckOut = async () => {
        if (!auth || !todayRecord) return;
        setActionLoading(true);

        const now = new Date();
        const checkOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        // Calculate working hours
        const workingHours = calculateWorkingHours(todayRecord.check_in, checkOutTime);
        const status = workingHours < 4 ? 'Half Day' : 'Present';

        const { error } = await supabase
            .from('company_attendance')
            .update({
                check_out: checkOutTime,
                status: status,
                working_hours: workingHours.toFixed(1),
            })
            .eq('id', todayRecord.id);

        if (error) {
            alert('Error checking out: ' + error.message);
        } else {
            await fetchAttendance();
        }
        setActionLoading(false);
    };

    // Calculate working hours
    function calculateWorkingHours(checkIn: string, checkOut: string): number {
        try {
            const parseTime = (t: string) => {
                const d = new Date();
                const [time, period] = t.split(' ');
                let [h, m] = time.split(':').map(Number);
                if (period?.toUpperCase() === 'PM' && h !== 12) h += 12;
                if (period?.toUpperCase() === 'AM' && h === 12) h = 0;
                d.setHours(h, m, 0, 0);
                return d;
            };
            const diff = (parseTime(checkOut).getTime() - parseTime(checkIn).getTime()) / (1000 * 60 * 60);
            return Math.max(0, diff);
        } catch {
            return 0;
        }
    }

    // Compute stats from records
    const thisMonthRecords = records.filter(r => r.date?.startsWith(today.substring(0, 7)));
    const presentDays = thisMonthRecords.filter(r => r.status === 'Present' || r.status === 'Half Day').length;
    const absentDays = thisMonthRecords.filter(r => r.status === 'Absent').length;
    const lateDays = thisMonthRecords.filter(r => r.is_late).length;
    const halfDays = thisMonthRecords.filter(r => r.status === 'Half Day').length;

    // Build calendar data
    const calendarAttendance: Record<string, 'present' | 'absent' | 'halfday' | 'late' | 'weekend' | 'holiday'> = {};
    records.forEach(r => {
        if (r.status === 'Present' && r.is_late) calendarAttendance[r.date] = 'late';
        else if (r.status === 'Present') calendarAttendance[r.date] = 'present';
        else if (r.status === 'Half Day') calendarAttendance[r.date] = 'halfday';
        else if (r.status === 'Absent') calendarAttendance[r.date] = 'absent';
    });

    const checkedIn = !!todayRecord && !todayRecord.check_out;
    const checkedOut = !!todayRecord && !!todayRecord.check_out;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your daily attendance and working hours</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <Clock size={14} className="text-indigo-600" />
                        <span className="text-sm font-mono font-semibold text-gray-700">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                    </div>
                    {!todayRecord ? (
                        <Button
                            icon={actionLoading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                            onClick={handleCheckIn}
                            disabled={actionLoading}
                        >
                            Check In
                        </Button>
                    ) : checkedIn ? (
                        <Button
                            variant="outline"
                            icon={actionLoading ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                            onClick={handleCheckOut}
                            disabled={actionLoading}
                        >
                            Check Out
                        </Button>
                    ) : (
                        <Badge variant="success">Completed for today</Badge>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-emerald-600">{presentDays}</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Present Days</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-rose-600">{absentDays}</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Absent Days</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-amber-600">{lateDays}</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Late Arrivals</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-sky-600">{halfDays}</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Half Days</p>
                    </div>
                </Card>
            </div>

            {/* Today Status */}
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${checkedIn ? 'bg-emerald-50' : checkedOut ? 'bg-sky-50' : 'bg-gray-50'}`}>
                            <Clock size={22} className={checkedIn ? 'text-emerald-500' : checkedOut ? 'text-sky-500' : 'text-gray-400'} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Today</p>
                            {todayRecord ? (
                                <div className="flex items-center gap-3 mt-0.5">
                                    <span className="text-xs text-gray-500">
                                        In: <span className="font-semibold text-gray-700">{todayRecord.check_in}</span>
                                    </span>
                                    {todayRecord.check_out && (
                                        <span className="text-xs text-gray-500">
                                            Out: <span className="font-semibold text-gray-700">{todayRecord.check_out}</span>
                                        </span>
                                    )}
                                    {todayRecord.working_hours && (
                                        <span className="text-xs text-gray-500">
                                            Hours: <span className="font-semibold text-gray-700">{todayRecord.working_hours}h</span>
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500 mt-0.5">Not checked in yet</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {todayRecord?.is_late && <Badge variant="warning">Late</Badge>}
                        <Badge variant={checkedIn ? 'success' : checkedOut ? 'info' : 'default'}>
                            {checkedIn ? 'Working' : checkedOut ? 'Completed' : 'Not Started'}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <Tabs tabs={['Calendar', 'Table']} activeTab={tab} onChange={setTab} className="w-fit" />

            {tab === 'Calendar' ? (
                <Card>
                    <Calendar year={new Date().getFullYear()} month={new Date().getMonth()} attendance={calendarAttendance} />
                </Card>
            ) : (
                <Card title="Attendance Records">
                    {records.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Date</TableHeader>
                                    <TableHeader>Check In</TableHeader>
                                    <TableHeader>Check Out</TableHeader>
                                    <TableHeader>Working Hours</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records.map((record, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell><span className="font-medium">{record.date}</span></TableCell>
                                        <TableCell>{record.check_in || '—'}</TableCell>
                                        <TableCell>{record.check_out || '—'}</TableCell>
                                        <TableCell><span className="font-semibold">{record.working_hours ? `${record.working_hours}h` : '—'}</span></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <Badge variant={statusVariant[record.status] || 'default'}>{record.status}</Badge>
                                                {record.is_late && <Badge variant="warning">Late</Badge>}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <CalendarCheck size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No attendance records available</p>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
