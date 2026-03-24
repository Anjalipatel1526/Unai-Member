import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Mail, Phone, MapPin, Calendar, Briefcase, Building, Edit3, Save } from 'lucide-react';
import { employeeProfile } from '../data/mockData';

export function Profile() {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(employeeProfile);

    const handleSave = () => {
        setEditing(false);
        alert('Profile updated successfully!');
    };

    const InputField = ({ label, value, field }: { label: string; value: string; field: string }) => (
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
            {editing ? (
                <input type="text" value={value} onChange={e => setProfile({ ...profile, [field]: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            ) : (
                <p className="text-sm font-bold text-gray-900">{value}</p>
            )}
        </div>
    );

    const DetailItem = ({ icon, color, label, value }: { icon: React.ReactNode; color: string; label: string; value: string }) => (
        <div className="flex items-start gap-3">
            <div className={`p-2 ${color} rounded-lg`}>{icon}</div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage your personal information</p>
                </div>
                {!editing ? (
                    <Button icon={<Edit3 size={16} />} variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
                ) : (
                    <Button icon={<Save size={16} />} onClick={handleSave}>Save Changes</Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <Avatar src={profile.avatar} alt={profile.name} size="xl" className="ring-4 ring-indigo-50" />
                            {editing && (
                                <button className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors">
                                    <Edit3 size={12} />
                                </button>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-sm text-indigo-600 font-medium mt-1">{profile.designation}</p>
                        <Badge variant="success" className="mt-3">{profile.status}</Badge>
                        <div className="w-full mt-6 pt-6 border-t border-gray-50 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600"><Mail size={18} className="text-gray-400" />{profile.email}</div>
                            <div className="flex items-center gap-3 text-sm text-gray-600"><Phone size={18} className="text-gray-400" />{profile.phone}</div>
                            <div className="flex items-center gap-3 text-sm text-gray-600"><MapPin size={18} className="text-gray-400" />{profile.location}</div>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <Card title="Personal Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField label="Full Name" value={profile.name} field="name" />
                            <InputField label="Email" value={profile.email} field="email" />
                            <InputField label="Phone" value={profile.phone} field="phone" />
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location</label>
                                <p className="text-sm font-bold text-gray-900">{profile.location}</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Employment Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <DetailItem icon={<Briefcase size={16} className="text-indigo-600" />} color="bg-indigo-50" label="Department" value={profile.department} />
                            <DetailItem icon={<Building size={16} className="text-amber-600" />} color="bg-amber-50" label="Designation" value={profile.designation} />
                            <DetailItem icon={<Calendar size={16} className="text-emerald-600" />} color="bg-emerald-50" label="Joining Date" value={profile.joining_date} />
                            <DetailItem icon={<Briefcase size={16} className="text-sky-600" />} color="bg-sky-50" label="Employee ID" value={profile.employee_id} />
                            <DetailItem icon={<Briefcase size={16} className="text-rose-600" />} color="bg-rose-50" label="Manager" value={profile.manager} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
