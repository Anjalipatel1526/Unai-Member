import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, UserPlus } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { Modal } from '../../components/Modal';
import { mockEmployees } from '../../data/mockData';
import { Link } from 'react-router-dom';

export function EmployeeList() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                    <p className="text-gray-500 text-sm">Manage and view your organization's workforce.</p>
                </div>
                <Button
                    variant="primary"
                    icon={<UserPlus size={18} />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Employee
                </Button>
            </div>

            <Card className="p-0">
                <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="w-full bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                        />
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Employee</TableHeader>
                            <TableHeader>Employee ID</TableHeader>
                            <TableHeader>Department</TableHeader>
                            <TableHeader>Role</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader className="text-right">Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockEmployees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={emp.avatar} alt={emp.name} size="sm" />
                                        <span className="font-bold text-gray-900">{emp.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-500">{emp.id}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>
                                    <Badge variant="primary">{emp.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/assistant-hr/employees/${emp.id}`}>
                                        <Button variant="ghost" size="sm" icon={<Eye size={16} />}>View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Employee"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="primary">Save Employee</Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input type="text" placeholder="John Doe" className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <input type="email" placeholder="john@company.com" className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input type="text" placeholder="+1 234..." className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <select className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>HR</option>
                                <option>Finance</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Role</label>
                            <select className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                                <option>Developer</option>
                                <option>Designer</option>
                                <option>Manager</option>
                                <option>Analyst</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Joining Date</label>
                            <input type="date" className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
