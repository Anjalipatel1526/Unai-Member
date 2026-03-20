import React from 'react';
import { Camera, Mail, Phone, Lock, Save } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

export function AssistantProfile() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            <Avatar size="xl" alt="Assistant HR" className="ring-4 ring-indigo-50" />
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-indigo-600 hover:text-indigo-700 transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Assistant HR</h3>
                        <p className="text-sm text-gray-500 font-medium">Assistant Human Resources</p>
                    </div>

                    <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Role Information</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                <div className="h-5 w-5 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">✓</div>
                                Add Employees
                            </li>
                            <li className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-gray-400">
                                <div className="h-5 w-5 bg-gray-100 rounded flex items-center justify-center">×</div>
                                <span className="line-through">Access Payroll</span>
                            </li>
                        </ul>
                    </div>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <Card title="Personal Information">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Display Name</label>
                                    <input type="text" defaultValue="Assistant HR" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                    <input type="email" defaultValue="assistant@unaitech.com" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Phone</label>
                                    <input type="text" defaultValue="+1 234 567 890" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button variant="primary" icon={<Save size={18} />}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Card>

                    <Card title="Change Password">
                        <form className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Current Password</label>
                                <input type="password" placeholder="••••••••" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border-none ring-1 ring-gray-200 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button variant="secondary" icon={<Lock size={18} />}>
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
