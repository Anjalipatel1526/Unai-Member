import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
    header: string;
    accessor: Extract<keyof T, string> | string | ((row: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    itemsPerPage?: number;
}

export function DataTable<T>({ data, columns, itemsPerPage = 10 }: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full flex flex-col">
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-200 font-medium">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className={`px-4 py-3 whitespace-nowrap ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentData.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                {columns.map((col, j) => (
                                    <td key={j} className={`px-4 py-3 ${col.className || ''}`}>
                                        {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 mt-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, data.length)}</span> of{' '}
                        <span className="font-medium">{data.length}</span> results
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 text-sm rounded-md transition-colors ${currentPage === i + 1
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
