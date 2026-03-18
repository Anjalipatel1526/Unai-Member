import React from 'react';
import { Card, Badge, ProgressBar } from '../components/SaaSBase';
import { systemLogs, systemMetrics } from '../data/mockData';
import { Server, Activity, Database, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export const Monitoring = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Monitoring</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time platform health and infrastructure logs.</p>
                </div>
                <Badge status="success" className="px-4 py-1.5 text-sm">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                        Live Updates
                    </span>
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 border-t-4 border-t-emerald-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Server className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Server Status</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.serverStatus}</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Active Sessions</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeSessions.toLocaleString()}</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Database className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-gray-700">API Response Time</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.apiResponseTime}</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-rose-500">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Error Logs Counter</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">124 <span className="text-xs font-normal text-gray-500">/ last 24h</span></p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Resource Allocation</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">CPU Usage</span>
                                <span className="font-bold text-gray-900">42%</span>
                            </div>
                            <ProgressBar progress={42} className="[&>div]:bg-blue-500" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">Memory</span>
                                <span className="font-bold text-gray-900">8.4 / 16 GB</span>
                            </div>
                            <ProgressBar progress={68} className="[&>div]:bg-indigo-500" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">Storage Clusters</span>
                                <span className="font-bold text-gray-900">81%</span>
                            </div>
                            <ProgressBar progress={81} className="[&>div]:bg-amber-500" />
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-2 flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">System Logs Timeline</h2>
                        <select className="text-sm border-gray-200 rounded-lg py-1 pl-2 pr-6 outline-none bg-gray-50">
                            <option>All Severities</option>
                            <option>Errors</option>
                            <option>Warnings</option>
                        </select>
                    </div>

                    <div className="p-6 flex-1 bg-gray-50/50">
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
                            {systemLogs.map((log, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 
                     bg-white"
                                    >
                                        {log.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                                        {log.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                        {log.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                                    </div>

                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col group-hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-gray-400">{log.time}</span>
                                            <Badge status={log.type === 'error' ? 'danger' : log.type === 'warning' ? 'warning' : 'primary'} className="text-[10px] px-1.5 py-0">
                                                {log.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{log.service}</p>
                                        <p className="text-sm text-gray-600">{log.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
