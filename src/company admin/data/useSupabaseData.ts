import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function useSupabaseData<T>(tableName: string, companyId: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial fetch
        const fetch = async () => {
            const { data: result, error } = await supabase
                .from(tableName)
                .select('*')
                .eq('company_id', companyId);

            if (!error && result) {
                setData(result as T[]);
            }
            setLoading(false);
        };

        fetch();

        // Set up realtime subscription
        const subscription = supabase
            .channel(`${tableName}_changes`)
            .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setData(prev => [...prev, payload.new as T]);
                } else if (payload.eventType === 'UPDATE') {
                    setData(prev => prev.map(item => (item as any).id === payload.new.id ? payload.new as T : item));
                } else if (payload.eventType === 'DELETE') {
                    setData(prev => prev.filter(item => (item as any).id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [tableName, companyId]);

    return { data, loading };
}
