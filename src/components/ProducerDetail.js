// src/components/ProducerDetail.js
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import producers from "../data/producers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/* helpers */
const getInitials = (name = "") =>
  name.replace(/["«»]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join("") || "??";

const stringHue = (s = "") => { let h=0; for (let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))%360; return h; };

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const producer = producers.find(p => String(p.id) === String(id)) || {};

  const {
    name = "",
    logo,
    region = "",
    fullDescription,
    description,
    address,
    categories = [],
    badges = [],
    site,
    contacts = {},
    gallery = [],
  } = producer;

  const verified = badges?.includes("Проверенный");
  const premium  = badges?.includes("Честный знак") && badges?.includes("Меркурий");

  const initialsBG = useMemo(() => {
    const h = stringHue(name || region || "x");
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .95),hsl(${(h+40)%360} 80% 30% / .95))`;
  }, [name, region]);

  const phones = Object.values(contacts).filter(v => typeof v === "string" && /^[-+()\d\s]{7,}$/.test(v));
  const emails = Object.values(contacts).filter(v => typeof v === "string" && /@/.test(v));
  const safeSite = site ? (site.startsWith("http") ? site : `https://${site}`) : null;

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/75 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition">
            <svg width="20" height="20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Производитель</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Not found */}
      {!name ? (
        <div className="max-w-md mx-auto px-3 pt-6 text-white">Завод не найден</div>
      ) : (
        <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
          {/* TOP: Лого слева + Текст справа */}
          <div className={`glass-card p-3 ${premium ? "premium" : ""}`}>
            <div className="grid grid-cols-[96px,1fr] gap-3 items-start">
              {/* Logo box */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black/40 grid place-items-center">
                {logo ? (
                  <img
                    src={logo}
                    alt={name}
                    className="w-[86%] h-[86%] object-contain img-fade-in"
                    onError={(e)=>{ e.currentTarget.remove(); }}
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-white font-extrabold text-xl" style={{ background: initialsBG }}>
                    {getInitials(name)}
                  </div>
                )}

                {/* mini premium badge */}
                {premium && (
                  <div className="absolute top-1 right-1 w-6 h-6 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm" title="Premium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgb(59,175,218)"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div className="min-w-0">
                <div className="flex items-start gap-2">
                  <div className="text-white font-extrabold text-[18px] leading-snug truncate" title={name}>
                    {name}
                  </div>
                </div>

                {/* Бейджи/регион компактно одной строкой */}
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  {verified && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm">
                      ✅ Проверенный
                    </span>
                  )}
                  {region && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/85 border border-white/15 bg-white/10 backdrop-blur-sm">
                      {region}
                    </span>
                  )}
                </div>

                {/* Категории (чипы) */}
                {!!categories.length && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {categories.slice(0, 4).map((c,i)=>(
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/10 backdrop-blur-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* О компании — справа от лого просили текст, но для мобилы лучше ниже, ровно и читабельно */}
          {(fullDescription || description) && (
            <div className="glass-card p-3">
              <div className="text-white font-semibold text-[15px] mb-1">О компании</div>
              <div className="text-white/90 text-[14px] leading-relaxed">
                {fullDescription || description}
              </div>
            </div>
          )}

          {/* Инфоблоки: адрес / контакты / сайт */}
          {(address || phones.length || emails.length || safeSite) && (
            <div className="grid gap-3">
              {address && (
                <div className="glass-card p-3">
                  <div className="text-white/80 text-sm mb-1">Адрес</div>
                  <div className="text-white font-medium text-[14px]">{address}</div>
                </div>
              )}

              {(phones.length || emails.length) > 0 && (
                <div className="glass-card p-3">
                  <div className="text-white/80 text-sm mb-2">Контакты</div>
                  <div className="grid grid-cols-2 gap-2">
                    {phones[0] && (
                      <a
                        href={`tel:${phones[0].replace(/[^+\d]/g,'')}`}
                        className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z"/></svg>
                        Позвонить
                      </a>
                    )}
                    {emails[0] && (
                      <a
                        href={`mailto:${emails[0]}`}
                        className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                        Написать
                      </a>
                    )}
                  </div>
                </div>
              )}

              {safeSite && (
                <div className="glass-card p-3">
                  <div className="text-white/80 text-sm mb-1">Сайт</div>
                  <a
                    href={safeSite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[rgba(59,175,218,0.95)] font-bold"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/><path d="M5 5h7v2H7v10h10v-5h2v7H5z"/></svg>
                    {safeSite.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Галерея внизу (крупнее, без обрезания главного контента сверху) */}
          {gallery.length > 0 && (
            <div className="glass-card p-2">
              <div className="text-white font-semibold text-[15px] mb-2 px-1">Галерея</div>
              <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
                {/* Если Tailwind < v3, замени на h-56 */}
                <div className="w-full aspect-[4/3]">
                  <Swiper spaceBetween={10} slidesPerView={1} style={{ borderRadius: 12 }}>
                    {gallery.map((src, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={src}
                          alt={`${name} фото ${i+1}`}
                          className="w-full h-full object-cover"
                          onError={(e)=>{ e.currentTarget.src="/images/no-image.webp"; }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
