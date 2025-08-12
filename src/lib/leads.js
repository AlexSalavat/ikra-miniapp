import { supabase } from './supabase';

/**
 * submitLead({ name, phone, comment?, message?, supplier_id?, source?, tg_user_id?, tg_username? })
 * Возвращает: { ok: boolean, id?: string, error?: string }
 */
export async function submitLead(payload) {
  try {
    if (!supabase) {
      return { ok: false, error: 'Supabase client is not configured' };
    }

    const clean = {
      name: (payload?.name || '').slice(0, 120),
      phone: (payload?.phone || '').slice(0, 64),
      comment: (payload?.comment || payload?.message || '').slice(0, 2000),
      supplier_id: payload?.supplier_id || null,
      source: payload?.source || 'catalog',
      tg_user_id: payload?.tg_user_id || null,
      tg_username: payload?.tg_username || null,
      meta: payload ?? null,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([clean]) // ВАЖНО: пишем name, phone, comment, ... и meta
      .select('id')
      .single();

    if (error) throw error;
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
