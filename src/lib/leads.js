// src/lib/leads.js
import { supabase } from './supabase';

/**
 * submitLead({
 *   name, phone, comment?, message?, supplier_id?, source?, tg_user_id?
 * })
 * Возвращает: { ok: boolean, id?: string, error?: string }
 */
export async function submitLead(payload = {}) {
  try {
    if (!supabase) {
      return { ok: false, error: 'Supabase client is not configured' };
    }

    const clean = {
      name: String(payload?.name ?? '')
        .trim()
        .slice(0, 120),
      phone: String(payload?.phone ?? '')
        .trim()
        .slice(0, 64),
      comment: String(payload?.comment ?? payload?.message ?? '')
        .trim()
        .slice(0, 2000),
      supplier_id: payload?.supplier_id ? String(payload.supplier_id).trim() : null,
      source: String(payload?.source ?? 'miniapp'),
      tg_user_id: payload?.tg_user_id ? String(payload.tg_user_id) : null,
    };

    if (!clean.name || !clean.phone) {
      return { ok: false, error: 'Введите имя и телефон' };
    }

    const insertRow = {
      // обязательные колонки таблицы
      name: clean.name,
      phone: clean.phone,
      comment: clean.comment,

      // опциональные
      supplier_id: clean.supplier_id || null,
      source: clean.source,
      tg_user_id: clean.tg_user_id,

      // дублируем всё в meta для удобного аудита
      meta: clean,
    };

    const { data, error } = await supabase.from('leads').insert(insertRow).select('id').single();

    if (error) {
      // 23503 — нарушение внешнего ключа (неизвестный supplier_id)
      if (error.code === '23503') {
        return { ok: false, error: 'Указан неизвестный supplier_id' };
      }
      throw error;
    }

    return { ok: true, id: data?.id ?? null };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
