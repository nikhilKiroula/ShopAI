import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { HERO_SLIDES } from "@/constants/hero.config";

const HeroSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-sm">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={700}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="aspect-[940/478]"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              loading="lazy"
              className="
                h-full
                w-full
                select-none
                object-fill
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous */}

      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="
          absolute
          left-3
          top-1/2
          z-20
          flex
          h-10
          w-10
          -translate-y-1/2
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-white/20
          text-white
          shadow-xl
          backdrop-blur-md
          opacity-0
          transition-all
          duration-300

          group-hover:left-5
          group-hover:opacity-100

          hover:scale-110
          hover:bg-[#0B57D0]
          hover:border-[#0B57D0]

          active:scale-95

          lg:h-12
          lg:w-12
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}

      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="
          absolute
          right-3
          top-1/2
          z-20
          flex
          h-10
          w-10
          -translate-y-1/2
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-white/20
          text-white
          shadow-xl
          backdrop-blur-md
          opacity-0
          transition-all
          duration-300

          group-hover:right-5
          group-hover:opacity-100

          hover:scale-110
          hover:bg-[#0B57D0]
          hover:border-[#0B57D0]

          active:scale-95

          lg:h-12
          lg:w-12"
        >
          <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSlider;