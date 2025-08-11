import { useEffect, useMemo, useState } from 'react';
import { db, firebaseReady } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import localSuppliers from '../data/suppliers';

/** Нормализация: приводим документ Firestore к формату локальных данных */
function normalize(doc) {
  const d = doc || {};
  return {
    id: d.id || '',
    name: d.name || '',
    region: d.region || '',
    city: d.city || '',
    address: d.address || '',
    products: Array.isArray(d.products) ? d.products : [],
    logo: d.logo || '',
    verified: Boolean(d.verified),
    shortDescription: d.shortDescription || '',
    fullDescription: d.fullDescription || '',
    advantages: Array.isArray(d.advantages) ? d.advantages : [],
    delivery: d.delivery || '',
    volumes: d.volumes || '',
    priceList: d.priceList || '',
    contacts: d.contacts || {},
    certs: Array.isArray(d.certs) ? d.certs : [],
    gallery: Array.isArray(d.gallery) ? d.gallery : [],
    mapUrl: d.mapUrl || '',
    premium: Boolean(d.premium),
    paidUntil: d.paidUntil || null,
    _source: 'db',
  };
}

export function useSuppliers() {
  const [remote, setRemote] = useState([]);
  const [loading, setLoading] = useState(firebaseReady);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!firebaseReady) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const snap = await getDocs(collection(db, 'suppliers'));
        const rows = snap.docs.map((d) => normalize(d.data())).filter((x) => x.id);
        if (!ignore) setRemote(rows);
      } catch (e) {
        console.error(e);
        if (!ignore) setError(e?.message || 'Ошибка загрузки поставщиков');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, []);

  // слить: DB переопределяет локальных по id
  const merged = useMemo(() => {
    const map = new Map();
    (Array.isArray(localSuppliers) ? localSuppliers : []).forEach((s) =>
      map.set(s.id, { ...s, _source: 'local' }),
    );
    (Array.isArray(remote) ? remote : []).forEach((s) => map.set(s.id, s));
    // сортировка: premium , verified , имя
    return Array.from(map.values()).sort((a, b) => {
      if ((b.premium | 0) !== (a.premium | 0)) return (b.premium | 0) - (a.premium | 0);
      if ((b.verified | 0) !== (a.verified | 0)) return (b.verified | 0) - (a.verified | 0);
      return (a.name || '').localeCompare(b.name || '', 'ru');
    });
  }, [remote]);

  return { items: merged, loading, error };
}
