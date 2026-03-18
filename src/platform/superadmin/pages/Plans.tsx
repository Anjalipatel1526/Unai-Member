import React, { useState } from 'react';
import { Card, Button, Toggle, Modal, Badge } from '../components/SaaSBase';
import { plansData } from '../data/mockData';
import { Plus, Check, Settings2 } from 'lucide-react';

export const Plans = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plans, setPlans] = useState(plansData);

    const togglePlan = (id: string, currentStatus: boolean) => {
        setPlans(plans.map(p => p.id === id ? { ...p, isActive: !currentStatus } : p));
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Subscription Plans</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure pricing tiers and feature limits for your SaaS platform.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
                    Create New Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id} className={`flex flex-col relative transition-all duration-300 ${!plan.isActive ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-lg hover:-translate-y-1'}`}>
                        {!plan.isActive && <div className="absolute inset-0 bg-gray-50/50 z-10 rounded-xl" />}

                        <div className="p-6 border-b border-gray-100 bg-gray-50/30 rounded-t-xl relative z-20">
                            <div className="flex justify-between items-start mb-4">
                                <Badge status={plan.name === 'Enterprise' ? 'primary' : 'neutral'} className="text-xs px-2.5 py-1">
                                    {plan.name}
                                </Badge>
                                <Toggle enabled={plan.isActive} onChange={() => togglePlan(plan.id, plan.isActive)} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                <span className="text-gray-500 text-sm font-medium">/ {plan.period}</span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col relative z-20">
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-primary-50/50 rounded-lg">
                                <div>
                                    <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">Max Users</p>
                                    <p className="text-sm font-bold text-gray-900">{plan.limit}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">Storage</p>
                                    <p className="text-sm font-bold text-gray-900">{plan.storage}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-1 mb-8">
                                {plan.features && plan.features.map((feat: any, i: number) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{feat}</span>
                                    </li>
                                ))}
                            </div>

                            <Button variant="outline" className="w-full mt-auto" icon={Settings2}>
                                Edit Plan Settings
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Pricing Plan">
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="e.g. Starter" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price ($)</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="49" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Employees</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="100" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Limit</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="e.g. 50GB" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Level</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white">
                            <option>Email Support only</option>
                            <option>Priority Email & Chat</option>
                            <option>24/7 Phone & Dedicated AM</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Included Features (Comma separated)</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                            rows={3}
                            placeholder="Core HR, Payroll, Performance Reviews..."
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Plan</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
