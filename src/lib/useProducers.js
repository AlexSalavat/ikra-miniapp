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

/** Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂР В Р’В·Р В Р вЂ Р В РЎвЂўР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ */
export function useProducers() {
  const [producers, setProducers] = useState([].map(normalizeProducer));
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!supabase) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
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

/** Р В РЎвЂєР В РўвЂР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂР В Р’В·Р В Р вЂ Р В РЎвЂўР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰ Р В РЎвЂ”Р В РЎвЂў id */
export function useProducer(id) {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(Boolean(id) && Boolean(supabase));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!id) {
      setProducer(null);
      setLoading(false);
      return;
    }

    const fromLocal = () => {
      const found = [].find((p) => String(p.id) === String(id));
      setProducer(found ? normalizeProducer(found) : null);
    };

    if (!supabase) {
      fromLocal();
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .eq('id', id)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) {
          if (data) setProducer(normalizeProducer(data));
          else fromLocal();
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

  return { producer, loading, error };
}
