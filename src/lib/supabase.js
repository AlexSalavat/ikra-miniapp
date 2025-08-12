import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const anon = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Если переменные не заданы — вернём null и останемся на локальных данных.
export const supabase = url && anon ? createClient(url, anon) : null;
