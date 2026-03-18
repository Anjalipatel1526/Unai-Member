import React from 'react';
import { Card, Button } from '../components/SaaSBase';
import { Image, Save, ShieldCheck } from 'lucide-react';

export const Settings = () => {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Configure white-labeling, communications, and global preferences.</p>
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Image className="w-5 h-5 text-gray-400" /> Branding
                </h2>
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        Logo
                    </div>
                    <div>
                        <Button variant="outline" size="sm" className="mb-2">Upload Platform Logo</Button>
                        <p className="text-xs text-gray-500">Recommended: 512x512px SVG or PNG.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-600 shadow-inner"></div>
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" defaultValue="#4f46e5" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" defaultValue="Unai Member HR" />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gray-400" /> Infrastructure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">System Timezone</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                            <option>UTC (Coordinated Universal Time)</option>
                            <option>EST (Eastern Standard Time)</option>
                            <option>PST (Pacific Standard Time)</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Email Delivery (SMTP)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="SMTP Host (e.g. smtp.mailgun.org)" />
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Port (e.g. 587)" />
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Username" />
                            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Password" />
                        </div>
                    </div>
                    <div className="md:col-span-2 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Gateway (Stripe)</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Publishable Key (pk_test_...)" />
                            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Secret Key (sk_test_...)" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex justify-end pt-4 pb-8">
                <Button size="lg" icon={Save}>Save Platform Configuration</Button>
            </div>
        </div>
    );
};
