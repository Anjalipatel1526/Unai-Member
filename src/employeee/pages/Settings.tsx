import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { Lock, Save, Bell, Moon, Shield, Eye, EyeOff } from 'lucide-react';

export function Settings() {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [leaveNotifs, setLeaveNotifs] = useState(true);
    const [payslipNotifs, setPayslipNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Password */}
                <Card title="Change Password">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                    required
                                    placeholder="Enter current password"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm new password"
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <Button type="submit" icon={<Lock size={16} />} className="w-full">
                            Update Password
                        </Button>
                    </form>
                </Card>

                {/* Notifications & Theme */}
                <div className="space-y-6">
                    <Card title="Notifications">
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg"><Bell size={16} className="text-indigo-600" /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Email Notifications</p>
                                        <p className="text-xs text-gray-400">Receive updates via email</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={emailNotifs} onChange={setEmailNotifs} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 rounded-lg"><Bell size={16} className="text-emerald-600" /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Push Notifications</p>
                                        <p className="text-xs text-gray-400">Browser push alerts</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={pushNotifs} onChange={setPushNotifs} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg"><Shield size={16} className="text-amber-600" /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Leave Updates</p>
                                        <p className="text-xs text-gray-400">Leave approval notifications</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={leaveNotifs} onChange={setLeaveNotifs} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-sky-50 rounded-lg"><Shield size={16} className="text-sky-600" /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Payslip Alerts</p>
                                        <p className="text-xs text-gray-400">New payslip available</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={payslipNotifs} onChange={setPayslipNotifs} />
                            </div>
                        </div>
                    </Card>

                    <Card title="Appearance">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg"><Moon size={16} className="text-gray-600" /></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Dark Mode</p>
                                    <p className="text-xs text-gray-400">Switch to dark theme</p>
                                </div>
                            </div>
                            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
