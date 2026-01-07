import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const banners = [{ title: "Health & Care", highlight: "First", desc: "Take care of your body and mind with trusted health and wellness products. From daily supplements to personal hygiene essentials, everything is designed to support a healthier, more balanced lifestyle for you and your family.", bg: "from-lime-600 to-green-600", icon: "💊", }, { title: "Wellness That", highlight: "Matters", desc: "Explore a wide range of wellness products including vitamins, immunity boosters, fitness essentials, and self-care solutions that help you stay active, energetic, and stress-free every day.", bg: "from-emerald-600 to-teal-600", icon: "🧘", }, { title: "Daily Health", highlight: "Essentials", desc: "Stock up on everyday health essentials such as masks, sanitizers, medical supplies, and hygiene products. Designed for convenience, safety, and reliability for your daily health needs.", bg: "from-green-600 to-cyan-600", icon: "🩺", }, { title: "Immunity", highlight: "Boosters", desc: "Strengthen your immunity with carefully selected supplements, herbal products, and nutrition essentials. Support your body’s natural defense system and stay protected throughout every season.", bg: "from-lime-500 to-emerald-500", icon: "🛡️", }, { title: "Personal Care", highlight: "Routine", desc: "Upgrade your personal care routine with skincare, haircare, oral care, and grooming products. Gentle, effective, and suitable for all skin types, ensuring confidence and freshness all day long.", bg: "from-rose-500 to-pink-600", icon: "🧴", }, { title: "Fitness &", highlight: "Recovery", desc: "Support your fitness journey with recovery tools, protein supplements, wellness accessories, and health monitors. Designed to help you perform better, recover faster, and maintain a healthy routine.", bg: "from-blue-600 to-indigo-600", icon: "🏋️", }, { title: "Care for", highlight: "Every Age", desc: "Health products tailored for kids, adults, and seniors. From baby care to senior wellness essentials, discover solutions that provide comfort, care, and peace of mind for every stage of life.", bg: "from-yellow-500 to-orange-500", icon: "👨‍👩‍👧‍👦", }, { title: "Mind & Body", highlight: "Balance", desc: "Focus on mental wellness with stress-relief products, relaxation tools, and self-care essentials. Create a calm, balanced lifestyle that supports both emotional well-being and physical health.", bg: "from-purple-600 to-violet-600", icon: "🧠", }, { title: "Medical", highlight: "Care", desc: "Access reliable medical equipment and health devices including thermometers, BP monitors, and wellness trackers. Accurate, easy-to-use tools that help you monitor and manage your health at home.", bg: "from-slate-600 to-gray-700", icon: "🩹", }, { title: "Healthy Living", highlight: "Everyday", desc: "Adopt healthier habits with nutrition products, organic care items, and lifestyle essentials. Simple choices today can lead to long-term wellness and a more energetic, healthier future.", bg: "from-green-700 to-lime-700", icon: "🌿", }];

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
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
