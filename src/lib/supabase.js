import { createClient } from '@supabase/supabase-js';

const URL = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * В DEV допустимо отсутствие ENV (можно работать с локальными моками).
 * В PROD отсутствие ENV  критическая ошибка.
 */
if (!URL || !KEY) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase ENV не заданы (REACT_APP_/NEXT_PUBLIC_). Проверь настройки Vercel.');
  }
}

export const supabase = URL && KEY ? createClient(URL, KEY) : null;
