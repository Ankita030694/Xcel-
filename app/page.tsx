"use client";

import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            
            if (progress < 1) {
              animationFrame = window.requestAnimationFrame(step);
            }
          };
          animationFrame = window.requestAnimationFrame(step);
        } else {
          setCount(0);
          if (animationFrame) cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }
    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const StatsBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle active dot update
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth / 2;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(2, Math.max(0, newIndex)));
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
          const itemWidth = scrollRef.current.clientWidth / 2;
          const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          
          if (scrollRef.current.scrollLeft >= maxScroll - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Draggable logic for mouse users (mobile is natively draggable)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftPos(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <div className="bg-[#32589c] w-full py-[8.5px] lg:py-[12.5px] border-t border-b border-[#2a4a83] relative">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto snap-x snap-mandatory gap-2 md:grid md:grid-cols-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing py-3 -my-3"
        >
          
          {/* Stat 1: Machines Installed */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-2.5 md:gap-3 text-left cursor-pointer">
            <div className="bg-white rounded-full w-[32px] h-[32px] md:w-[38px] md:h-[38px] lg:w-[44px] lg:h-[44px] flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 md:p-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg">
               {/* Setting/Gear Icon */}
               <svg className="w-full h-full text-[#0a2766] transition-colors duration-300 group-hover:text-[#32589c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
               </svg>
            </div>
            <div className="flex flex-col text-white">
              <p className="font-semibold text-[16px] lg:text-[24px] leading-none tracking-wide mb-1 lg:mb-1.5">
                <Counter end={30000} suffix="+" />
              </p>
              <p className="font-normal text-[9px] lg:text-[12px] leading-snug md:max-w-[140px]">
                Machines Installed Across India
              </p>
            </div>
          </div>

          {/* Stat 2: Happy Clients */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-2.5 md:gap-3 text-left cursor-pointer">
            <div className="bg-white rounded-full w-[32px] h-[32px] md:w-[38px] md:h-[38px] lg:w-[44px] lg:h-[44px] flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 md:p-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg">
               {/* Users/Group Icon */}
               <svg className="w-full h-full text-[#0a2766] transition-colors duration-300 group-hover:text-[#32589c]" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                 <path d="M18 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-12 0c1.66 0 3-1.34 3-3S7.66 5 6 5 3 6.34 3 8s1.34 3 3 3zm12 2c-.3 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5zm-12 0c-2.33 0-7 1.17-7 3.5V19h6v-2.5c0-1.48.81-2.61 1.97-3.45C5.62 13.02 5.3 13 5 13z"/>
               </svg>
            </div>
            <div className="flex flex-col text-white">
              <p className="font-semibold text-[16px] lg:text-[24px] leading-none tracking-wide mb-1 lg:mb-1.5">
                <Counter end={8000} suffix="+" />
              </p>
              <p className="font-normal text-[9px] lg:text-[12px] leading-snug md:max-w-[130px]">
                Happy Clients & Counting
              </p>
            </div>
          </div>

          {/* Stat 3: Years of Excellence */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-2.5 md:gap-3 text-left cursor-pointer">
            <div className="bg-white rounded-full w-[32px] h-[32px] md:w-[38px] md:h-[38px] lg:w-[44px] lg:h-[44px] flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 md:p-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg">
               {/* Badge/Award Icon */}
               <svg className="w-[90%] h-[90%] text-[#0a2766] transition-colors duration-300 group-hover:text-[#32589c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round">
                 <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
                 <circle cx="12" cy="9" r="6" />
                 <path d="M12 6.5l.8 1.8h1.7l-1.3 1.2.5 1.8-1.7-1.1-1.7 1.1.5-1.8-1.3-1.2h1.7z" fill="currentColor" stroke="none" />
               </svg>
            </div>
            <div className="flex flex-col text-white">
              <p className="font-semibold text-[16px] lg:text-[24px] leading-none tracking-wide mb-1 lg:mb-1.5">
                <Counter end={32} suffix="+" />
              </p>
              <p className="font-normal text-[9px] lg:text-[12px] leading-snug md:max-w-[150px]">
                Years of Manufacturing Excellence
              </p>
            </div>
          </div>

          {/* Stat 4: States Covered */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-2.5 md:gap-3 text-left cursor-pointer">
            <div className="bg-white rounded-full w-[32px] h-[32px] md:w-[38px] md:h-[38px] lg:w-[44px] lg:h-[44px] flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 md:p-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg">
               {/* Location Icon */}
               <svg className="w-[85%] h-[85%] text-[#0a2766] transition-colors duration-300 group-hover:text-[#32589c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                 <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" />
                 <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <ellipse cx="12" cy="22" rx="5" ry="1.5" />
               </svg>
            </div>
            <div className="flex flex-col text-white">
              <p className="font-semibold text-[16px] lg:text-[24px] leading-none tracking-wide mb-1 lg:mb-1.5">
                <Counter end={25} suffix="+" />
              </p>
              <p className="font-normal text-[9px] lg:text-[12px] leading-snug md:max-w-[130px]">
                States Covered
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const HeroCarousel = () => {
  const images = ['/hero.png', '/hero-2.png', '/hero-3.png'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Mobile-Only Static Hero */}
      <main className="w-full relative block md:hidden">
        <img 
          src="/Mobile-%20Hero.png" 
          alt="Mobile Hero Banner" 
          className="w-full h-auto object-cover" 
        />
      </main>

      {/* Desktop/Tablet Hero Carousel */}
      <main className="w-full relative group bg-gray-100 hidden md:block">
        <div className="w-full overflow-hidden relative">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full shrink-0">
              <img 
                src={img} 
                alt={`Hero Banner ${idx + 1}`} 
                className="w-full h-auto object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 shadow-sm ${
              currentIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (visible on hover) */}
      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </main>
    </>
  );
};

const AboutUs = () => {
  return (
    <section className="bg-[#f3f5f8] w-full pt-12 pb-12 md:pt-14 md:pb-16 relative overflow-hidden">
      {/* Decorative background glowing orbs for slickness */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#0a2766]/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-[#32589c]/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column - Image */}
          <div className="w-full md:w-1/2 shrink-0 relative group flex flex-col">
            {/* Fancy Glow Behind Image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#32589c] to-[#3b5b95] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative aspect-[5/4] md:aspect-auto md:flex-1 w-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-gray-400/50 transform transition duration-700 ease-out hover:-translate-y-2">
              <img 
                src="/laser-cutting.png" 
                alt="Precision Laser Cutting Manufacturing" 
                className="absolute inset-0 w-full h-full object-cover transform transition duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2766]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-4">
            
            {/* Header Area */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">About Us</span>
            </div>

            <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl leading-[1.15] mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500">
              Building India's Future in <span className="text-[#32589c]">Commercial Laundry</span> Manufacturing
            </h2>

            <div className="text-gray-600 font-normal text-sm leading-relaxed space-y-3 mb-6">
              <p className="border-l-4 border-[#32589c] pl-5 py-1 opacity-90 transition-all duration-300 hover:border-l-8">
                Some businesses are built on opportunity. Ours was built on the belief that India can create world-class commercial laundry equipment without relying on imports. From our early days only, we focused on precision engineering, uncompromising quality and deep industry understanding.
              </p>
              <p className="pl-6 md:pl-7 opacity-90">
                Every laundry machine at our factory is manufactured to meet the high-stakes demands of hotels, hospitals, garment units and commercial laundries where performance and reliability are critical.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="flex flex-col gap-4">
              
              {/* Bullet 1 */}
              <div className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-start p-3 sm:p-4 md:p-5 rounded-3xl hover:bg-white/60 hover:shadow-xl hover:shadow-[#32589c]/5 transition-all duration-300 border border-transparent hover:border-white cursor-default">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-[#e8edf5] shadow-sm flex items-center justify-center shrink-0 transform transition duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                  <svg className="w-[50%] h-[50%] text-[#32589c] transition-colors duration-300 group-hover:text-[#0a2766]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V9l-6-4-6 4v12M3 21h18M9 21v-6h6v6M14 9V5a2 2 0 00-2-2H8a2 2 0 00-2 2v4M10 5v4" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium text-xs lg:text-sm leading-relaxed mt-0 transition-colors duration-300 group-hover:text-gray-900">
                  Proudly aligned with the Make in India vision, we grew, we strengthened our in-house manufacturing, R&D and a 20,000 sq ft facility to build complete laundry solutions under one roof. Our equipment is designed, manufactured and tested in India to meet international benchmarks.
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-start p-3 sm:p-4 md:p-5 rounded-3xl hover:bg-white/60 hover:shadow-xl hover:shadow-[#32589c]/5 transition-all duration-300 border border-transparent hover:border-white cursor-default">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-[#e8edf5] shadow-sm flex items-center justify-center shrink-0 transform transition duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md">
                  <svg className="w-[50%] h-[50%] text-[#32589c] transition-colors duration-300 group-hover:text-[#0a2766]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5L21 3v6l-4.5 4.5m-3-3L10.5 15l-6-6h6l4.5 4.5m0 0L21 21v-6l-4.5-4.5" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium text-xs lg:text-sm leading-relaxed mt-0 transition-colors duration-300 group-hover:text-gray-900">
                  Beyond manufacturing, we remain committed to our customers through comprehensive installation support, readily available spare parts and a responsive PAN India service network. Our customers return not just for performance but for trust, reliability and long-term partnership.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const whyChooseUsData = [
  {
    num: "01",
    title: "Transparent Pricing",
    desc: "Clear, upfront pricing with no hidden charges for complete customer confidence",
    icon: (
      <svg className="w-12 h-12 text-[#32589c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        <text x="7.5" y="15.5" fontSize="8" fontWeight="bold" fill="currentColor">₹</text>
      </svg>
    )
  },
  {
    num: "02",
    title: "Warranty & Protection",
    desc: "Dedicated warranty coverage backed by comprehensive technical support",
    icon: (
      <svg className="w-12 h-12 text-[#32589c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Reliable Performance",
    desc: "Laundry Machines that are designed for heavy-duty cycles with consistent performance",
    icon: (
      <svg className="w-12 h-12 text-[#32589c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth="1.5" />
        <circle cx="12" cy="13" r="4" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 6h2m4 0h2" />
      </svg>
    )
  },
  {
    num: "04",
    title: "Wide Range",
    desc: "Extensive range of washing, drying, ironing & dry-cleaning equipment under one roof",
    icon: (
      <svg className="w-12 h-12 text-[#32589c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="8" width="8" height="10" rx="1" strokeWidth="1.5" />
        <circle cx="7" cy="13" r="2" strokeWidth="1.5" />
        <rect x="13" y="6" width="8" height="14" rx="1" strokeWidth="1.5" />
        <circle cx="17" cy="14" r="3" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: "05",
    title: "After Sales Service",
    desc: "Quick Pan-India support from installation to preventive maintenance",
    icon: (
      <svg className="w-12 h-12 text-[#32589c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

const WhyChooseUs = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          // Reached the end, scroll back to start
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll right by one card
          current.scrollBy({ left: 324, behavior: 'smooth' });
        }
      }
    }, 3500);
    
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by approximately one card width plus gap
      const scrollAmount = direction === 'left' ? -324 : 324; 
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#fcfdff] w-full py-8 md:py-12 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#32589c] font-bold text-xl tracking-widest animate-pulse">{"//"}</span>
            <span className="text-gray-500 font-bold text-sm tracking-[0.2em] uppercase">Why Choose XCEL</span>
          </div>
          <h2 className="font-extrabold text-xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-[#363636] max-w-4xl">
            Built on Experience.<br/>Trusted for Performance.
          </h2>
        </div>

        {/* Slider Navigation & Container */}
        <div className="relative group">
          
          {/* Scroll Prev Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white border border-gray-100 shadow-xl rounded-full flex items-center justify-center text-[#32589c] hover:bg-[#32589c] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 lg:-left-7 hidden md:flex"
            aria-label="Previous cards"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {whyChooseUsData.map((item, index) => (
              <div 
                key={index} 
                className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start flex flex-col items-start gap-6 group/card hover:-translate-y-1.5 transition-all duration-500 bg-transparent rounded-2xl"
              >
                {/* Number & Line */}
                <div className="w-full flex flex-col gap-3">
                  <span className="text-xl md:text-2xl font-normal text-[#061f47]">{item.num}</span>
                  <div className="h-px w-full bg-gray-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 bg-[#32589c] group-hover/card:w-full transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5">
                  {/* Icon */}
                  <div className="w-[60px] h-[60px] rounded-xl flex items-center justify-start group-hover/card:scale-110 transition-transform duration-500 origin-left">
                    {item.icon}
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-[#061f47]">{item.title}</h3>
                    <p className="text-sm md:text-base text-[#061f47]/65 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Next Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white border border-gray-100 shadow-xl rounded-full flex items-center justify-center text-[#32589c] hover:bg-[#32589c] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 lg:-right-7 hidden md:flex"
            aria-label="Next cards"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>

        </div>
      </div>
    </section>
  );
};

const PromoBanners = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-5 items-center justify-center w-full">
          {/* Banner 1 - Wide */}
          <div className="w-full xl:w-[53%] relative rounded-xl overflow-hidden shadow-sm group">
            <img 
              src="/real-promo-1.jpg" 
              alt="Apparel Washing Machine" 
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full xl:w-[47%] items-center">
            {/* Banner 2 - Vertical */}
            <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden shadow-sm group">
              <img 
                src="/real-promo-2.png" 
                alt="Crisp Linen" 
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
            
            {/* Banner 3 - Vertical */}
            <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden shadow-sm group">
              <img 
                src="/real-promo-3.png" 
                alt="Engineered for Washing" 
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <header className="w-full relative z-40">
        {/* Top Bar */}
        <div className="bg-[#3b5b95] text-white text-center py-2 text-[13px] font-medium tracking-wide">
          Pan-India Installation and Service Network.
        </div>
        
        {/* Main Navbar */}
        <div className="bg-[#f8f9fa] w-full border-b border-gray-100 relative z-40">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex justify-between items-center h-[90px]">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <svg width="160" height="54" viewBox="0 0 160 54" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="156" height="50" rx="6" fill="transparent" stroke="#e31e24" strokeWidth="1.5" />
                  <line x1="8" y1="11" x2="152" y2="11" stroke="#e31e24" strokeWidth="0.8" />
                  <line x1="8" y1="19" x2="152" y2="19" stroke="#e31e24" strokeWidth="0.8" />
                  <line x1="8" y1="27" x2="152" y2="27" stroke="#e31e24" strokeWidth="0.8" />
                  <line x1="8" y1="35" x2="152" y2="35" stroke="#e31e24" strokeWidth="0.8" />
                  <line x1="8" y1="43" x2="152" y2="43" stroke="#e31e24" strokeWidth="0.8" />
                  
                  <g transform="translate(80, 40)" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" letterSpacing="1" textAnchor="middle">
                    <text stroke="#f8f9fa" strokeWidth="10" strokeLinejoin="round" fill="#f8f9fa">
                      <tspan fontSize="38">X</tspan>
                      <tspan fontSize="24" dy="-6">C</tspan>
                      <tspan fontSize="38" dy="6">EL</tspan>
                    </text>
                    <text fill="#e31e24">
                      <tspan fontSize="38">X</tspan>
                      <tspan fontSize="24" dy="-6">C</tspan>
                      <tspan fontSize="38" dy="6">EL</tspan>
                    </text>
                  </g>
                </svg>
              </div>
              
              {/* Navigation Links - Desktop */}
              <nav className="hidden lg:flex items-center space-x-9 mt-1">
                <a href="#" className="text-[#3b5b95] font-semibold text-[14px] border-b-[1.5px] border-[#3b5b95] pb-1">
                  HOME
                </a>
                <a href="#" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                  ABOUT US
                </a>
                <div className="relative group flex items-center cursor-pointer pb-1 border-b-[1.5px] border-transparent hover:border-[#3b5b95] transition-all">
                  <span className="text-[#3b5b95] font-semibold text-[14px]">PRODUCTS</span>
                  <svg className="w-[14px] h-[14px] ml-1 text-[#3b5b95]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <a href="#" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                  INDUSTRY INSIGHTS
                </a>
                <a href="#" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                  CONTACT US
                </a>
              </nav>
              
              {/* Download Button - Desktop */}
              <div className="hidden md:flex items-center">
                <button className="bg-[#3b5b95] text-white px-5 py-2.5 rounded hover:bg-[#2f497a] transition-colors flex items-center font-medium text-[15px] shadow-sm">
                  Download Brochure
                  <svg className="w-4 h-4 ml-1.5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-[#3b5b95] hover:text-[#2f497a] focus:outline-none p-2 rounded-md transition-colors"
                  aria-label="Open menu"
                >
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu Slide-in Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl lg:hidden flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <span className="text-[#3b5b95] font-bold text-lg tracking-wider">MENU</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-[#e31e24] focus:outline-none p-1 transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col py-6 px-6 space-y-6 overflow-y-auto">
            <a href="#" className="text-[#3b5b95] font-semibold text-[15px] border-b-[1.5px] border-[#3b5b95] pb-1 w-max">
              HOME
            </a>
            <a href="#" className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
              ABOUT US
            </a>
            <div className="flex flex-col">
              <div className="flex items-center cursor-pointer">
                <span className="text-[#3b5b95] font-semibold text-[15px]">PRODUCTS</span>
                <svg className="w-4 h-4 ml-1 text-[#3b5b95]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <a href="#" className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
              INDUSTRY INSIGHTS
            </a>
            <a href="#" className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
              CONTACT US
            </a>
            
            <div className="pt-6 mt-4 border-t border-gray-100 flex md:hidden">
              <button className="bg-[#3b5b95] text-white px-5 py-3 rounded hover:bg-[#2f497a] transition-colors flex items-center justify-center font-medium text-[15px] w-full shadow-sm">
                Download Brochure
                <svg className="w-4 h-4 ml-1.5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroCarousel />

      {/* Stats Banner */}
      <StatsBanner />

      {/* About Us Section */}
      <AboutUs />

      {/* Why Choose XCEL Section */}
      <WhyChooseUs />

      {/* Promo Banners Section */}
      <PromoBanners />
    </div>
  );
}
