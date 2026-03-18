import React, { useState, useEffect } from 'react';
import { Card, Badge, ProgressBar, Button } from '../components/SaaSBase';
import { supabase } from '../../../lib/supabase';
import { Server, Activity, Database, AlertTriangle, Info, Plus } from 'lucide-react';

export const Monitoring = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All Severities');

    const fetchLogs = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('system_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50); // Only show last 50 for performance

        if (data) setLogs(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchLogs();

        const channel = supabase
            .channel('logs-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'system_logs' }, () => {
                fetchLogs();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const generateLog = async (type: string) => {
        let msg = '';
        let service = '';
        if (type === 'error') {
            msg = 'Database connection timeout ' + Math.floor(Math.random() * 900) + 'ms';
            service = 'DB Cluster';
        } else if (type === 'warning') {
            msg = 'High memory usage detected ' + (80 + Math.floor(Math.random() * 20)) + '%';
            service = 'Worker Node ' + Math.floor(Math.random() * 5 + 1);
        } else {
            msg = 'Automated backup completed successfully';
            service = 'Backup Service';
        }

        await supabase.from('system_logs').insert([{
            type,
            message: msg,
            service
        }]);
    };

    const clearLogs = async () => {
        if (window.confirm('Delete all system logs?')) {
            await supabase.from('system_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all trick
            fetchLogs();
        }
    };

    const filteredLogs = logs.filter(log => {
        if (filter === 'All Severities') return true;
        if (filter === 'Errors') return log.type === 'error';
        if (filter === 'Warnings') return log.type === 'warning';
        return true;
    });

    const errorCount = logs.filter(l => l.type === 'error').length;

    return (
        <div className="space-y-6">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Monitoring</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time platform health and infrastructure logs.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-red-500 bg-red-50 hover:bg-red-100" size="sm" onClick={() => generateLog('error')}>+ Error</Button>
                    <Button variant="ghost" className="text-amber-500 bg-amber-50 hover:bg-amber-100" size="sm" onClick={() => generateLog('warning')}>+ Warning</Button>
                    <Button variant="ghost" className="text-blue-500 bg-blue-50 hover:bg-blue-100" size="sm" onClick={() => generateLog('info')}>+ Info</Button>
                    <Button variant="ghost" size="sm" onClick={clearLogs}>Clear Logs</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 border-t-4 border-t-emerald-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Server className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Server Status</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">Operational</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Active Sessions</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">1,450</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                        <Database className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-gray-700">API Response Time</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">124ms</p>
                </Card>

                <Card className="p-5 border-t-4 border-t-rose-500">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Error Logs Counter</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{errorCount} <span className="text-xs font-normal text-gray-500">/ recorded</span></p>
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

                <Card className="lg:col-span-2 flex flex-col h-[600px]">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 w-full">
                        <h2 className="text-lg font-semibold text-gray-900">System Logs Timeline</h2>
                        <div className="flex items-center gap-3">
                            <Badge status="success" className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live Sync
                                </span>
                            </Badge>
                            <select
                                className="text-sm border-gray-200 rounded-lg py-1 pl-2 pr-8 outline-none focus:ring-2 focus:ring-primary-500"
                                value={filter} onChange={e => setFilter(e.target.value)}
                            >
                                <option>All Severities</option>
                                <option>Errors</option>
                                <option>Warnings</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-6 flex-1 bg-gray-50/50 overflow-y-auto w-full">
                        {isLoading ? (
                            <div className="text-center text-gray-500 py-10">Loading logs from database...</div>
                        ) : filteredLogs.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">No system logs recorded yet.</div>
                        ) : (
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
                                {filteredLogs.map((log, i) => (
                                    <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 bg-white">
                                            {log.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                                            {log.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                            {log.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                                        </div>

                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col group-hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-bold text-gray-400">{new Date(log.created_at).toLocaleTimeString()}</span>
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
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
