# IKRA miniapp — handoff

Timestamp: 2025-08-13 22:59:37
Branch: main
Commit: 4fe15d4

ENV (нужны на Vercel/локально):
REACT_APP_SUPABASE_URL = <твой URL Supabase>
REACT_APP_SUPABASE_ANON_KEY = <anon key>

Основные маршруты:
/, /catalog, /catalog/suppliers, /supplier/:id
/producers, /producer/:id
/market, /market/sell, /market/buy
/news, /news/top-producers
/admin (вложенные: suppliers, list, create)

Источник данных:

- Supabase: tables public.suppliers, public.producers, public.leads
- Картинки: public/images/\*
- Локальный фоллбэк производителей: src/data/producers.js

Ключевые файлы:
src/lib/useSuppliers.js
src/lib/useProducers.js
src/components/SupplierDetail.js
src/components/ProducerDetail.js
src/data/producers.js
