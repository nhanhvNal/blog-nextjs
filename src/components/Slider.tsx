"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface Slide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface SliderProps {
  slides: Slide[];
}

export default function Slider({ slides }: Readonly<SliderProps>) {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[70vh] md:h-[85vh]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id + idx}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
                  {slide.title && (
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-lg md:text-xl">{slide.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
