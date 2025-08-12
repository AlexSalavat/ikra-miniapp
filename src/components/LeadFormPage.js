import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitLead } from '../lib/leads';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function LeadFormPage() {
  const q = useQuery();
  const nav = useNavigate();
  const supplierId = q.get('supplier') || null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await submitLead({
      name,
      phone,
      message,
      supplier_id: supplierId,
      source: supplierId ? 'supplier' : 'catalog',
    });
    setBusy(false);
    if (res.ok) setDone(true);
    else setErr(res.error || 'Ошибка отправки');
  };

  if (done) {
    return (
      <div className="p-4">
        <div className="p-4 rounded-2xl glass-border bg-white/5">
          <div className="text-lg mb-1">Заявка отправлена</div>
          <div className="text-sm opacity-70">Мы свяжемся с вами в ближайшее время.</div>
        </div>
        <button
          className="mt-4 px-4 py-2 rounded-2xl glass-border bg-white/10"
          onClick={() => nav(-1)}
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-xl mb-3">Оставить заявку</div>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full px-3 py-2 rounded-2xl bg-white/5 glass-border outline-none"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded-2xl bg-white/5 glass-border outline-none"
          placeholder="Телефон*"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="w-full px-3 py-2 rounded-2xl bg-white/5 glass-border outline-none min-h-[120px]"
          placeholder="Комментарий (что нужно)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {err && <div className="text-sm text-red-400">{err}</div>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-2 rounded-2xl glass-border bg-white/10 disabled:opacity-50"
          >
            {busy ? 'Отправка' : 'Отправить'}
          </button>
          <button
            type="button"
            onClick={() => nav(-1)}
            className="px-4 py-2 rounded-2xl glass-border bg-white/5"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
