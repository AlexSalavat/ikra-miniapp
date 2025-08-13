import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import localSuppliers from '../data/suppliers.local.json';
/** === UI aliases for Supplier === */
const _toArray = (v) =>
  Array.isArray(v)
    ? v
    : v == null || v === ''
      ? []
      : typeof v === 'string' && v.trim().startsWith('[')
        ? (() => {
            try {
              const j = JSON.parse(v);
              return Array.isArray(j) ? j : [v];
            } catch {
              return [v];
            }
          })()
        : [v];

export function applyAliases(row) {
  if (!row) return row;

  // описания: из snake → camel
  const shortDescription = row.shortDescription ?? row.shortdescription ?? '';
  const fullDescription = row.fullDescription ?? row.fulldescription ?? '';

  // галерея: берём что есть и приводим к массиву
  const galleryRaw =
    row.gallery ??
    row.images ??
    row.photos ??
    row.galleryUrls ??
    row.imageUrls ??
    row.pictures ??
    row.media ??
    [];
  const gallery = _toArray(galleryRaw);

  // карта: camel и snake
  const mapUrl = row.mapUrl ?? row.mapurl ?? row.map ?? '';

  // страна/регион
  const country = row.country ?? row.region ?? '';

  // логотип — разные варианты
  const logo = row.logo ?? row.logoUrl ?? row.logo_url ?? row.avatar ?? row.image ?? null;

  return {
    ...row,
    shortDescription,
    fullDescription,
    description: row.description ?? shortDescription ?? fullDescription ?? '',
    country,
    logo,

    // единые ключи для картинок (под любые компоненты)
    gallery,
    images: gallery,
    photos: gallery,
    galleryUrls: gallery,
    imageUrls: gallery,
    pictures: gallery,
    media: gallery,

    // единые ключи для карты
    mapUrl,
    mapurl: mapUrl,
    map: mapUrl,
  };
}
/** === /UI aliases === */

/** РЎРїРёСЃРѕРє РїРѕСЃС‚Р°РІС‰РёРєРѕРІ (РґР»СЏ РєР°С‚Р°Р»РѕРіР°) */
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
        if (!cancelled) {
          console.log('[suppliers] sample keys:', Object.keys((data && data[0]) || {}));
          console.log('[suppliers] sample row:', (data && data[0]) || null);
          setSuppliers((data || []).map(applyAliases));
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

  return { suppliers, loading, error };
}

/** РћРґРёРЅ РїРѕСЃС‚Р°РІС‰РёРє РїРѕ id (РґР»СЏ СЃС‚СЂР°РЅРёС†С‹ РґРµС‚Р°Р»РєРё) */
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
        if (!cancelled) setSupplier(data ? applyAliases(data) : null);
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
