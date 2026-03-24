import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Download, Eye, FileText, Award, CreditCard, Shield, Heart, MapPin } from 'lucide-react';
import { documents } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
    'file-text': <FileText size={28} className="text-indigo-500" />,
    'award': <Award size={28} className="text-amber-500" />,
    'id-card': <CreditCard size={28} className="text-sky-500" />,
    'shield': <Shield size={28} className="text-emerald-500" />,
    'heart': <Heart size={28} className="text-rose-500" />,
    'map-pin': <MapPin size={28} className="text-violet-500" />,
};

const iconBg: Record<string, string> = {
    'file-text': 'bg-indigo-50',
    'award': 'bg-amber-50',
    'id-card': 'bg-sky-50',
    'shield': 'bg-emerald-50',
    'heart': 'bg-rose-50',
    'map-pin': 'bg-violet-50',
};

export function Documents() {
    const [previewDoc, setPreviewDoc] = useState<typeof documents[0] | null>(null);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                <p className="text-sm text-gray-500 mt-1">View and download your personal documents</p>
            </div>

            {/* Document Grid */}
            {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {documents.map(doc => (
                        <Card key={doc.id} className="group hover:border-indigo-200 transition-colors">
                            <div className="flex flex-col items-center text-center">
                                <div className={`p-4 rounded-2xl ${iconBg[doc.icon] || 'bg-gray-50'} mb-4 group-hover:scale-110 transition-transform`}>
                                    {iconMap[doc.icon] || <FileText size={28} className="text-gray-400" />}
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">{doc.name}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="default">{doc.type}</Badge>
                                    <span className="text-xs text-gray-400">{doc.size}</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-4">Uploaded: {doc.date}</p>
                                <div className="flex gap-2 w-full">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        icon={<Eye size={14} />}
                                        className="flex-1"
                                        onClick={() => setPreviewDoc(doc)}
                                    >
                                        Preview
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        icon={<Download size={14} />}
                                        className="flex-1"
                                        onClick={() => alert('Downloading: ' + doc.name)}
                                    >
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <div className="text-center py-12 text-gray-400">
                        <FileText size={40} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-sm font-medium">No documents available</p>
                        <p className="text-xs mt-1">Documents will appear here once uploaded</p>
                    </div>
                </Card>
            )}

            {/* Preview Modal */}
            <Modal
                isOpen={!!previewDoc}
                onClose={() => setPreviewDoc(null)}
                title={previewDoc?.name || 'Document Preview'}
                footer={
                    <Button icon={<Download size={16} />} onClick={() => alert('Downloading: ' + previewDoc?.name)}>
                        Download
                    </Button>
                }
            >
                {previewDoc && (
                    <div className="text-center py-12">
                        <div className={`inline-flex p-6 rounded-3xl ${iconBg[previewDoc.icon] || 'bg-gray-50'} mb-6`}>
                            {iconMap[previewDoc.icon] || <FileText size={48} className="text-gray-400" />}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{previewDoc.name}</h3>
                        <div className="space-y-1 text-sm text-gray-500">
                            <p>Type: {previewDoc.type}</p>
                            <p>Size: {previewDoc.size}</p>
                            <p>Uploaded: {previewDoc.date}</p>
                        </div>
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-400">Preview will be available with backend storage integration</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
