import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import localFallback from '../data/suppliers.local.json';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error: e } = await supabase
          .from('suppliers')
          .select('*')
          .order('premium', { ascending: false })
          .order('verified', { ascending: false })
          .order('name');

        if (e) throw e;
        if (!cancelled) setSuppliers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setSuppliers(localFallback);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { suppliers, loading, error };
}

export async function getSupplierById(id) {
  const { data, error } = await supabase.from('suppliers').select('*').eq('id', id).maybeSingle();

  if (error) {
    return localFallback.find((s) => s.id === id) || null;
  }
  return data;
}
