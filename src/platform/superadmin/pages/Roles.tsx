import React from 'react';
import { Card, Badge, Toggle } from '../components/SaaSBase';

export const Roles = () => {
    const modules = ['Platform Settings', 'Billing & Plans', 'Client Management', 'Support System', 'Monitoring'];
    const roles = [
        { name: 'Super Admin', type: 'Owner' },
        { name: 'Billing Admin', type: 'Finance' },
        { name: 'Support Rep', type: 'Tier 1' },
    ];

    // Mock initial matrix: row corresponds to modules, cols to roles
    const [matrix, setMatrix] = React.useState([
        [true, false, false],
        [true, true, false],
        [true, false, false],
        [true, false, true],
        [true, false, false]
    ]);

    const handleToggle = (r: number, c: number) => {
        const newMatrix = [...matrix];
        newMatrix[r][c] = !newMatrix[r][c];
        setMatrix(newMatrix);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Roles & Permissions</h1>
                <p className="text-sm text-gray-500 mt-1">Configure internal access controls to super admin modules.</p>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-900">Module Access</th>
                                {roles.map((role, i) => (
                                    <th key={i} className="px-6 py-4 text-center">
                                        <div className="font-semibold text-gray-900">{role.name}</div>
                                        <Badge className="mt-1" status={i === 0 ? 'primary' : 'neutral'}>{role.type}</Badge>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {modules.map((mod, r) => (
                                <tr key={r} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-700">{mod}</td>
                                    {roles.map((_, c) => (
                                        <td key={c} className="px-6 py-4 text-center">
                                            <Toggle enabled={matrix[r][c]} onChange={() => handleToggle(r, c)} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
