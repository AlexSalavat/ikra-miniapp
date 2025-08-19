// src/lib/useProducers.js
import { useEffect, useMemo, useState } from 'react';
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

// ===== Список производителей =====
export function useProducers() {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Если нет supabase-клиента — сразу мок
        if (!supabase || typeof supabase.from !== 'function') {
          if (!cancelled) setProducers(MOCK_PRODUCERS.map(normalizeProducer));
          return;
        }

        const { data, error } = await supabase
          .from('producers')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        const rows = Array.isArray(data) ? data : [];

        // Если база пуста — тоже мок (и в prod, и в dev)
        if (!rows.length) {
          if (!cancelled) setProducers(MOCK_PRODUCERS.map(normalizeProducer));
        } else {
          if (!cancelled) setProducers(rows.map(normalizeProducer));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setProducers(MOCK_PRODUCERS.map(normalizeProducer)); // фоллбэк на ошибке
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

  return { producers, loading, error };
}

// ===== Один производитель =====
export function useProducer(id) {
  const safeId = String(id ?? '');
  const { producers, loading: listLoading, error: listError } = useProducers();

  // Сначала пробуем найти в уже загруженном списке (из базы или из мока)
  const fromList = useMemo(
    () => producers.find((p) => String(p.id) === safeId) || null,
    [producers, safeId]
  );

  const [producer, setProducer] = useState(fromList);
  const [loading, setLoading] = useState(!fromList && Boolean(safeId));
  const [error, setError] = useState(null);

  useEffect(() => {
    setProducer(fromList);
  }, [fromList]);

  useEffect(() => {
    let cancelled = false;

    if (!safeId) {
      setProducer(null);
      setLoading(false);
      return;
    }

    // Если уже нашли в списке — отдельный запрос не нужен
    if (fromList) {
      setLoading(false);
      return;
    }

    async function loadOne() {
      try {
        // Нет клиента — используем мок
        if (!supabase || typeof supabase.from !== 'function') {
          const found = MOCK_PRODUCERS.find((p) => String(p.id) === safeId) || null;
          if (!cancelled) setProducer(found ? normalizeProducer(found) : null);
          return;
        }

        setLoading(true);

        // Пытаемся получить по id из базы; если колонка numeric — попробуем и число, и строку
        const tryNum = Number.isFinite(Number(safeId)) ? Number(safeId) : safeId;

        let { data, error } = await supabase
          .from('producers')
          .select('*')
          .eq('id', tryNum)
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          // пусто в базе — возьмём мок
          const found = MOCK_PRODUCERS.find((p) => String(p.id) === safeId) || null;
          if (!cancelled) setProducer(found ? normalizeProducer(found) : null);
        } else {
          if (!cancelled) setProducer(normalizeProducer(data));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          const found = MOCK_PRODUCERS.find((p) => String(p.id) === safeId) || null;
          setProducer(found ? normalizeProducer(found) : null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOne();
    return () => {
      cancelled = true;
    };
  }, [safeId, fromList]);

  // Пробрасываем ошибку/лоадинг из списка, чтобы экран никогда не был «чёрным»
  return {
    producer,
    loading: loading || listLoading,
    error: error || listError,
  };
}
