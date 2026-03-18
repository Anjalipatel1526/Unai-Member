import React from 'react';
import { Target, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { ProgressBar } from '../components/ProgressBar';
import { Avatar } from '../components/Avatar';
import { useCompanyData } from '../data/CompanyContext';

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={16}
                    className={star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200"}
                />
            ))}
        </div>
    );
}

export function Performance() {
    const { performance, employees } = useCompanyData();
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Performance Management</h2>
                <p className="text-sm text-gray-500">Track employee goals, provide feedback, and manage reviews.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Goals Cards */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Add Goal</button>
                    </div>

                    {performance.map((perf: any) => {
                        const emp = employees.find((e: any) => e.id === perf.employee_id);
                        return (
                            <Card key={perf.id} className="overflow-hidden border-l-4 border-l-indigo-500">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{perf.goal_title}</h4>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                <Target size={14} /> Q3 Objective
                                            </p>
                                        </div>
                                        <Avatar src={emp?.avatar} alt={emp?.name} className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Progress</span>
                                            <span className="font-medium text-gray-900">{perf.progress}%</span>
                                        </div>
                                        <ProgressBar value={perf.progress} color="bg-indigo-600" />
                                    </div>

                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-500">Current Rating</span>
                                            <StarRating rating={perf.rating} />
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 relative">
                                            <MessageSquare size={14} className="absolute top-3 left-3 text-gray-400" />
                                            <p className="text-sm text-gray-600 pl-6 italic">"{perf.manager_feedback}"</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quarterly Review Table */}
                <Card className="lg:col-span-2">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <CardTitle>Quarterly Review Matrix</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Overall Rating</TableHead>
                                    <TableHead>Goals Met</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.slice(0, 4).map((emp: any, i) => {
                                    const rating = i === 0 ? 4 : i === 1 ? 5 : i === 2 ? 3 : 4;
                                    return (
                                        <TableRow key={emp.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={emp.avatar} alt={emp.name} className="h-8 w-8" />
                                                    <span className="font-medium text-gray-900">{emp.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">{emp.department}</TableCell>
                                            <TableCell>
                                                <StarRating rating={rating} />
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-xs font-medium text-gray-600 border border-gray-200">
                                                    {rating >= 4 ? '3/3' : '2/3'} Goals
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <button className="text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                                                    Review
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
