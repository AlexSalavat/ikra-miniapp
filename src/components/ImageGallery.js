import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Универсальная галерея.
 * @param {Object} props
 * @param {string[]} props.images - массив путей к картинкам
 * @param {number} [props.height=256] - высота блока (px)
 * @param {string} [props.alt="Галерея"] - alt-текст
 */
export default function ImageGallery({ images = [], height = 256, alt = 'Галерея' }) {
  if (!images?.length) return null;
  return (
    <Swiper modules={[Navigation]} navigation className="rounded-2xl overflow-hidden">
      {images.map((src, i) => (
        <SwiperSlide key={src || i}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full object-cover img-fade-in"
            style={{ height }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
