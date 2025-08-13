import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import localSuppliers from './suppliers.local.json';

// Подгоним схему под БД
function normalizeSupplier(row) {
  if (!row || typeof row !== 'object') return row;
  return {
    id: String(row.id ?? row.uuid ?? row.slug ?? ''),
    name: row.name ?? row.title ?? '',
    brand: row.brand ?? row.producer ?? '',
    country: row.country ?? row.location ?? '',
    ...row,
  };
}

/**
 * В DEV  можно читать локальный JSON.
 * В PROD  если нет ENV/клиента, кидаем ошибку (чтобы не было "старых" данных из бандла).
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
            'Supabase не инициализирован. Проверь REACT_APP_/NEXT_PUBLIC_SUPABASE_*.'
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
/** Получение одного поставщика по id */
export function useSupplier(id) {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fromLocal = () => {
      const found = localSuppliers.find((s) => String(s.id) === String(id));
      setSupplier(found ? normalizeSupplier(found) : null);
    };

    if (!id) {
      setSupplier(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        if (!supabase) {
          if (process.env.NODE_ENV !== 'production') {
            fromLocal();
            return;
          }
          throw new Error('Supabase не инициализирован. Проверь ENV.');
        }

        setLoading(true);
        const { data, error } = await supabase
          .from('suppliers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) {
          setSupplier(data ? normalizeSupplier(data) : null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          fromLocal();
        }
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
