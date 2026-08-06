import { HeroBanner, HeroSlider } from "./";

const Hero = () => {
  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="
            grid
            gap-6

            lg:grid-cols-[2fr_1fr]
          "
        >
          <HeroSlider />

          <HeroBanner />
        </div>
      </div>
    </section>
  );
};

export default Hero;