import { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, MapPin, Calendar, Sparkles } from 'lucide-react';
import itemsRaw from '../data/newsCoast';

function formatDate(d) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString();
  } catch {
    return '';
  }
}

function Tag({ children }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
      {children}
    </span>
  );
}

function ItemCard({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {/* левая подсветка */}
      <div
        className={`absolute left-0 top-0 h-full w-1 transition-opacity ${open ? 'opacity-100' : 'opacity-60'}`}
        style={{ background: 'linear-gradient(180deg,#22d3ee 0%,#60a5fa 100%)' }}
      />
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5"
        aria-expanded={open}
      >
        <div className="min-w-0">
          {item.pinned ? (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-cyan-300">
              <Sparkles className="w-3 h-3" /> важное
            </span>
          ) : null}
          <div className="text-cyan-300 font-extrabold uppercase tracking-wide text-sm">
            {item.title}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {item.region}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.date)}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} px-4`}
      >
        <div className="overflow-hidden">
          <div className="pb-3 text-sm leading-relaxed text-white/85 whitespace-pre-line">
            {item.body}
          </div>
          <div className="pb-3 flex flex-wrap items-center gap-2">
            {Array.isArray(item.tags) && item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs underline underline-offset-2 text-cyan-300 hover:text-cyan-200"
              >
                Источник <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsCoast() {
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() => {
    const list = Array.isArray(itemsRaw) ? itemsRaw.slice() : [];
    // важные вверх
    list.sort((a, b) => Number(b.pinned || 0) - Number(a.pinned || 0));
    return list;
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) =>
      [x.title, x.body, x.region, (x.tags || []).join(' ')].join(' ').toLowerCase().includes(s)
    );
  }, [items, q]);

  return (
    <main className="p-4 space-y-4">
      {/* шапка */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-white/60">Новости</div>
          <div className="text-xl font-bold">Побережье</div>
          <div className="text-xs text-white/60">{filtered.length} записей</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 hover:brightness-110 text-sm"
          >
            {expanded ? 'Свернуть все' : 'Раскрыть все'}
          </button>
        </div>
      </div>

      {/* поиск */}
      <div className="flex items-center gap-2">
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none"
          placeholder="Поиск по заголовкам, тегам и тексту"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* список */}
      <div className="space-y-3">
        {filtered.length ? (
          filtered.map((n, i) => (
            <ItemCard key={n.id} item={n} defaultOpen={expanded || (i === 0 && n.pinned)} />
          ))
        ) : (
          <div className="text-white/60">Ничего не найдено.</div>
        )}
      </div>

      <div className="h-4" />
    </main>
  );
}
