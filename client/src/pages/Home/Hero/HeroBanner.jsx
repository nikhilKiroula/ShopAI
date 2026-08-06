import { HERO_BANNERS } from "@/constants/hero.config";

const HeroBanner = () => {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-5

        lg:grid-cols-1
      "
    >
      {HERO_BANNERS.map((banner) => (
        <div
          key={banner.id}
          className="
            overflow-hidden
            rounded-2xl
            shadow-sm
            aspect-[470/229]
          "
        >
          <img
            src={banner.image}
            alt={banner.alt}
            loading="lazy"
            className="
              h-full
              w-full
              object-fill
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      ))}
    </div>
  );
};

export default HeroBanner;