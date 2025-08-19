// src/lib/useProducers.js
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { MOCK_PRODUCERS } from '../mock/producers';

export function normalizeProducer(row = {}) {
  const p = row || {};

  // соберём бейджи: из массива + из флагов
  const flags = [
    p.verified ? 'Проверенный' : null,
    p.premium ? 'Честный знак' : null,
    p.premium ? 'Меркурий' : null,
  ].filter(Boolean);
  const baseBadges = Array.isArray(p.badges) ? p.badges : [];
  const badges = Array.from(new Set([...baseBadges, ...flags]));

  return {
    id: String(p.id ?? ''),
    name: p.name ?? '',
    region: p.region ?? '',
    logo: p.logo ?? '',
    description: p.description ?? '',
    fullDescription: p.full_description ?? p.fullDescription ?? '',
    site: p.site ?? '',
    address: p.address ?? '',
    contacts: p.contacts ?? {},
    categories: p.categories ?? [],
    badges,
    gallery: p.gallery ?? [],
    founded: typeof p.founded === 'number' ? p.founded : undefined,
    productionCapacity: p.production_capacity ?? p.productionCapacity ?? '',
    exportMarkets: p.export_markets ?? p.exportMarkets ?? [],
    verified: Boolean(p.verified),
    premium: Boolean(p.premium),
  };
}

/**
 * PROD: читаем из Supabase (view producers_app)
 * DEV: если нет клиента или пусто — фоллбэк на моки
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
            if (!cancelled) setProducers(MOCK_PRODUCERS.map(normalizeProducer));
            return;
          }
          throw new Error('Supabase не инициализирован.');
        }

        const { data, error } = await supabase
          .from('producers_app') // ← читаем из VIEW
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
        if (!supabase && process.env.NODE_ENV !== 'production') {
          const found = MOCK_PRODUCERS.find((p) => String(p.id) === String(id)) || null;
          if (!cancelled) setProducer(found ? normalizeProducer(found) : null);
          return;
        }
        if (!supabase) throw new Error('Supabase не инициализирован.');

        setLoading(true);
        const { data, error } = await supabase
          .from('producers_app') // ← читаем из VIEW
          .select('*')
          .eq('id', String(id))
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
