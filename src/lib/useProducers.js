import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { MOCK_PRODUCERS } from '../mock/producers';

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
 * В DEV используем мок-данные, если Supabase не настроен или вернул пусто.
 * В PROD  только Supabase.
 */
export function useProducers() {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Нет клиента  фоллбэк в DEV
        if (!supabase) {
          if (process.env.NODE_ENV !== 'production') {
            if (!cancelled) setProducers(MOCK_PRODUCERS.map(normalizeProducer));
            return;
          }
          throw new Error('Supabase не инициализирован. Проверь переменные окружения.');
        }

        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        const rows = Array.isArray(data) ? data : [];
        if (!rows.length && process.env.NODE_ENV !== 'production') {
          if (!cancelled) setProducers(MOCK_PRODUCERS.map(normalizeProducer));
        } else {
          if (!cancelled) setProducers(rows.map(normalizeProducer));
        }
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

/** Получение одного производителя по id (с фоллбэком в DEV) */
export function useProducer(id) {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!id) {
      setProducer(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        // DEV фоллбэк, если нет клиента
        if (!supabase && process.env.NODE_ENV !== 'production') {
          const found = MOCK_PRODUCERS.find((p) => String(p.id) === String(id)) || null;
          if (!cancelled) setProducer(found ? normalizeProducer(found) : null);
          return;
        }

        if (!supabase)
          throw new Error('Supabase не инициализирован. Проверь переменные окружения.');

        setLoading(true);
        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (!cancelled) {
          if (data) {
            setProducer(normalizeProducer(data));
          } else if (process.env.NODE_ENV !== 'production') {
            const found = MOCK_PRODUCERS.find((p) => String(p.id) === String(id)) || null;
            setProducer(found ? normalizeProducer(found) : null);
          } else {
            setProducer(null);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          if (process.env.NODE_ENV !== 'production') {
            const found = MOCK_PRODUCERS.find((p) => String(p.id) === String(id)) || null;
            setProducer(found ? normalizeProducer(found) : null);
          } else {
            setProducer(null);
          }
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
