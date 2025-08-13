import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function normalizeProducer(row = {}) {
  const p = row || {};
  return {
    id: String(p.id ?? ''),
    name: p.name ?? '',
    region: p.region ?? '',
    logo: p.logo ?? '',
    description: p.description ?? '',
    fullDescription: p.fullDescription ?? p.fulldescription ?? '',
    site: p.site ?? '',
    address: p.address ?? '',
    contacts: p.contacts ?? {},
    categories: p.categories ?? [],
    badges: p.badges ?? [],
    gallery: p.gallery ?? [],
    founded: p.founded ?? undefined,
    productionCapacity: p.productionCapacity ?? p.production_capacity ?? '',
    exportMarkets: p.exportMarkets ?? p.export_markets ?? [],
  };
}

/**
 * В DEV можно жить без Supabase (например, подмонтировать локальные данные).
 * В PROD  отсутствие клиента/ENV считаем ошибкой.
 */
export function useProducers() {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!supabase) {
          if (process.env.NODE_ENV !== 'production') {
            // Нет локального JSON  просто пустой список в деве.
            setProducers([]);
            return;
          }
          throw new Error(
            'Supabase не инициализирован. Проверь REACT_APP_/NEXT_PUBLIC_SUPABASE_*.'
          );
        }

        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        if (!cancelled) setProducers((data || []).map(normalizeProducer));
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

  return { producers, loading, error };
}

/** Получение одного производителя по id */
export function useProducer(id) {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fromEmptyLocal = () => {
      setProducer(null); // локального JSON нет — возвращаем null
    };

    if (!id) {
      setProducer(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        if (!supabase) {
          if (process.env.NODE_ENV !== 'production') {
            fromEmptyLocal();
            return;
          }
          throw new Error(
            'Supabase не инициализирован. Проверь REACT_APP_/NEXT_PUBLIC_SUPABASE_*.'
          );
        }

        setLoading(true);
        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) {
          setProducer(data ? normalizeProducer(data) : null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          fromEmptyLocal();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { producer, loading, error };
}
