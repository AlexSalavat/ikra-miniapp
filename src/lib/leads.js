import { supabase } from './supabase';

/**
 * submitLead({ name, phone, message, supplier_id, source, tg_user_id })
 * -> { ok, id? , error? }
 */
export async function submitLead(payload) {
  try {
    if (!supabase) return { ok: false, error: 'Supabase client is not configured' };

    const clean = {
      name: (payload?.name || '').slice(0, 120),
      phone: (payload?.phone || '').slice(0, 64),
      comment: (payload?.message || payload?.comment || '').slice(0, 2000),
      supplier_id: payload?.supplier_id || null,
      source: payload?.source || 'catalog',
      tg_user_id: payload?.tg_user_id || null,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: clean.name,
        phone: clean.phone,
        comment: clean.comment,
        supplier_id: clean.supplier_id, // может быть null
        source: clean.source,
        tg_user_id: clean.tg_user_id,
        meta: clean, // дублируем в meta для удобства
      })
      .select('id')
      .single();

    if (error) throw error;
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
