import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import localSuppliers from '../data/suppliers.local.json';

/** Список поставщиков (для каталога) */
export function useSuppliers() {
  const [suppliers, setSuppliers] = useState(localSuppliers || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await supabase
          .from('suppliers')
          .select('*')
          .order('premium', { ascending: false })
          .order('verified', { ascending: false })
          .order('name', { ascending: true });

        if (error) throw error;
        if (!cancelled) setSuppliers(data || []);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { suppliers, loading, error };
}

/** Один поставщик по id (для страницы деталки) */
export function useSupplier(id) {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!id) {
      setSupplier(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('suppliers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) setSupplier(data || null);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { supplier, loading, error };
}
