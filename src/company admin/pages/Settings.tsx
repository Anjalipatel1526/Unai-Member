import React, { useState } from 'react';
import { Building, Shield, Palette, Globe, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { useCompanyData } from '../data/CompanyContext';

export function Settings() {
    const { company } = useCompanyData();
    const [activeTab, setActiveTab] = useState<'profile' | 'roles' | 'preferences'>('profile');

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h2>
                    <p className="text-sm text-gray-500">Manage company profile, user permissions, and preferences.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    <Save size={16} />
                    Save Changes
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Navigation Sidebar */}
                <div className="w-full lg:w-64 shrink-0 space-y-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                        <Building size={18} /> Company Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'roles' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                        <Shield size={18} /> Roles & Permissions
                    </button>
                    <button
                        onClick={() => setActiveTab('preferences')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'preferences' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                        <Palette size={18} /> System Preferences
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <Card>
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle>Company Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div className="flex items-center gap-6">
                                    <div className="h-20 w-20 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200">
                                        <span className="text-2xl font-bold text-indigo-600">{company.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Company Logo</h3>
                                        <p className="text-xs text-gray-500 mb-2">Recommended size 256x256px</p>
                                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                                            Change Logo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Company Name</label>
                                        <input type="text" defaultValue={company.name} className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Registration ID</label>
                                        <input type="text" defaultValue={company.id} className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 bg-gray-50" readOnly />
                                    </div>
                                    <div className="space-y-1 sm:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Address</label>
                                        <input type="text" defaultValue="123 Tech Park, Innovation Valley" className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'roles' && (
                        <Card>
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle>Role Permission Matrix</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Module</TableHead>
                                            <TableHead className="text-center">Admin</TableHead>
                                            <TableHead className="text-center">Manager</TableHead>
                                            <TableHead className="text-center">Employee</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {['Employees', 'Attendance', 'Leave', 'Payroll', 'Performance'].map((module, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium text-gray-900">{module}</TableCell>
                                                <TableCell className="text-center">
                                                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <input type="checkbox" defaultChecked={idx !== 3} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <input type="checkbox" defaultChecked={idx === 1 || idx === 2} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'preferences' && (
                        <Card>
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle>System & Branding</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Globe size={16} /> Timezone
                                        </label>
                                        <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                                            <option>UTC (Coordinated Universal Time)</option>
                                            <option>EST (Eastern Standard Time)</option>
                                            <option>PST (Pacific Standard Time)</option>
                                            <option>IST (Indian Standard Time)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Date Format</label>
                                        <select className="w-full rounded-lg border-gray-200 ring-1 ring-inset ring-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600">
                                            <option>MM/DD/YYYY</option>
                                            <option>DD/MM/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Theme Settings</h4>
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                        <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>
            </div>
        </div>
    );
}
