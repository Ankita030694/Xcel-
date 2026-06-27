"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, Zap, Maximize, Play, Pause, Factory, Handshake } from 'lucide-react';
import { Header } from './components/Header';

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
          
          // Disconnect observer so it only counts once
          observer.disconnect();
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

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
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
    <div className="bg-[#32589c] w-full pt-[10px] pb-[16px] lg:pt-[14px] lg:pb-[24px] border-t border-b border-[#2a4a83] relative">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto snap-x snap-mandatory gap-2 md:justify-center md:gap-10 lg:gap-20 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing py-3 -my-3"
        >
          
          {/* Stat 1: Machines Installed */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-3 lg:gap-4 text-left cursor-pointer px-2 py-1">
            <h3 className="font-semibold text-[24px] md:text-[28px] lg:text-[36px] leading-none tracking-tight text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Counter end={30000} suffix="+" />
            </h3>
            <p className="font-normal text-[10px] lg:text-[12px] leading-snug text-white/90 max-w-[120px] lg:max-w-[140px]">
              Machines Installed<br />Across India
            </p>
          </div>

          {/* Stat 2: Happy Clients */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-3 lg:gap-4 text-left cursor-pointer px-2 py-1">
            <h3 className="font-semibold text-[24px] md:text-[28px] lg:text-[36px] leading-none tracking-tight text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Counter end={8000} suffix="+" />
            </h3>
            <p className="font-normal text-[10px] lg:text-[12px] leading-snug text-white/90 max-w-[120px] lg:max-w-[140px]">
              Happy Clients<br />and Counting
            </p>
          </div>

          {/* Stat 3: Years of Expertise */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-3 lg:gap-4 text-left cursor-pointer px-2 py-1">
            <h3 className="font-semibold text-[24px] md:text-[28px] lg:text-[36px] leading-none tracking-tight text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Counter end={32} suffix="+" />
            </h3>
            <p className="font-normal text-[10px] lg:text-[12px] leading-snug text-white/90 max-w-[120px] lg:max-w-[140px]">
              Years of<br />Expertise
            </p>
          </div>

          {/* Stat 4: Manufacturing Facility */}
          <div className="group flex-shrink-0 w-[calc(50%-4px)] md:w-auto snap-start flex flex-row items-center justify-center gap-3 lg:gap-4 text-left cursor-pointer px-2 py-1">
            <h3 className="font-semibold text-[24px] md:text-[28px] lg:text-[36px] leading-none tracking-tight text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Counter end={20000} suffix="+" />
            </h3>
            <p className="font-normal text-[10px] lg:text-[12px] leading-snug text-white/90 max-w-[120px] lg:max-w-[140px]">
              Sq. Ft.<br />Manufacturing Facility
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const HeroCarousel = () => {
  const images = ['/hero.png', '/hero-2.png', '/hero-3.png'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

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
      <main 
        className="w-full relative group bg-gray-100 hidden md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
    <section className="bg-[#f3f5f8] w-full pt-12 pb-6 md:pt-14 md:pb-8 relative overflow-hidden">
      {/* Decorative background glowing orbs for slickness */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#0a2766]/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-[#32589c]/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column - Image */}
          <div 
            className="w-full md:w-1/2 shrink-0 relative group flex flex-col cursor-pointer"
            onTouchStart={() => {}}
          >
            {/* Fancy Glow Behind Image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#32589c] to-[#3b5b95] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative aspect-square md:aspect-auto md:flex-1 w-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-gray-400/50 transform transition duration-700 ease-out group-hover:-translate-y-2">
              <img 
                src="/About-home.png" 
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
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">About XCEL</span>
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
            <div className="flex flex-col gap-6 lg:gap-4 mt-2 lg:mt-0">
              
              {/* Bullet 1 */}
              <div 
                className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-start p-4 sm:p-5 lg:p-3 xl:p-5 rounded-3xl transition-all duration-300 cursor-pointer active:scale-[0.98] border bg-white shadow-xl shadow-gray-300 border-gray-100 lg:bg-transparent lg:shadow-none lg:border-transparent hover:bg-white hover:shadow-xl hover:shadow-[#32589c]/10 hover:border-gray-100"
                onTouchStart={() => {}}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-[#e8edf5] flex items-center justify-center shrink-0 transform transition duration-500 ease-out shadow-sm scale-110 rotate-3 lg:shadow-sm lg:scale-100 lg:rotate-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                  <Factory className="w-[50%] h-[50%] transition-colors duration-300 text-[#0a2766] lg:text-[#32589c] group-hover:text-[#0a2766]" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-[13px] sm:text-sm leading-relaxed mt-0 transition-colors duration-300 text-gray-900 lg:text-gray-600 group-hover:text-gray-900">
                  Proudly aligned with the Make in India vision, we grew, we strengthened our in-house manufacturing, R&D and a 20,000 sq ft facility to build complete laundry solutions under one roof. Our equipment is designed, manufactured and tested in India to meet international benchmarks.
                </p>
              </div>

              {/* Bullet 2 */}
              <div 
                className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-start p-4 sm:p-5 lg:p-3 xl:p-5 rounded-3xl transition-all duration-300 cursor-pointer active:scale-[0.98] border bg-white shadow-xl shadow-gray-300 border-gray-100 lg:bg-transparent lg:shadow-none lg:border-transparent hover:bg-white hover:shadow-xl hover:shadow-[#32589c]/10 hover:border-gray-100"
                onTouchStart={() => {}}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-[#e8edf5] flex items-center justify-center shrink-0 transform transition duration-500 ease-out shadow-sm scale-110 -rotate-3 lg:shadow-sm lg:scale-100 lg:rotate-0 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md">
                  <Handshake className="w-[50%] h-[50%] transition-colors duration-300 text-[#0a2766] lg:text-[#32589c] group-hover:text-[#0a2766]" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-[13px] sm:text-sm leading-relaxed mt-0 transition-colors duration-300 text-gray-900 lg:text-gray-600 group-hover:text-gray-900">
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
    beforeIcon: "/Icons/before 1.svg",
    afterIcon: "/Icons/After 1.svg",
  },
  {
    num: "02",
    title: "Warranty & Protection",
    desc: "Dedicated warranty coverage backed by comprehensive technical support",
    beforeIcon: "/Icons/Before 2.svg",
    afterIcon: "/Icons/After 2.svg",
  },
  {
    num: "03",
    title: "Reliable Performance",
    desc: "Laundry Machines that are designed for heavy-duty cycles with consistent performance",
    beforeIcon: "/Icons/before 3.svg",
    afterIcon: "/Icons/after 3.svg",
  },
  {
    num: "04",
    title: "Wide Range",
    desc: "Extensive range of washing, drying, ironing & dry-cleaning equipment under one roof",
    beforeIcon: "/Icons/before 4.svg",
    afterIcon: "/Icons/after 4.svg",
  },
  {
    num: "05",
    title: "After Sales Service",
    desc: "Quick Pan-India support from installation to preventive maintenance",
    beforeIcon: "/Icons/BEFORE 5.svg",
    afterIcon: "/Icons/AFTER 5.svg",
  }
];

const WhyChooseUs = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Autoplay the slider scrolling on all screens
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft >= maxScroll - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Approximate width of one card + gap to scroll by
          sliderRef.current.scrollBy({ left: 160, behavior: 'smooth' });
        }
      }
    }, 6000); // Slowed down from 3000 to 6000
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f3f5f8] w-full pt-8 lg:pt-12 pb-8 lg:pb-12 relative border-t border-gray-100 flex items-center overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center xl:items-stretch">
          
          {/* Left Title Area */}
          <div className="flex flex-col justify-center w-full xl:w-[25%] shrink-0 text-center xl:text-left pr-0 xl:pr-6 sm:border-b xl:border-b-0 xl:border-r border-gray-300 pb-8 xl:pb-0">
            <div className="flex items-center justify-center xl:justify-start gap-2 mb-4">
              <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Our USP's</span>
            </div>
            <h2 className="font-extrabold mt-[2px] text-xl md:text-2xl lg:text-3xl leading-[1.15] text-[#0a2766] tracking-tight">
              Decades of Expertise. <span className="text-[#0a2766]">Built on Trust.</span>
            </h2>
            <div className="hidden sm:block w-16 h-1 bg-[#4777c9] mt-6 mx-auto xl:mx-0"></div>
          </div>

          {/* Right Cards Area */}
          <div 
            ref={sliderRef}
            className="w-full xl:w-[75%] flex flex-nowrap justify-start gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] hover:[animation-play-state:paused]"
          >
            {whyChooseUsData.map((item, index) => {
              const isOdd = index % 2 === 0;
              const frontClasses = isOdd 
                ? "bg-white text-[#0a2766]" 
                : "bg-[#3b5b95] text-white";
              const backClasses = isOdd 
                ? "bg-[#3b5b95] text-white" 
                : "bg-white text-[#0a2766]";
              
              const frontIconColor = isOdd ? "text-[#1d438a]" : "text-white";
              const backIconColor = isOdd ? "text-white" : "text-[#1d438a]";
              const frontLineColor = isOdd ? "bg-[#517ec7]" : "bg-white/50";
              const backLineColor = isOdd ? "bg-white/50" : "bg-[#517ec7]";
              
              const frontBorder = isOdd ? "bg-[#3b5b95]" : "bg-white";
              const backBorder = isOdd ? "bg-white" : "bg-[#3b5b95]";
              
              const solidBaseBg = isOdd ? "bg-white" : "bg-[#3b5b95]";
              
              // The spinning border sits ON TOP of the solid border.
              // If the back side border is white, we need a blue light.
              // If the back side border is blue, we need a white light.
              const spinningLight = isOdd 
                ? "bg-[conic-gradient(from_0deg,transparent_0_180deg,#3b82f6_270deg,transparent_360deg)]"
                : "bg-[conic-gradient(from_0deg,transparent_0_180deg,white_270deg,transparent_360deg)]";

              return (
                <div 
                  key={index} 
                  className="group shrink-0 snap-start w-[140px] sm:w-[170px] lg:w-[190px] xl:w-[185px] 2xl:w-[200px] h-[220px] lg:h-[250px] cursor-pointer" 
                  onTouchStart={() => {}}
                >
                  <div className="relative w-full h-full shadow-sm hover:shadow-xl rounded-sm overflow-hidden">
                    
                    {/* Front Border Layer (Static, disappears on hover) */}
                    <div className={`absolute inset-0 ${frontBorder} transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0`}></div>
                    
                    {/* Back Border Layer (Static, appears on hover to provide contrast for the light) */}
                    <div className={`absolute inset-0 ${backBorder} transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100`}></div>
                    
                    {/* Spinning Light Border (Rotates on top of the solid border) */}
                    <div className={`absolute inset-[-150%] animate-[spin_1.5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[3px] ${spinningLight}`}></div>
                    
                    {/* Solid Base to prevent light bleed during cross-fade */}
                    <div className={`absolute inset-[2px] rounded-sm ${solidBaseBg}`}></div>
                    
                    {/* Front Face */}
                    <div className={`absolute inset-[2px] flex flex-col items-center justify-center text-center p-3 rounded-sm transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 ${frontClasses}`}>
                      <div className={`mb-5 ${frontIconColor}`}>
                        {item.beforeIcon ? <img src={item.beforeIcon} alt="" className="w-[42px] h-[42px] lg:w-[50px] lg:h-[50px] object-contain mx-auto" /> : item.icon}
                      </div>
                      <h3 className="font-bold text-[13px] lg:text-[15px] leading-snug px-0.5 lg:px-2">
                        {item.title}
                      </h3>
                      <div className={`w-6 h-0.5 mt-5 ${frontLineColor}`}></div>
                    </div>

                    {/* Back Face */}
                    <div className={`absolute inset-[2px] flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-sm transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 ${backClasses}`}>
                      <div className={`mb-3 opacity-90 ${backIconColor}`}>
                        {item.afterIcon ? <img src={item.afterIcon} alt="" className="w-[42px] h-[42px] lg:w-[50px] lg:h-[50px] object-contain mx-auto" /> : item.icon}
                      </div>
                      <div className={`w-6 h-0.5 mb-4 opacity-60 ${backLineColor}`}></div>
                      <p className="text-[11px] lg:text-[13px] font-medium leading-relaxed px-0.5">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
const projectsData = [
  {
    id: "industrial",
    title: "Industrial Developments",
    desc: "We develop efficient industrial spaces built for productivity, scalability, and long term operational success. Our projects prioritize functionality, strategic locations, and modern infrastructure to support growing businesses.",
    img: "/industrial.png"
  },
  {
    id: "commercial",
    title: "Commercial Properties",
    desc: "Premium commercial spaces designed for modern businesses, featuring state-of-the-art facilities and prime locations to enhance your corporate presence.",
    img: "/commercial.png"
  },
  {
    id: "residential",
    title: "Residential Communities",
    desc: "Thoughtfully designed residential communities that offer the perfect blend of comfort, luxury, and modern living amenities for families.",
    img: "/residential.png"
  }
];

const ProjectsGallery = () => {
  const [activePane, setActivePane] = useState("industrial");

  return (
    <section className="bg-[#f3f5f8] w-full pt-6 lg:pt-10 pb-6 lg:pb-8 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col items-center justify-center text-center gap-2 lg:gap-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#32589c] font-bold text-lg lg:text-xl tracking-widest animate-pulse">{"//"}</span>
          <span className="text-gray-500 font-bold text-xs sm:text-[13px] lg:text-sm tracking-[0.2em] uppercase">Our Expertise</span>
        </div>
        <h2 className="font-extrabold text-[26px] sm:text-[30px] lg:text-[36px] xl:text-[40px] leading-[1.15] text-[#0a2766] max-w-4xl tracking-tight">
          Building Excellence <br className="hidden sm:block lg:hidden" /> Across Every Sector
        </h2>
      </div>

      {/* Desktop Horizontal Accordion Layout */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-[400px] xl:h-[500px] lg:flex gap-[20px] xl:gap-[33px] hidden">
        {projectsData.map((project) => {
          const isActive = activePane === project.id;
          return (
            <div
              key={project.id}
              onMouseEnter={() => setActivePane(project.id)}
              className={`relative h-full overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? 'flex-[2] lg:flex-[1.8]' : 'flex-[1]'
              }`}
            >
              {/* Background Image */}
              <img 
                src={project.img} 
                alt={project.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`} 
              />
              
              {/* Dark Overlay (darker when inactive) */}
              <div 
                className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                  isActive ? 'opacity-35' : 'opacity-50'
                }`} 
              />

              {/* Content */}
              <div className={`absolute bottom-0 left-0 w-full p-6 xl:p-10 flex flex-col justify-end transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-90'
              }`}>
                <h3 className="text-white font-medium text-2xl xl:text-[35px] leading-tight mb-4 tracking-wide font-sans">
                  {project.title}
                </h3>
                
                {/* Expandable Description */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/95 font-normal text-lg xl:text-[25px] leading-[1.3] xl:leading-[30px] w-full xl:w-[631px]">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Slider Layout (Visible only on screens < lg) */}
      <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {projectsData.map((project) => (
          <div key={project.id} className="relative h-[320px] sm:h-[400px] w-[85vw] sm:w-[400px] shrink-0 snap-center rounded-xl overflow-hidden shadow-sm group cursor-pointer" onTouchStart={() => {}}>
            <img 
              src={project.img} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
              <h3 className="text-white font-medium text-2xl sm:text-3xl leading-tight mb-3 tracking-wide">
                {project.title}
              </h3>
              <p className="text-white/90 text-[14px] sm:text-base leading-relaxed">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="w-full bg-[#32589c] relative shadow-[0_0_40px_10px_#b1c6e9] py-4 lg:py-5 mt-4 z-10">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Left Content */}
          <div className="flex flex-col gap-1 text-center lg:text-left text-white w-full lg:pl-6">
            <h2 className="font-bold text-[20px] sm:text-[24px] lg:text-[26px] xl:text-[30px] leading-[1.2] tracking-tight lg:whitespace-nowrap">
              Performance Without Compromise. Support Without Limits.
            </h2>
            <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-snug text-white/90">
              End-to-End laundry solutions, from installation to after-sales support.
            </p>
          </div>

          {/* Right Button */}
          <div className="shrink-0 mt-3 lg:mt-0 lg:pr-6 pb-2 lg:pb-0">
            <button className="bg-gradient-to-b from-white to-gray-50 text-[#0a2766] font-bold text-[14px] lg:text-[15px] tracking-wider px-6 py-2.5 lg:px-8 lg:py-3.5 rounded-[12px] border border-gray-100 shadow-[0_5px_0_#cbd5e1,0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_0_#94a3b8,0_15px_25px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:shadow-[0_0px_0_#cbd5e1,0_0px_0_rgba(0,0,0,0.2)] active:translate-y-[5px] transition-all duration-200">
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartsToPower = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const features = [
    {
      title: "Premium Components",
      desc: "Industrial-grade bearings, valves, heating elements and stainless-steel baskets built for durability.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      )
    },
    {
      title: "Precision Engineering",
      desc: "Every component is designed to work in perfect harmony for maximum efficiency.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-2.3 9.2c-.3 1.2-2 1.2-2.3 0L9.1 10"/><path d="M12 2v8"/></svg>
      )
    },
    {
      title: "Rigorous Testing",
      desc: "Advanced manufacturing and quality testing ensure consistent and reliable performance.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
      )
    },
    {
      title: "Built for Performance",
      desc: "Machines engineered to reduce downtime and deliver continuous productivity for your business.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
      )
    }
  ];

  return (
    <section className="bg-[#f3f5f8] w-full py-10 lg:py-16 relative border-t border-gray-100 flex items-center overflow-hidden">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Area - Image Comparison Slider */}
          <div className="w-full xl:w-1/2 shrink-0">
            <div 
              ref={containerRef}
              className="relative w-full aspect-square rounded-[20px] overflow-hidden select-none cursor-ew-resize group shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
            >
              {/* Under Image (Parts) */}
              <img 
                src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1200&auto=format&fit=crop" 
                alt="Machine Parts"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              
              {/* Over Image (Exterior) */}
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop" 
                alt="Machine Exterior"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              />

              {/* Slider Line & Handle */}
              <div 
                className="absolute top-0 bottom-0 w-[3px] bg-white z-10"
                style={{ left: `calc(${sliderPos}% - 1.5px)` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a2766] border-[3px] border-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18 6-6-6-6"/><path d="m9 18-6-6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area - Content & Grid */}
          <div className="flex flex-col w-full xl:w-1/2 lg:pt-2 h-full">
            <h2 className="font-extrabold text-[28px] sm:text-[32px] lg:text-[36px] xl:text-[40px] leading-[1.1] text-[#0a2766] tracking-tight mb-2.5">
              From Parts to <span className="text-[#32589c]">Power</span>
            </h2>
            <div className="w-12 h-[4px] bg-[#32589c] mb-3"></div>
            <p className="text-gray-600 text-[15px] lg:text-[16px] leading-relaxed max-w-2xl mb-8">
              Performance begins long before a machine reaches your facility. It begins with premium components, precision engineering and rigorous testing that power every XCEL system.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="group bg-white border border-gray-100 p-3 sm:p-4 lg:p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.12)] hover:border-[#32589c]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer" onTouchStart={() => {}}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#0a2766] rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#32589c] group-hover:shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-[#0a2766] text-[13px] sm:text-[16px] mb-1 sm:mb-1.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-[11px] sm:text-[13px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Alert Banner */}
            <div className="bg-white rounded-xl p-4 sm:p-5 flex items-start sm:items-center gap-4 border border-gray-100 mt-auto shadow-sm">
              <div className="w-10 h-10 shrink-0 bg-[#0a2766] rounded-full flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <p className="text-gray-600 text-[13px] sm:text-[14px] leading-snug">
                  Great performance doesn't begin at the finish line. <span className="text-[#32589c] font-semibold">It starts with every component inside.</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f5f8] py-8 lg:py-10 px-4 sm:px-8 lg:px-12 flex justify-center font-sans">
      {/* Outer Wrapper for the white grid lines */}
      <div className="w-full max-w-[1500px] bg-white flex flex-col gap-[2px] shadow-sm">
        
        {/* Top Split Area */}
        <div className="flex flex-col lg:flex-row gap-[2px] w-full">
          
          {/* Left Column - Contact Form */}
          <div className="w-full lg:w-[35%] bg-[#d3dce8] p-6 lg:p-8 flex flex-col text-[#0a2766]">
            <h3 className="text-[24px] lg:text-[28px] font-bold mb-1">Get in Touch with us</h3>
            <p className="text-[#0a2766]/80 text-[14px] mb-5 leading-snug">
              A Stefab professional will<br />contact you as soon as possible.
            </p>
            
            {/* Flush Inputs */}
            <div className="flex flex-col bg-white border-none w-full mb-4">
              <input type="text" placeholder="Name*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="text" placeholder="Contact No.*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="email" placeholder="Email Address*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="text" placeholder="Location*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <textarea rows={2} placeholder="Message" className="w-full bg-transparent px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors resize-none text-[13px]"></textarea>
            </div>
            
            {/* Checkboxes */}
            <div className="mt-1 mb-6">
              <p className="text-[#0a2766] mb-2 text-[13px]">Area of Interest</p>
              <div className="flex flex-wrap gap-5 mb-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Sales</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Services</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Services 2</span>
                </label>
              </div>
              
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 accent-[#002d73] cursor-pointer shrink-0" />
                <span className="text-[#0a2766] text-[13px] leading-tight">by checking this box I accept the <strong>Privacy Policy</strong></span>
              </label>
            </div>

            <button type="button" className="w-full bg-[#002d73] hover:bg-[#001f54] text-white font-medium text-[15px] py-3 transition-colors">
              SUBMIT
            </button>
          </div>

          {/* Right Column - Info & Links (Grid of white gaps) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-[2px] bg-white">
            
            {/* Section 1: Corporate Office & About */}
            <div className="flex flex-col md:flex-row gap-[2px] h-auto">
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">Our Corporate Office</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  XCEL Engineering Pvt. Ltd.<br />
                  Plot No. 123, Industrial Estate,<br />
                  Sector 18, IMT Manesar,<br />
                  Gurugram, Haryana 122050, India<br /><br />
                  info@xcelindia.com
                </p>
              </div>
              
              {/* White spacer block */}
              <div className="hidden md:block w-[120px] bg-white"></div>
              
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">About XCEL</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  XCEL has been manufacturing high-performance industrial and commercial laundry equipment since 1994, delivering reliable washing, drying, ironing, and dry-cleaning solutions across India.
                </p>
              </div>
            </div>

            {/* Section 2: Social Icons */}
            <div className="w-full bg-[#3b5e94] py-3 flex justify-center items-center gap-6">
              {/* X Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* WhatsApp Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>

            {/* Section 3: Links Grid */}
            <div className="w-full bg-[#3b5e94] px-6 py-6 grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-4 text-white">
              <div>
                <h5 className="font-semibold text-[14px] mb-3">HOME</h5>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">ABOUT US</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Company Profile</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Manufacturing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Quality Assurance</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Why XCEL</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">PRODUCTS</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Washing Machines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Drying Tumblers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Washer Extractors</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Flatwork Ironers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">INDUSTRIES</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Hotels & Resorts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Laundromats</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Garment Industry</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Industrial & Textile</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">SUPPORT</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Spare Parts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">CONTACT</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Service Centers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dealer Network</a></li>
                </ul>
              </div>
            </div>

            {/* Section 4: Certifications & Badges */}
            <div className="w-full bg-[#002d73] py-6 px-6 flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
               {/* Placeholders for logos matching the image */}
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">ISO</span>
                 <span className="text-[6px] font-bold text-center leading-tight mt-1">9001-2008<br/>CERTIFIED</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">PCMS</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-md flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="text-[7px] mb-1">Registered</span>
                 <span className="font-bold text-[12px]">Care</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[24px]">CE</span>
                 <span className="text-[5px] tracking-widest mt-1">CERTIFIED</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">GMP</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-md flex flex-col items-center justify-center text-white border border-white/20">
                 <div className="w-5 h-5 border-2 border-white rounded-t-full mb-1"></div>
                 <span className="text-[5px] text-center leading-tight">NORWEGIAN<br/>ACCREDITATION</span>
               </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-[#002d73] px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-white font-semibold text-[20px] tracking-wide">
            XCEL INDIA
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[12px] font-semibold tracking-wide text-white">
            <a href="#" className="hover:text-white/70 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white/70 transition-colors">TERMS & CONDITIONS</a>
            <a href="#" className="hover:text-white/70 transition-colors">SITEMAP</a>
            <a href="#" className="hover:text-white/70 transition-colors">SALES TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Stats Banner */}
      <StatsBanner />

      {/* About Us Section */}
      <AboutUs />

      {/* Why Choose XCEL Section */}
      <WhyChooseUs />

      {/* Projects Gallery Section */}
      <ProjectsGallery />

      {/* CTA Banner Section */}
      <CTABanner />

      {/* Parts to Power Slider Section */}
      <PartsToPower />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
