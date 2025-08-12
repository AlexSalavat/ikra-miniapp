// src/lib/useSuppliers.js
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import fallback from '../data/suppliers.local.json';

/**
 * Хук списка поставщиков
 * Возвращает: { suppliers, loading, error }
 */
export function useSuppliers() {
  const [suppliers, setSuppliers] = useState(Array.isArray(fallback) ? fallback : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: err } = await supabase.from('suppliers').select('*');
        if (err) throw err;

        const rows = Array.isArray(data) ? data : [];
        // Сортируем: premium → verified → name
        rows.sort((a, b) => {
          const p = (b?.premium ? 1 : 0) - (a?.premium ? 1 : 0);
          if (p) return p;
          const v = (b?.verified ? 1 : 0) - (a?.verified ? 1 : 0);
          if (v) return v;
          return String(a?.name || '').localeCompare(String(b?.name || ''), 'ru');
        });

        if (!cancelled) setSuppliers(rows);
      } catch (e) {
        if (!cancelled) setError(e);
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

/**
 * Хук одного поставщика по slug/id
 * Возвращает: { supplier, loading, error }
 */
export function useSupplier(id) {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOne() {
      if (!id) {
        setSupplier(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        // одна строка — чтобы не ругался prettier
        const { data, error: err } = await supabase
          .from('suppliers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();
        if (err) throw err;

        if (!cancelled) setSupplier(data || null);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOne();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { supplier, loading, error };
}
