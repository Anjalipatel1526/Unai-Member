import React, { useState } from 'react';
import { Card, Toggle } from '../components/SaaSBase';
import { Layers, Rocket, Smartphone, Code, BrainCircuit } from 'lucide-react';

export const Features = () => {
    const [features, setFeatures] = useState([
        { id: '1', name: 'Payroll Module', desc: 'Global automated payroll engine', icon: Layers, enabled: true },
        { id: '2', name: 'Performance Module', desc: 'KPI tracking and 360 reviews', icon: Rocket, enabled: false },
        { id: '3', name: 'Mobile Access', desc: 'Native iOS & Android apps for employees', icon: Smartphone, enabled: true },
        { id: '4', name: 'API Access', desc: 'Developer GraphQL & REST APIs', icon: Code, enabled: true },
        { id: '5', name: 'AI Analytics', desc: 'Predictive retention and compensation models', icon: BrainCircuit, enabled: false },
    ]);

    const toggleFeature = (id: string) => {
        setFeatures(features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Feature Control</h1>
                <p className="text-sm text-gray-500 mt-1">Globally enable or disable premium platform modules.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {features.map((feat) => (
                    <Card key={feat.id} className="p-5 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl transition-colors ${feat.enabled ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                <feat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">{feat.name}</h3>
                                <p className="text-sm text-gray-500">{feat.desc}</p>
                            </div>
                        </div>
                        <Toggle enabled={feat.enabled} onChange={() => toggleFeature(feat.id)} />
                    </Card>
                ))}
            </div>
        </div>
    );
};
