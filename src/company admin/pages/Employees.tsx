import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Eye, Edit, Trash2, KeyRound, Mail, Lock, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import { useCompanyData } from '../data/CompanyContext';
import { supabase } from '../../lib/supabase';

export function Employees() {
    const { employees } = useCompanyData();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [credentials, setCredentials] = useState<any[]>([]);
    const [selectedCredential, setSelectedCredential] = useState<any>(null);
    const [credForm, setCredForm] = useState({ employee_name: '', work_email: '', password: '', department: '', designation: '' });
    const [copiedField, setCopiedField] = useState('');
    const navigate = useNavigate();

    // Fetch all credentials
    useEffect(() => {
        const fetchCredentials = async () => {
            const { data } = await supabase
                .from('employee_credentials')
                .select('*')
                .eq('company_id', 'COMP_001');
            if (data) setCredentials(data);
        };
        fetchCredentials();

        // Realtime
        const channel = supabase
            .channel('employee_credentials_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'employee_credentials' }, () => {
                fetchCredentials();
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get credential for an employee
    const getCredential = (empId: string) => credentials.find(c => c.employee_id === empId);

    // Copy to clipboard
    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    // Handle saving new employee with credentials
    const handleSaveEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const workEmail = formData.get('work_email') as string;
        const password = formData.get('emp_password') as string;
        const fullName = formData.get('full_name') as string;
        const department = formData.get('department') as string;
        const role = formData.get('role') as string;

        if (workEmail && password) {
            const { error } = await supabase.from('employee_credentials').insert({
                company_id: 'COMP_001',
                employee_name: fullName,
                work_email: workEmail,
                password: password,
                department: department || '',
                designation: role || '',
                status: 'active',
            });

            if (error) {
                alert('Error creating credentials: ' + error.message);
                return;
            }
        }

        setIsAddModalOpen(false);
        form.reset();
    };

    // Handle manage credentials modal
    const openCredentialModal = (emp: any) => {
        const existing = getCredential(emp.id);
        if (existing) {
            setSelectedCredential(existing);
            setCredForm({
                employee_name: existing.employee_name,
                work_email: existing.work_email,
                password: existing.password,
                department: existing.department || '',
                designation: existing.designation || '',
            });
        } else {
            setSelectedCredential(null);
            setCredForm({
                employee_name: emp.name || '',
                work_email: '',
                password: '',
                department: emp.department || '',
                designation: emp.role || '',
            });
        }
        setIsCredentialModalOpen(true);
    };

    // Save/update credential
    const handleSaveCredential = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!credForm.work_email || !credForm.password) {
            alert('Work email and password are required');
            return;
        }

        if (selectedCredential) {
            // Update existing
            const { error } = await supabase
                .from('employee_credentials')
                .update({
                    work_email: credForm.work_email,
                    password: credForm.password,
                    employee_name: credForm.employee_name,
                    department: credForm.department,
                    designation: credForm.designation,
                })
                .eq('id', selectedCredential.id);

            if (error) { alert('Error: ' + error.message); return; }
        } else {
            // Insert new
            const { error } = await supabase.from('employee_credentials').insert({
                company_id: 'COMP_001',
                employee_name: credForm.employee_name,
                work_email: credForm.work_email,
                password: credForm.password,
                department: credForm.department,
                designation: credForm.designation,
                status: 'active',
            });

            if (error) { alert('Error: ' + error.message); return; }
        }

        setIsCredentialModalOpen(false);
    };

    // Handle delete employee (cascading)
    const handleDeleteEmployee = async (emp: any) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${emp.name}? This will also remove their login credentials and all associated data.`);
        if (!confirmed) return;

        try {
            // 1. Delete from employee_credentials
            await supabase
                .from('employee_credentials')
                .delete()
                .eq('company_id', 'COMP_001')
                .eq('employee_name', emp.name);

            // 2. Delete from company_employees
            const { error } = await supabase
                .from('company_employees')
                .delete()
                .eq('id', emp.id);

            if (error) {
                alert('Error deleting employee: ' + error.message);
                return;
            }

            // Remove from local credentials state
            setCredentials(prev => prev.filter(c => c.employee_name !== emp.name));
            alert(`${emp.name} has been deleted successfully.`);
        } catch (err: any) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
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
                                <TableHead>Work Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((emp) => {
                                const cred = getCredential(emp.id);
                                return (
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
                                        <TableCell>
                                            {cred ? (
                                                <span className="text-sm text-indigo-600 font-medium">{cred.work_email}</span>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Not assigned</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{emp.department}</TableCell>
                                        <TableCell>
                                            <Badge variant="info">{emp.role}</Badge>
                                        </TableCell>
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
                                                <button
                                                    onClick={() => openCredentialModal(emp)}
                                                    className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Manage Credentials"
                                                >
                                                    <KeyRound size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEmployee(emp)}
                                                    className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add Employee Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Employee"
            >
                <form className="space-y-4" onSubmit={handleSaveEmployee}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input name="full_name" type="text" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Personal Email</label>
                            <input name="personal_email" type="email" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            <input name="phone" type="text" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="+1 234 567 890" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <select name="department" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
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
                            <select name="role" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                                <option>Employee</option>
                                <option>Manager</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Joining Date</label>
                            <input name="joining_date" type="date" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Salary</label>
                            <input name="salary" type="number" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="60000" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                            <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        </div>
                    </div>

                    {/* Work Credentials Section */}
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <KeyRound size={16} className="text-indigo-600" />
                            <h4 className="text-sm font-bold text-gray-900">Employee Login Credentials</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Work Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={14} className="text-gray-400" />
                                    </div>
                                    <input name="work_email" type="email" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="john@unaitech.com" required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={14} className="text-gray-400" />
                                    </div>
                                    <input name="emp_password" type="text" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="Enter password" required />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Employee will use these credentials to log in to their self-service portal.</p>
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

            {/* Manage Credentials Modal */}
            <Modal
                isOpen={isCredentialModalOpen}
                onClose={() => setIsCredentialModalOpen(false)}
                title={selectedCredential ? 'Manage Credentials' : 'Create Credentials'}
            >
                <form className="space-y-4" onSubmit={handleSaveCredential}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Employee Name</label>
                        <input
                            type="text"
                            value={credForm.employee_name}
                            onChange={e => setCredForm({ ...credForm, employee_name: e.target.value })}
                            className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 bg-gray-50"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <input
                                type="text"
                                value={credForm.department}
                                onChange={e => setCredForm({ ...credForm, department: e.target.value })}
                                className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Designation</label>
                            <input
                                type="text"
                                value={credForm.designation}
                                onChange={e => setCredForm({ ...credForm, designation: e.target.value })}
                                className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Work Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={14} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={credForm.work_email}
                                onChange={e => setCredForm({ ...credForm, work_email: e.target.value })}
                                className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 pl-9 pr-10 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
                                placeholder="employee@unaitech.com"
                                required
                            />
                            {credForm.work_email && (
                                <button type="button" onClick={() => copyToClipboard(credForm.work_email, 'email')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600">
                                    {copiedField === 'email' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={14} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={credForm.password}
                                onChange={e => setCredForm({ ...credForm, password: e.target.value })}
                                className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 pl-9 pr-10 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
                                placeholder="Enter password"
                                required
                            />
                            {credForm.password && (
                                <button type="button" onClick={() => copyToClipboard(credForm.password, 'password')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600">
                                    {copiedField === 'password' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Share these credentials with the employee to enable portal access.</p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsCredentialModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                        >
                            {selectedCredential ? 'Update Credentials' : 'Create Credentials'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
