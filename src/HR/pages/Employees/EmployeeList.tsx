import { Plus, Search, Filter, Eye, UserPlus, Link as LinkIcon, Check, KeyRound, Mail, Lock } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from '../../components/Table';
import { Modal } from '../../components/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHRData } from '../../hooks/useHRData';
import { supabase } from '../../../lib/supabase';

export function EmployeeList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { employees, loading, refreshData } = useHRData();
    const [isSaving, setIsSaving] = useState(false);
    const [credentials, setCredentials] = useState<any[]>([]);
    const [isCredModalOpen, setIsCredModalOpen] = useState(false);
    const [viewingCred, setViewingCred] = useState<any>(null);

    // Fetch employee credentials
    useEffect(() => {
        const fetchCreds = async () => {
            const { data } = await supabase
                .from('employee_credentials')
                .select('*')
                .eq('company_id', 'COMP_001');
            if (data) setCredentials(data);
        };
        fetchCreds();
    }, []);

    const getCredential = (empId: string) => credentials.find(c => c.employee_id === empId || c.employee_name === employees.find(e => e.id === empId)?.name);

    const openCredModal = (emp: any) => {
        const cred = getCredential(emp.id);
        setViewingCred(cred || null);
        setIsCredModalOpen(true);
    };

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: 'Engineering',
        role: 'Developer',
        joining_date: new Date().toISOString().split('T')[0]
    });

    const [copied, setCopied] = useState(false);

    const copyOnboardingLink = () => {
        const link = `${window.location.origin}/onboarding`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return alert('Please fill in name and email');

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('company_employees')
                .insert([{
                    ...formData,
                    status: 'Active',
                    company_id: 'COMP_001', // Default for now, should ideally come from auth context
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
                }]);

            if (error) throw error;

            await refreshData();
            setIsModalOpen(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                department: 'Engineering',
                role: 'Developer',
                joining_date: new Date().toISOString().split('T')[0]
            });
        } catch (err: any) {
            console.error('Error saving employee:', err);
            alert('Error saving employee: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage organization employees and their profiles.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        icon={copied ? <Check size={18} /> : <LinkIcon size={18} />}
                        onClick={copyOnboardingLink}
                    >
                        {copied ? 'Link Copied!' : 'Copy Onboarding Link'}
                    </Button>
                    <Button
                        variant="primary"
                        icon={<UserPlus size={18} />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Employee
                    </Button>
                </div>
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
                        {employees.length > 0 ? (
                            employees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={emp.avatar} alt={emp.name} size="sm" />
                                            <span className="font-bold text-gray-900">{emp.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-500">{emp.id.substring(0, 8)}</TableCell>
                                    <TableCell>{emp.department}</TableCell>
                                    <TableCell>
                                        <Badge variant="primary">{emp.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link to={`/assistant-hr/employees/${emp.id}`}>
                                                <Button variant="ghost" size="sm" icon={<Eye size={16} />}>View</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" icon={<KeyRound size={16} />} onClick={() => openCredModal(emp)}>Credentials</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                                    No employees found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Employee"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSaving}>Cancel</Button>
                        <Button variant="primary" onClick={handleSaveEmployee} isLoading={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Employee'}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleSaveEmployee} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@company.com"
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 234..."
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            >
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>HR</option>
                                <option>Finance</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            >
                                <option>Developer</option>
                                <option>Designer</option>
                                <option>Manager</option>
                                <option>Analyst</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Joining Date</label>
                            <input
                                type="date"
                                value={formData.joining_date}
                                onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                                className="w-full rounded-xl border-gray-200 ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                            />
                        </div>
                    </div>
                </form>
            </Modal>

            {/* View Credentials Modal (Read-Only) */}
            <Modal
                isOpen={isCredModalOpen}
                onClose={() => setIsCredModalOpen(false)}
                title="Employee Credentials"
                footer={
                    <Button variant="outline" onClick={() => setIsCredModalOpen(false)}>Close</Button>
                }
            >
                {viewingCred ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Employee</p>
                            <p className="text-sm font-semibold text-gray-900">{viewingCred.employee_name}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work Email</label>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                <Mail size={14} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 select-all">{viewingCred.work_email}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                <Lock size={14} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 select-all">{viewingCred.password}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</label>
                                <p className="text-sm text-gray-700">{viewingCred.department || '—'}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Designation</label>
                                <p className="text-sm text-gray-700">{viewingCred.designation || '—'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                            <Badge variant="success">Active</Badge>
                            <span className="text-xs text-emerald-700">Created: {new Date(viewingCred.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <KeyRound size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm text-gray-400">No credentials assigned to this employee yet.</p>
                        <p className="text-xs text-gray-400 mt-1">The Company Owner needs to create login credentials first.</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
