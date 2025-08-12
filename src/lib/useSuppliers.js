import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import localSuppliers from '../data/suppliers';

export function useSuppliers() {
  const [data, setData] = useState(localSuppliers);
  const [loading, setLoading] = useState(!!supabase);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) return; // остаёмся на локальных данных
    let canceled = false;

    (async () => {
      try {
        const { data: rows, error: e } = await supabase
          .from('suppliers')
          .select('*')
          .eq('published', true);
        if (e) throw e;
        if (!canceled && rows) setData(rows);
      } catch (err) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, []);

  return { data, loading, error };
}
