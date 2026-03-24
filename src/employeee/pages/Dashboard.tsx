import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { LogIn, CalendarPlus, TrendingUp, CheckCircle, Clock, Star, Wallet, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { leaveBalances, performanceData, payslips, employeeProfile } from '../data/mockData';

export function Dashboard() {
    const navigate = useNavigate();
    const lastPayslip = payslips.find(p => p.status === 'Paid');
    const totalLeaveRemaining = leaveBalances.reduce((sum, l) => sum + l.remaining, 0);
    const totalLeaveMax = leaveBalances.reduce((sum, l) => sum + l.total, 0);
    const displayName = employeeProfile.name || 'Employee';

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName} 👋</h1>
                <p className="text-sm text-gray-500 mt-1">Here's your workspace summary for today</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50">
                            <CheckCircle size={20} className="text-emerald-600" />
                        </div>
                        <Badge variant="default">—</Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Today's Status</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">Not Available</p>
                    <p className="text-xs text-gray-400 mt-1">No data yet</p>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50">
                            <CalendarPlus size={20} className="text-indigo-600" />
                        </div>
                        <span className="text-2xl font-extrabold text-indigo-600">{totalLeaveRemaining}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Balance</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">Days Remaining</p>
                    <div className="mt-2">
                        <ProgressBar value={totalLeaveRemaining} max={totalLeaveMax || 1} color="indigo" size="sm" showValue={false} />
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-amber-50">
                            <Star size={20} className="text-amber-600" />
                        </div>
                        <span className="text-2xl font-extrabold text-amber-600">{performanceData.overallRating || '—'}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Performance Rating</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">Out of 5.0</p>
                    <div className="flex gap-0.5 mt-2">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={14} className={s <= Math.round(performanceData.overallRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50">
                            <Wallet size={20} className="text-emerald-600" />
                        </div>
                        <Badge variant={lastPayslip ? 'success' : 'default'}>{lastPayslip ? 'Paid' : '—'}</Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payslip</p>
                    <p className="text-2xl font-extrabold text-gray-900 mt-1">{lastPayslip ? `₹${lastPayslip.netSalary.toLocaleString()}` : '—'}</p>
                    <p className="text-xs text-gray-400 mt-1">{lastPayslip?.month || 'No data yet'}</p>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card title="Quick Actions">
                <div className="flex flex-wrap gap-3">
                    <Button icon={<LogIn size={16} />} variant="primary" onClick={() => alert('Checked In at ' + new Date().toLocaleTimeString())}>
                        Check In
                    </Button>
                    <Button icon={<CalendarPlus size={16} />} variant="outline" onClick={() => navigate('/employee/leave')}>
                        Apply Leave
                    </Button>
                    <Button icon={<TrendingUp size={16} />} variant="outline" onClick={() => navigate('/employee/performance')}>
                        View Performance
                    </Button>
                    <Button icon={<Wallet size={16} />} variant="outline" onClick={() => navigate('/employee/payslips')}>
                        View Payslips
                    </Button>
                </div>
            </Card>

            {/* Attendance Trend & Leave Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Attendance Trend (This Month)">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Present Days</span>
                            <span className="text-sm font-bold text-gray-400">— / —</span>
                        </div>
                        <ProgressBar value={0} max={1} color="emerald" label="Attendance Rate" />
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="text-center p-3 bg-emerald-50 rounded-xl">
                                <p className="text-xl font-extrabold text-emerald-700">—</p>
                                <p className="text-xs text-emerald-600 font-medium mt-1">Present</p>
                            </div>
                            <div className="text-center p-3 bg-rose-50 rounded-xl">
                                <p className="text-xl font-extrabold text-rose-700">—</p>
                                <p className="text-xs text-rose-600 font-medium mt-1">Absent</p>
                            </div>
                            <div className="text-center p-3 bg-amber-50 rounded-xl">
                                <p className="text-xl font-extrabold text-amber-700">—</p>
                                <p className="text-xs text-amber-600 font-medium mt-1">Late</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                            <BarChart3 size={16} className="text-gray-400" />
                            <p className="text-xs text-gray-400">Data will be available with backend integration</p>
                        </div>
                    </div>
                </Card>

                <Card title="Leave Balance Overview">
                    {leaveBalances.length > 0 ? (
                        <div className="space-y-5">
                            {leaveBalances.map(leave => (
                                <div key={leave.type}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-gray-700">{leave.type}</span>
                                        <span className="text-xs text-gray-500">{leave.remaining} remaining of {leave.total}</span>
                                    </div>
                                    <ProgressBar
                                        value={leave.used}
                                        max={leave.total}
                                        showValue={false}
                                        color={leave.remaining > leave.total * 0.5 ? 'emerald' : leave.remaining > leave.total * 0.25 ? 'amber' : 'rose'}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <CalendarPlus size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No leave data available</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Upcoming */}
            <Card title="Upcoming">
                <div className="text-center py-8 text-gray-400">
                    <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No upcoming events</p>
                </div>
            </Card>
        </div>
    );
}
