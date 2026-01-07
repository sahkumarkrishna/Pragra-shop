import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    title: "Health & Care",
    highlight: "First",
    desc: "Take care of your body and mind with trusted health and wellness products.",
    bg: "from-lime-600 to-green-600",
    icon: "💊",
  },
  {
    title: "Wellness That",
    highlight: "Matters",
    desc: "Explore vitamins, immunity boosters, fitness essentials, and self-care solutions.",
    bg: "from-emerald-600 to-teal-600",
    icon: "🧘",
  },
  {
    title: "Daily Health",
    highlight: "Essentials",
    desc: "Masks, sanitizers, medical supplies, and hygiene products for daily needs.",
    bg: "from-green-600 to-cyan-600",
    icon: "🩺",
  },
];

const HomeBanner = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const banner = banners[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-3 pt-6">
      <div
        className={`relative overflow-hidden rounded-3xl
        min-h-[220px] sm:min-h-[300px] lg:min-h-[340px]
        bg-gradient-to-r ${banner.bg} text-white transition-all duration-700`}
      >
        {/* Mobile background icon */}
        <div className="absolute right-3 top-3 text-[70px] opacity-20 lg:hidden">
          {banner.icon}
        </div>

        <div className="flex h-full items-center">
          {/* Content */}
          <div className="w-full lg:w-1/2 px-5 sm:px-8 lg:px-12 z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {banner.title}
              <br />
              <span className="text-yellow-300">{banner.highlight}</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-md line-clamp-3 sm:line-clamp-none">
              {banner.desc}
            </p>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => navigate("/search")}
                className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-semibold active:scale-95 transition"
              >
                Shop Now
              </button>

              <button className="flex-1 bg-white/20 px-6 py-3 rounded-xl font-semibold active:scale-95 transition">
                Explore
              </button>
            </div>
          </div>

          {/* Desktop icon */}
          <div className="hidden lg:flex w-1/2 justify-center items-center">
            <div className="text-[140px] animate-bounce drop-shadow-2xl">
              {banner.icon}
            </div>
          </div>
        </div>

        {/* ✅ Dots – hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 gap-2">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
