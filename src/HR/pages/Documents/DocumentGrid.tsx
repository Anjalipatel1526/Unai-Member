import { FileText, Download, Upload, Trash2, Folder, ChevronLeft, FileCode, FileArchive } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { useHRData } from '../../hooks/useHRData';
import { supabase } from '../../../lib/supabase';
import React, { useState, useMemo } from 'react';

export function DocumentGrid() {
    const { documents, loading, refreshData } = useHRData();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Grouping Logic
    const employeeFolders = useMemo(() => {
        const groups: { [key: string]: { id: string; name: string; docs: any[] } } = {};

        documents.forEach(doc => {
            // Fallback for legacy data without employee_id: parse from title
            const empId = doc.employee_id || 'unassigned';
            const empName = doc.employee_name || (doc.title.includes(' - ') ? doc.title.split(' - ')[0] : 'Unassigned');

            if (!groups[empId]) {
                groups[empId] = { id: empId, name: empName, docs: [] };
            }
            groups[empId].docs.push(doc);
        });

        return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
    }, [documents]);

    const currentFolder = useMemo(() =>
        employeeFolders.find(f => f.id === selectedEmployeeId),
        [employeeFolders, selectedEmployeeId]);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this document?')) return;

        setDeletingId(id);
        try {
            const { error } = await supabase.from('company_documents').delete().eq('id', id);
            if (error) throw error;
            await refreshData();
        } catch (err: any) {
            alert('Error deleting document: ' + err.message);
        } finally {
            setDeletingId(null);
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        {selectedEmployeeId && (
                            <button
                                onClick={() => setSelectedEmployeeId(null)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-2xl font-bold text-gray-900">
                            {selectedEmployeeId ? currentFolder?.name : 'Employee Documents'}
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {selectedEmployeeId
                            ? `Managing ${currentFolder?.docs.length} documents for this employee.`
                            : 'Grouped by employee for better organization.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {!selectedEmployeeId ? (
                    // Folder View
                    employeeFolders.map((folder) => (
                        <Card
                            key={folder.id}
                            className="group hover:border-indigo-200 cursor-pointer p-0 transition-all hover:shadow-md"
                            onClick={() => setSelectedEmployeeId(folder.id)}
                        >
                            <div className="p-8 flex flex-col items-center">
                                <div className="h-20 w-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                                    <Folder className="text-indigo-600 group-hover:text-white transition-colors" size={40} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 text-center mb-1">{folder.name}</h3>
                                <Badge variant="secondary">{folder.docs.length} Documents</Badge>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 flex items-center justify-center border-t border-gray-100 rounded-b-xl">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open Folder</span>
                            </div>
                        </Card>
                    ))
                ) : (
                    // File View (Drill-down)
                    currentFolder?.docs.map((doc) => (
                        <Card key={doc.id} className="group hover:border-indigo-100 p-0 relative">
                            <button
                                onClick={(e) => handleDelete(doc.id, e)}
                                disabled={deletingId === doc.id}
                                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="bg-gray-50/50 p-6 flex flex-col items-center border-b border-gray-100">
                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 ring-1 ring-gray-100 group-hover:scale-110 transition-transform">
                                    {doc.type === 'Offer Letter' ? <FileText className="text-indigo-500" size={32} /> :
                                        doc.type === 'Certificate' ? <FileCode className="text-emerald-500" size={32} /> :
                                            <FileArchive className="text-amber-500" size={32} />}
                                </div>
                                <Badge variant="primary" className="mb-1">{doc.type}</Badge>
                                <h3 className="text-sm font-bold text-gray-900 text-center truncate w-full px-2">
                                    {doc.title.includes(' - ') ? doc.title.split(' - ')[1] : doc.title}
                                </h3>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-400">{doc.date}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={<Download size={16} />}
                                    className="text-indigo-600"
                                    onClick={() => alert('Downloading...')}
                                >
                                    Get
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {!loading && documents.length === 0 && (
                <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                    <Folder size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">No documents or folders found.</p>
                </div>
            )}
        </div>
    );
}
