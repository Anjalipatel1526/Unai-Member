import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import { useCompanyData } from '../data/CompanyContext';

export function Employees() {
    const { employees } = useCompanyData();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Employees</h2>
                    <p className="text-sm text-gray-500">Manage your workforce, roles, and access.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                >
                    <Plus size={16} />
                    Add Employee
                </button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                    <CardTitle>All Employees</CardTitle>
                    <div className="relative w-64">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((emp) => (
                                <TableRow key={emp.id} className="group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={emp.avatar} alt={emp.name} />
                                            <div>
                                                <div className="font-medium text-gray-900">{emp.name}</div>
                                                <div className="text-xs text-gray-500">{emp.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-500">{emp.id}</TableCell>
                                    <TableCell>{emp.department}</TableCell>
                                    <TableCell>
                                        <Badge variant="info">{emp.role}</Badge>
                                    </TableCell>
                                    <TableCell>${emp.salary.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={emp.status === 'Active' ? 'success' : 'warning'}>
                                            {emp.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => navigate(`/company-admin/employees/${emp.id}`)}
                                                className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="View Profile"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Employee"
            >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="+1 234 567 890" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>HR</option>
                                <option>Sales</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                                <option>Employee</option>
                                <option>Manager</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Joining Date</label>
                            <input type="date" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Salary</label>
                            <input type="number" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="60000" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                            <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                        >
                            Save Employee
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
