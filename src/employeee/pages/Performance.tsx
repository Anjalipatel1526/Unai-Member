import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../components/Table';
import { Star, Target, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { performanceData } from '../data/mockData';

const goalStatusVariant: Record<string, 'success' | 'warning' | 'danger' | 'primary'> = {
    'Completed': 'success',
    'On Track': 'primary',
    'In Progress': 'warning',
    'At Risk': 'danger',
};

const goalColor: Record<string, 'emerald' | 'indigo' | 'amber' | 'rose'> = {
    'Completed': 'emerald',
    'On Track': 'indigo',
    'In Progress': 'amber',
    'At Risk': 'rose',
};

export function Performance() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
                <p className="text-sm text-gray-500 mt-1">Track your goals, ratings, and feedback</p>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <Star size={24} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Rating</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-3xl font-extrabold text-gray-900">{performanceData.overallRating}</span>
                                <span className="text-sm text-gray-400">/ 5.0</span>
                            </div>
                            <div className="flex gap-0.5 mt-1">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star key={s} size={14} className={s <= Math.round(performanceData.overallRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <Award size={24} className="text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department Rank</p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-3xl font-extrabold text-gray-900">#{performanceData.departmentRank}</span>
                                <span className="text-sm text-gray-400">of {performanceData.totalInDepartment}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium mt-1">{performanceData.totalInDepartment ? `Top ${Math.round((performanceData.departmentRank / performanceData.totalInDepartment) * 100)}%` : '—'}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-50 rounded-xl">
                            <TrendingUp size={24} className="text-sky-500" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Review Period</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">{performanceData.reviewPeriod}</p>
                            <p className="text-xs text-gray-400 font-medium mt-1">{performanceData.reviewPeriod ? 'Current Quarter' : '—'}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goals */}
                <Card title="Goals & Objectives">
                    {performanceData.goals.length > 0 ? (
                        <div className="space-y-5">
                            {performanceData.goals.map(goal => (
                                <div key={goal.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Target size={16} className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-900">{goal.title}</span>
                                        </div>
                                        <Badge variant={goalStatusVariant[goal.status]}>{goal.status}</Badge>
                                    </div>
                                    <ProgressBar
                                        value={goal.progress}
                                        max={100}
                                        color={goalColor[goal.status]}
                                        showValue={true}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <Target size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No goals assigned yet</p>
                        </div>
                    )}
                </Card>

                {/* Manager Feedback */}
                <Card title="Manager Feedback">
                    {performanceData.managerFeedback.text ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                <div className="flex items-start gap-3">
                                    <MessageSquare size={20} className="text-indigo-500 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-700 leading-relaxed italic">
                                            "{performanceData.managerFeedback.text}"
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-indigo-100/50">
                                            <div className="h-7 w-7 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                                                {performanceData.managerFeedback.reviewer.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-900">{performanceData.managerFeedback.reviewer}</p>
                                                <p className="text-xs text-gray-400">{performanceData.managerFeedback.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No feedback available yet</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Performance History */}
            <Card title="Performance History">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Review Period</TableHeader>
                            <TableHeader>Rating</TableHeader>
                            <TableHeader>Stars</TableHeader>
                            <TableHeader>Status</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {performanceData.history.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <span className="font-semibold">{item.period}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-lg font-extrabold text-gray-900">{item.rating}</span>
                                    <span className="text-xs text-gray-400"> / 5.0</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={12} className={s <= Math.round(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.rating >= 4 ? 'success' : item.rating >= 3 ? 'warning' : 'danger'}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
