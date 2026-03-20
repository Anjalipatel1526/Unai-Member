import { FileText, Download, Upload, MoreVertical, FileCode, FileArchive } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { useHRData } from '../../hooks/useHRData';

export function DocumentGrid() {
    const { documents, loading } = useHRData();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                    <p className="text-gray-500 text-sm">Access and manage organization-wide employee documents.</p>
                </div>
                <Button variant="primary" icon={<Upload size={18} />}>
                    Upload New
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <Card key={doc.id} className="group hover:border-indigo-100 p-0">
                            <div className="bg-gray-50/50 p-6 flex flex-col items-center border-b border-gray-100 relative">
                                <button className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-gray-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                    <MoreVertical size={16} />
                                </button>
                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 ring-1 ring-gray-100 group-hover:scale-110 transition-transform">
                                    {doc.type === 'Offer Letter' ? <FileText className="text-indigo-500" size={32} /> :
                                        doc.type === 'Certificate' ? <FileCode className="text-emerald-500" size={32} /> :
                                            <FileArchive className="text-amber-500" size={32} />}
                                </div>
                                <Badge variant="primary" className="mb-1">{doc.type}</Badge>
                                <h3 className="text-sm font-bold text-gray-900 text-center truncate w-full px-2" title={doc.title}>
                                    {doc.title}
                                </h3>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-400">Uploaded {doc.date}</span>
                                <Button variant="ghost" size="sm" icon={<Download size={16} />} className="text-indigo-600 hover:bg-indigo-50">
                                    Get
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        No documents found.
                    </div>
                )}
            </div>
        </div>
    );
}
