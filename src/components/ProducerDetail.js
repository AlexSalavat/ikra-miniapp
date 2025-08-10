// src/components/ProducerDetail.js
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import producers from "../data/producers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const getInitials = (name = "") =>
  name.replace(/["«»]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join("") || "??";

const stringHue = (s = "") => { let h = 0; for (let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))%360; return h; };

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producer = producers.find(p => String(p.id) === String(id));

  if (!producer) return <div className="bg-black text-white p-6">Завод не найден</div>;

  const {
    name, logo, region, fullDescription, description, address,
    categories = [], badges = [], site, contacts = {}, gallery = []
  } = producer;

  const verified = badges?.includes("Проверенный");
  const premium  = badges?.includes("Честный знак") && badges?.includes("Меркурий");

  // phones/emails из разнородного contacts
  const phones = Object.values(contacts).filter(v => typeof v === "string" && /^[-+()\d\s]{7,}$/.test(v));
  const emails = Object.values(contacts).filter(v => typeof v === "string" && /@/.test(v));

  const initialsBG = useMemo(() => {
    const h = stringHue(name || region || "x");
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .9),hsl(${(h+40)%360} 80% 30% / .9))`;
  }, [name, region]);

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

      <div className="max-w-md mx-auto px-3 pt-3">
        {/* Основная стеклянная карточка */}
        <div className={`glass-card p-3 ${premium ? "premium" : ""}`}>
          {/* Верхний блок: лого + инфо */}
          <div className="flex gap-3 items-start">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="w-full h-full object-cover img-fade-in"
                  onError={(e)=>{ e.currentTarget.remove(); }}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-white font-extrabold text-xl" style={{ background: initialsBG }}>
                  {getInitials(name)}
                </div>
              )}

              {/* бейджи в углах лого */}
              {verified && (
                <div className="absolute top-1 left-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/65 backdrop-blur-sm">
                    ✅ Проверенный
                  </span>
                </div>
              )}
              {premium && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm" title="Premium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-white font-bold text-[18px] leading-snug truncate" title={name}>{name}</div>
              {region && (
                <div className="mt-1 inline-flex items-center gap-1 text-white/80 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z"/><circle cx="12" cy="11" r="3"/></svg>
                  <span>{region}</span>
                </div>
              )}
              {!!categories.length && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {categories.slice(0,3).map((c,i)=>(
                    <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/10 backdrop-blur-sm">{c}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Описание */}
          {(fullDescription || description) && (
            <div className="mt-3 text-white/90 text-[14px] leading-relaxed">
              {fullDescription || description}
            </div>
          )}

          {/* Адрес */}
          {address && (
            <div className="mt-3 text-white/85 text-sm">
              <span className="text-white/60">Адрес: </span>
              <span className="font-semibold">{address}</span>
            </div>
          )}

          {/* Контакты */}
          {(phones.length || emails.length) > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {phones.length > 0 && (
                <a
                  href={`tel:${phones[0].replace(/[^+\d]/g,'')}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z"/></svg>
                  Позвонить
                </a>
              )}
              {emails.length > 0 && (
                <a
                  href={`mailto:${emails[0]}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                  Написать
                </a>
              )}
            </div>
          )}

          {/* Сайт */}
          {safeSite && (
            <div className="mt-2">
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

        {/* Большая карусель фото внизу */}
        {gallery?.length > 0 && (
          <div className="mt-3 glass-card p-2">
            <div className="text-white/90 text-sm font-semibold mb-2 px-1">Фото</div>
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
              {/* делаем крупнее: аспект 4/3 (или 3/2 по желанию) */}
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
    </div>
  );
}
