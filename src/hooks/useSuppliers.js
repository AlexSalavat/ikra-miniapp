import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import localSuppliers from './suppliers.local.json';

/**
 * Читает ENV и создаёт Supabase-клиент.
 * Работает и с CRA (REACT_APP_*) и с Next.js (NEXT_PUBLIC_*).
 */
const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Приведи поля под свою схему при необходимости
function normalizeSupplier(row) {
  if (!row || typeof row !== 'object') return row;
  return {
    id: row.id ?? row.uuid ?? row.slug ?? null,
    name: row.name ?? row.title ?? '',
    brand: row.brand ?? row.producer ?? '',
    country: row.country ?? row.location ?? '',
    ...row,
  };
}

/**
 * В DEV  можно читать локальный JSON.
 * В PROD  без ENV кидаем ошибку (чтобы не было "старых данных").
 */
export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!supabase) {
          if (process.env.NODE_ENV !== 'production') {
            if (!cancelled) setSuppliers(Array.isArray(localSuppliers) ? localSuppliers : []);
            return;
          }
          throw new Error(
            'Supabase не сконфигурирован: отсутствуют REACT_APP_/NEXT_PUBLIC_SUPABASE_* переменные.'
          );
        }

        const { data, error } = await supabase
          .from('suppliers')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        if (!cancelled) setSuppliers((data || []).map(normalizeSupplier));
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
