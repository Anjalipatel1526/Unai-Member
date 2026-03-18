import React, { createContext, useContext } from 'react';
import { useSupabaseData } from './useSupabaseData';

interface CompanyContextType {
    company: { id: string; name: string; };
    employees: any[];
    attendance: any[];
    leaves: any[];
    performance: any[];
    documents: any[];
    exits: any[];
    isLoading: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const companyId = 'COMP_001'; // Default tenant id for now

    const { data: employees, loading: empLoading } = useSupabaseData<any>('company_employees', companyId);
    const { data: attendance, loading: attLoading } = useSupabaseData<any>('company_attendance', companyId);
    const { data: leaves, loading: leaLoading } = useSupabaseData<any>('company_leaves', companyId);
    const { data: performance, loading: perLoading } = useSupabaseData<any>('company_performance', companyId);
    const { data: documents, loading: docLoading } = useSupabaseData<any>('company_documents', companyId);
    const { data: exits, loading: extLoading } = useSupabaseData<any>('company_exits', companyId);

    const isLoading = empLoading || attLoading || leaLoading || perLoading || docLoading || extLoading;

    const value = {
        company: { id: companyId, name: 'UNAI Tech Organization' },
        employees,
        attendance,
        leaves,
        performance,
        documents,
        exits,
        isLoading
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanyData = () => {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error('useCompanyData must be used within a CompanyProvider');
    }
    return context;
};
