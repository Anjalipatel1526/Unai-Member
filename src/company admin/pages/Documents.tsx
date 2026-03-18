import React from 'react';
import { UploadCloud, FileText, Download, Trash2, FolderArchive, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { useCompanyData } from '../data/CompanyContext';

export function Documents() {
    const { documents } = useCompanyData();
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Documents Hub</h2>
                    <p className="text-sm text-gray-500">Manage company policies, employee records, and assets.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    <UploadCloud size={16} />
                    Upload Document
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {documents.map((doc: any) => (
                    <Card key={doc.id} className="group relative overflow-hidden">
                        <CardContent className="p-0">
                            <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100 group-hover:bg-gray-100 transition-colors">
                                {doc.type === 'Offer Letter' ? (
                                    <FileText className="h-10 w-10 text-indigo-300" />
                                ) : doc.type === 'Payslip' ? (
                                    <FileText className="h-10 w-10 text-emerald-300" />
                                ) : (
                                    <ImageIcon className="h-10 w-10 text-amber-300" />
                                )}
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-gray-900 truncate" title={doc.title}>
                                    {doc.title}
                                </h4>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                        {doc.type}
                                    </span>
                                    <span className="text-xs text-gray-400">{doc.date}</span>
                                </div>
                            </div>

                            {/* Hover Actions overlay */}
                            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                <button className="p-2 bg-white rounded-full text-gray-700 hover:text-indigo-600 transition-colors" title="Download">
                                    <Download size={18} />
                                </button>
                                <button className="p-2 bg-white rounded-full text-gray-700 hover:text-amber-600 transition-colors" title="Archive">
                                    <FolderArchive size={18} />
                                </button>
                                <button className="p-2 bg-white rounded-full text-gray-700 hover:text-rose-600 transition-colors" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Empty Add Placeholder Card */}
                <Card className="border-2 border-dashed border-gray-200 bg-transparent hover:bg-gray-50 hover:border-indigo-300 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]">
                    <UploadCloud className="h-10 w-10 text-gray-300 mb-3" />
                    <span className="font-medium text-gray-600">Drop files here</span>
                    <span className="text-xs text-gray-400 mt-1">or click to browse</span>
                </Card>
            </div>
        </div>
    );
}
