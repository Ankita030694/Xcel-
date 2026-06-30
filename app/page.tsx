"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, Zap, Maximize, Play, Pause, Factory, Handshake } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Users, Award, MapPin } from 'lucide-react';

const Counter = ({ end, duration = 2500, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
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
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            
            if (progress < 1) {
              animationFrame = window.requestAnimationFrame(step);
            }
          };
          animationFrame = window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '50px' }
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const stats = [
    {
      end: 30000,
      suffix: "+",
      title: "Machines Installed",
      subtitle: "",
      icon: <MapPin className="w-8 h-8 text-blue-300" />,
      bgIcon: <MapPin className="w-32 h-32 text-white/5 absolute -bottom-6 -right-6 transform -rotate-12" />
    },
    {
      end: 8000,
      suffix: "+",
      title: "Happy Clients",
      subtitle: "",
      icon: <Users className="w-8 h-8 text-blue-300" />,
      bgIcon: <Users className="w-32 h-32 text-white/5 absolute -bottom-6 -right-6 transform -rotate-12" />
    },
    {
      end: 32,
      suffix: "+",
      title: "Years of Expertise",
      subtitle: "",
      icon: <Award className="w-8 h-8 text-blue-300" />,
      bgIcon: <Award className="w-32 h-32 text-white/5 absolute -bottom-6 -right-6 transform -rotate-12" />
    },
    {
      end: 20000,
      suffix: "+",
      title: "Sq. Ft. Facility",
      subtitle: "",
      icon: <Factory className="w-8 h-8 text-blue-300" />,
      bgIcon: <Factory className="w-32 h-32 text-white/5 absolute -bottom-6 -right-6 transform -rotate-12" />
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % stats.length;
        if (scrollRef.current) {
          // If the container fits all items (desktop), don't auto-scroll
          if (scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) return prevIndex;
          
          const firstChild = scrollRef.current.children[0] as HTMLElement;
          const scrollAmount = firstChild ? firstChild.offsetWidth : 0;
          if (nextIndex === 0) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollTo({ left: nextIndex * scrollAmount, behavior: 'smooth' });
          }
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const firstChild = target.children[0] as HTMLElement;
    if (!firstChild) return;
    const itemWidth = firstChild.offsetWidth;
    const index = Math.round(target.scrollLeft / itemWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 16 : 0;
      scrollRef.current.scrollTo({ left: idx * scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <div className="relative w-full py-4 lg:py-6 bg-[#32589c] group">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Stats Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-row flex-nowrap items-center w-full max-w-6xl mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1 scroll-smooth"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="w-1/2 md:w-auto md:flex-1 shrink-0 snap-start flex justify-center transition-transform duration-500 hover:-translate-y-1"
            >
              
              <div className="relative z-10 flex flex-row items-center gap-1 sm:gap-2 lg:gap-4 text-left w-full justify-center lg:justify-center">
                
                <h3 className="font-extrabold text-[18px] sm:text-xl md:text-2xl lg:text-3xl text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </h3>
                
                <div className="flex items-center">
                  <p className="font-semibold text-blue-100 text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-[1.15] sm:leading-tight whitespace-nowrap">
                    {stat.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroCarousel = () => {
  const images = ['/hero.png', '/hero-2.png', '/hero-3.png'];
  const mobileImages = ['/Mobile- Hero.png', '/Mobile- Hero 2 (1080 x 1250 px).png', '/Mobile - Hero 3 (1080 x 1250 px).png'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        if (mobileScrollRef.current) {
          const clientWidth = mobileScrollRef.current.clientWidth;
          mobileScrollRef.current.scrollTo({ left: nextIndex * clientWidth, behavior: 'smooth' });
        }
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    if (mobileScrollRef.current) {
      const clientWidth = mobileScrollRef.current.clientWidth;
      mobileScrollRef.current.scrollTo({ left: idx * clientWidth, behavior: 'smooth' });
    }
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <>
      {/* Mobile-Only Hero Carousel */}
      <main 
        className="w-full relative block md:hidden overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {mobileImages.map((img, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-center">
              <img 
                src={img} 
                alt={`Mobile Hero Banner ${idx + 1}`} 
                className="w-full h-auto object-cover" 
              />
            </div>
          ))}
        </div>



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
            onClick={() => handleDotClick(idx)}
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
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" /></svg>
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
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch md:items-start lg:items-stretch">
          
          {/* Left Column - Image */}
          <div 
            tabIndex={0}
            className="w-full md:w-5/12 lg:w-1/2 shrink-0 relative group flex flex-col cursor-pointer outline-none"
            onTouchStart={() => {}}
          >
            {/* Fancy Glow Behind Image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#32589c] to-[#3b5b95] rounded-[2rem] blur opacity-20 group-hover:opacity-40 group-focus:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative aspect-square md:aspect-square lg:aspect-auto lg:flex-1 lg:h-full w-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-gray-400/50 transform transition duration-700 ease-out group-hover:-translate-y-2 group-focus:-translate-y-2">
              <img 
                src="/About-home.png" 
                alt="Precision Laser Cutting Manufacturing" 
                className="absolute inset-0 w-full h-full object-cover transform transition duration-700 ease-out group-hover:scale-110 group-focus:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2766]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col pt-2 md:pt-4">
            
            {/* Header Area */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">About XCEL</span>
            </div>

            <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl leading-[1.15] mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500">
              Building India's Future in <span className="text-[#32589c]">Commercial Laundry</span> Manufacturing
            </h2>

            <div className="text-gray-600 font-normal text-sm leading-relaxed space-y-3 mb-6">
              <p 
                tabIndex={0}
                className="border-l-4 border-[#32589c] pl-5 py-1 opacity-90 transition-all duration-300 hover:border-l-8 focus:border-l-8 outline-none cursor-pointer"
              >
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
                tabIndex={0}
                className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-center p-4 sm:p-5 md:p-3 xl:p-5 rounded-3xl transition-all duration-300 cursor-pointer active:scale-[0.98] border bg-white shadow-xl shadow-gray-300 border-gray-100 md:bg-transparent md:shadow-none md:border-transparent hover:bg-white hover:shadow-xl hover:shadow-[#32589c]/10 hover:border-gray-100 outline-none md:border-l-4 md:border-l-transparent md:focus:border-l-8 md:focus:border-l-[#32589c] md:hover:border-l-8 md:hover:border-l-[#32589c]"
                onTouchStart={() => {}}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 transform transition duration-500 ease-out shadow-sm scale-110 rotate-3 md:shadow-sm md:scale-100 md:rotate-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md rounded-full bg-transparent overflow-hidden">
                  <img src="/Icons%20About/BeforeAfter-About-Us-Layout-9-scaled-e1781799894517_2.png" alt="Manufacturing" className="w-full h-full object-contain" />
                </div>
                <p className="font-medium text-[13px] sm:text-sm leading-relaxed mt-0 transition-colors duration-300 text-gray-900 md:text-gray-600 group-hover:text-gray-900">
                  Proudly aligned with the Make in India vision, we grew, we strengthened our in-house manufacturing, R&D and a 20,000 sq ft facility to build complete laundry solutions under one roof. Our equipment is designed, manufactured and tested in India to meet international benchmarks.
                </p>
              </div>

              {/* Bullet 2 */}
              <div 
                tabIndex={0}
                className="group flex flex-row gap-3 sm:gap-4 md:gap-5 items-center p-4 sm:p-5 md:p-3 xl:p-5 rounded-3xl transition-all duration-300 cursor-pointer active:scale-[0.98] border bg-white shadow-xl shadow-gray-300 border-gray-100 md:bg-transparent md:shadow-none md:border-transparent hover:bg-white hover:shadow-xl hover:shadow-[#32589c]/10 hover:border-gray-100 outline-none md:border-l-4 md:border-l-transparent md:focus:border-l-8 md:focus:border-l-[#32589c] md:hover:border-l-8 md:hover:border-l-[#32589c]"
                onTouchStart={() => {}}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 transform transition duration-500 ease-out shadow-sm scale-110 -rotate-3 md:shadow-sm md:scale-100 md:rotate-0 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md rounded-full bg-transparent overflow-hidden">
                  <img src="/Icons%20About/BeforeAfter-About-Us-Layout-10-scaled-e1781799961570_2.png" alt="Partnership" className="w-full h-full object-contain" />
                </div>
                <p className="font-medium text-[13px] sm:text-sm leading-relaxed mt-0 transition-colors duration-300 text-gray-900 md:text-gray-600 group-hover:text-gray-900">
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
    desc: "Clear, upfront pricing with no hidden charges for complete customer confidence.",
    beforeIcon: "/Icons/before 1.svg",
    afterIcon: "/Icons/After 1.svg",
  },
  {
    num: "02",
    title: "Warranty & Protection",
    desc: "Dedicated warranty coverage backed by comprehensive technical support.",
    beforeIcon: "/Icons/Before 2.svg",
    afterIcon: "/Icons/A2.svg",
  },
  {
    num: "03",
    title: "Reliable Performance",
    desc: "Laundry Machines that are designed for heavy-duty cycles with consistent performance.",
    beforeIcon: "/Icons/before 3.svg",
    afterIcon: "/Icons/A3.svg",
  },
  {
    num: "04",
    title: "Wide Range",
    desc: "Extensive range of washing, drying, ironing & dry-cleaning equipment under one roof.",
    beforeIcon: "/Icons/Before 4.png",
    afterIcon: "/Icons/After 4 .svg",
  },
  {
    num: "05",
    title: "After Sales Service",
    desc: "Quick Pan-India support from installation to preventive maintenance.",
    beforeIcon: "/Icons/BEFORE 5.svg",
    afterIcon: "/Icons/A5.svg",
  }
];

const WhyChooseUs = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;

    const smoothScrollTo = (element: HTMLElement, target: number, duration: number) => {
      const start = element.scrollLeft;
      const change = target - start;
      const startTime = performance.now();

      // Temporarily disable CSS scroll snapping so it doesn't fight our animation
      element.style.scrollSnapType = 'none';

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeInOutQuad for smooth acceleration and deceleration
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        element.scrollLeft = start + change * ease;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateScroll);
        } else {
          // Restore CSS scroll snapping once animation finishes
          element.style.scrollSnapType = '';
        }
      };

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    const interval = setInterval(() => {
      // Only auto-play on mobile/tablet screens (not XL desktop)
      if (window.innerWidth >= 1280 || isHoveredRef.current) return;
      
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        // If we reach the end of the scrollable area, loop back to start smoothly
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          smoothScrollTo(sliderRef.current, 0, 500);
        } else {
          // Scroll right by enough distance to snap to the next card (approx 200px)
          smoothScrollTo(sliderRef.current, scrollLeft + 200, 500);
        }
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="bg-[#f3f5f8] w-full pt-8 lg:pt-12 pb-8 lg:pb-12 relative border-t border-gray-100 flex items-center overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 xl:gap-8 items-center xl:items-stretch">
          
          {/* Left Title Area */}
          <div className="flex flex-col justify-center w-full xl:w-auto shrink-0 text-center xl:text-left pb-8 xl:pb-0">
            <div className="flex items-center justify-center xl:justify-start gap-2 mb-4">
              <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Our USP's</span>
            </div>
            <h2 className="font-extrabold mt-[2px] text-xl md:text-2xl lg:text-3xl leading-[1.15] text-[#0a2766] tracking-tight whitespace-nowrap">
              Decades of Expertise.<br/><span className="text-[#0a2766]">Built on Trust.</span>
            </h2>
            <div className="hidden sm:block w-16 h-1 bg-[#4777c9] mt-6 mx-auto xl:mx-0"></div>
          </div>

          {/* Right Cards Area */}
          <div 
            ref={sliderRef}
            className="w-full xl:flex-1 flex flex-nowrap justify-start gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onMouseEnter={() => isHoveredRef.current = true}
            onMouseLeave={() => isHoveredRef.current = false}
            onTouchStart={() => isHoveredRef.current = true}
            onTouchEnd={() => {
              // Add a slight delay before resuming autoplay after a touch
              setTimeout(() => {
                isHoveredRef.current = false;
              }, 1500);
            }}
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
              const frontLineColor = isOdd ? "bg-[#0a2766]" : "bg-white";
              const backLineColor = isOdd ? "bg-white" : "bg-[#0a2766]";
              
              const frontBorder = isOdd ? "bg-[#3b5b95]" : "bg-white";
              const backBorder = isOdd ? "bg-white" : "bg-[#3b5b95]";
              
              const solidBaseBg = isOdd ? "bg-white" : "bg-[#3b5b95]";
              
              // Spinning border removed as requested

              return (
                <div 
                  key={index} 
                  tabIndex={0}
                  className="group shrink-0 snap-start w-[140px] sm:w-[170px] lg:w-[190px] xl:w-[185px] 2xl:w-[200px] h-[220px] lg:h-[250px] cursor-pointer outline-none" 
                  onTouchStart={() => {}}
                >
                  <div className="relative w-full h-full shadow-sm hover:shadow-xl rounded-sm overflow-hidden">
                    
                    {/* Front Border Layer (Static, disappears on hover) */}
                    <div className={`absolute inset-0 ${frontBorder} transition-opacity duration-300 ease-out opacity-100 lg:group-hover:opacity-0 group-focus:opacity-0`}></div>
                    
                    {/* Back Border Layer (Static, appears on hover to provide contrast for the light) */}
                    <div className={`absolute inset-0 ${backBorder} transition-opacity duration-300 ease-out opacity-0 lg:group-hover:opacity-100 group-focus:opacity-100`}></div>
                    
                    {/* Solid Base to prevent light bleed during cross-fade */}
                    <div className={`absolute inset-[2px] rounded-sm ${solidBaseBg}`}></div>
                    
                    {/* Front Face */}
                    <div className={`absolute inset-[2px] flex flex-col items-center justify-start pt-8 lg:pt-12 text-center p-3 rounded-sm transition-opacity duration-300 ease-out ${frontClasses} opacity-100 lg:group-hover:opacity-0 group-focus:opacity-0`}>
                      <div className={`mb-6 flex items-end justify-center h-[56px] lg:h-[70px] ${frontIconColor}`}>
                        <img 
                          src={item.beforeIcon} 
                          alt="" 
                          className={`${item.title === "Wide Range" ? "max-h-[56px] lg:max-h-[70px]" : "max-h-[42px] lg:max-h-[50px]"} w-auto object-contain mx-auto`} 
                        />
                      </div>
                      <h3 className="font-bold text-[13px] lg:text-[15px] leading-snug px-0.5 lg:px-2 h-[36px] lg:h-[44px] flex items-start justify-center">
                        {item.title}
                      </h3>
                      <div className={`w-6 h-0.5 mt-2 ${frontLineColor}`}></div>
                    </div>

                    {/* Back Face */}
                    <div className={`absolute inset-[2px] flex flex-col items-center justify-start pt-6 lg:pt-10 text-center p-3 sm:p-4 rounded-sm transition-opacity duration-300 ease-out ${backClasses} opacity-0 lg:group-hover:opacity-100 group-focus:opacity-100`}>
                      <div className={`mb-5 flex items-end justify-center h-[46px] lg:h-[56px] opacity-90 ${backIconColor}`}>
                        <img 
                          src={item.afterIcon} 
                          alt="" 
                          className={`${item.title === "Wide Range" ? "max-h-[46px] lg:max-h-[56px]" : "max-h-[38px] lg:max-h-[46px]"} w-auto object-contain mx-auto`} 
                        />
                      </div>
                      <div className={`w-6 h-0.5 mb-4 ${backLineColor}`}></div>
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

const ProductsHoverGallery = () => {
  const [activePane, setActivePane] = useState<1 | 2 | 3>(1);

  const getImagePath = (paneNumber: 1 | 2 | 3) => {
    if (activePane === 1) {
      if (paneNumber === 1) return "/HOME SCROLLER/1(hover).svg";
      if (paneNumber === 2) return "/HOME SCROLLER/2(noH).svg";
      if (paneNumber === 3) return "/HOME SCROLLER/3rd(noh) 1st hover.svg";
    }
    if (activePane === 2) {
      if (paneNumber === 1) return "/HOME SCROLLER/1(noh).svg";
      if (paneNumber === 2) return "/HOME SCROLLER/2(Hover).svg";
      if (paneNumber === 3) return "/HOME SCROLLER/3rd(noh) 2nd hover.svg";
    }
    if (activePane === 3) {
      if (paneNumber === 1) return "/HOME SCROLLER/1(noh) 3rd hover.svg";
      if (paneNumber === 2) return "/HOME SCROLLER/2(noH) 3rd hover.svg";
      if (paneNumber === 3) return "/HOME SCROLLER/3rd(HOVER).svg";
    }
    return "";
  };

  return (
    <section className="bg-white w-full pt-10 lg:pt-16 pb-6 lg:pb-8 overflow-hidden">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col items-center justify-center text-center gap-2 lg:gap-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#32589c] font-bold text-lg lg:text-xl tracking-widest animate-pulse">{"//"}</span>
          <span className="text-gray-500 font-bold text-xs sm:text-[13px] lg:text-sm tracking-[0.2em] uppercase">ENGINEERING EXCELLENCE</span>
        </div>
        <h2 className="font-extrabold text-[26px] sm:text-[30px] lg:text-[36px] xl:text-[40px] leading-[1.15] text-[#0a2766] max-w-4xl tracking-tight">
          Complete Laundry Solutions <br className="hidden sm:block lg:hidden" /> Under One Roof
        </h2>
      </div>

      {/* Desktop Horizontal Accordion Layout */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-[400px] xl:h-[500px] lg:flex gap-[20px] xl:gap-[33px] hidden">
        {[1, 2, 3].map((pane) => {
          const isActive = activePane === pane;
          return (
            <div
              key={pane}
              onMouseEnter={() => setActivePane(pane as 1|2|3)}
              className={`relative h-full overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? 'flex-[2] lg:flex-[2.2]' : 'flex-[1]'
              }`}
            >
              <img 
                src={getImagePath(pane as 1|2|3)} 
                alt={`Product ${pane}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out" 
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Slider Layout (Visible only on screens < lg) */}
      <div className="lg:hidden w-full flex flex-col items-center">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            const scrollProgress = target.scrollLeft / (target.scrollWidth - target.clientWidth);
            const progressBar = document.getElementById('mobile-product-scroll-progress');
            if (progressBar) {
              progressBar.style.width = `${Math.min(100, Math.max(0, scrollProgress * 100))}%`;
            }
          }}
        >
          <div className="relative w-[85vw] max-w-[400px] h-[350px] sm:h-[400px] shrink-0 snap-center rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-transparent flex items-center justify-center">
             <img src="/HOME SCROLLER/1(hover).svg" alt="Product 1" className="w-full h-full object-cover" />
          </div>
          <div className="relative w-[85vw] max-w-[400px] h-[350px] sm:h-[400px] shrink-0 snap-center rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-transparent flex items-center justify-center">
             <img src="/HOME SCROLLER/2(Hover).svg" alt="Product 2" className="w-full h-full object-cover" />
          </div>
          <div className="relative w-[85vw] max-w-[400px] h-[350px] sm:h-[400px] shrink-0 snap-center rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-transparent flex items-center justify-center">
             <img src="/HOME SCROLLER/3rd(HOVER).svg" alt="Product 3" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-[150px] h-[3px] bg-gray-200 rounded-full mt-6 overflow-hidden">
          <div 
            id="mobile-product-scroll-progress"
            className="h-full bg-[#32589c] transition-all duration-150"
            style={{ width: '0%' }}
          />
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
          <span className="text-gray-500 font-bold text-xs sm:text-[13px] lg:text-sm tracking-[0.2em] uppercase">ENGINEERING EXCELLENCE</span>
        </div>
        <h2 className="font-extrabold text-[26px] sm:text-[30px] lg:text-[36px] xl:text-[40px] leading-[1.15] text-[#0a2766] max-w-4xl tracking-tight">
          Complete Laundry Solutions <br className="hidden sm:block lg:hidden" /> Under One Roof
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
      desc: "From bearings and valves to heating elements and stainless-steel 304 baskets, every component plays a critical role that modern laundries depend on.",
      icon: (
        <img src="/Icon home/premium-components.png" alt="Premium Components" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain" />
      )
    },
    {
      title: "Engineered as One System",
      desc: "With every carefully sourced component, the finished product becomes more than just a machine, it becomes a dependable partner.",
      icon: (
        <img src="/Icon home/engineered-as-one-system.png" alt="Engineered as One System" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain" />
      )
    },
    {
      title: "Precision Manufacturing",
      desc: "Through advanced manufacturing, we transform high-quality components into industrial laundry equipment built for continuous operation.",
      icon: (
        <img src="/Icon home/precision-manufacturing.png" alt="Precision Manufacturing" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain" />
      )
    },
    {
      title: "Rigorous Testing",
      desc: "Every machine undergoes rigorous testing to ensure dependable performance in demanding commercial and industrial laundries.",
      icon: (
        <img src="/Icon home/rigorous-testing.png" alt="Rigorous Testing" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain" />
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
              {/* Under Image (Interior/Parts) */}
              <img 
                src="/After.jpeg" 
                alt="Machine After"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              
              {/* Over Image (Exterior) */}
              <img 
                src="/Before.jpg" 
                alt="Machine Before"
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
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#111111] leading-[1.15] tracking-tight">
              Every Part. <span className="text-[#32589c]">One Purpose.</span>
            </h2>
            <div className="w-12 h-[4px] bg-[#32589c] mt-4 mb-3"></div>
            <p className="text-gray-600 text-[15px] lg:text-[16px] leading-relaxed max-w-2xl mb-8">
              Performance begins long before a machine reaches your facility. It begins with premium components, precision engineering and rigorous testing that power every XCEL system.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-5 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} tabIndex={0} className="group bg-white border border-gray-100 p-3 sm:p-4 lg:p-6 rounded-2xl shadow-[0_15px_40px_-10px_rgba(10,39,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(10,39,102,0.25)] hover:border-[#32589c]/20 hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer outline-none" onTouchStart={() => {}}>
                  <div className="flex flex-row items-center gap-2 sm:gap-3 xl:gap-4 mb-2 sm:mb-3 xl:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 shrink-0 bg-[#3b5b95] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1d438a] group-hover:shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-[#0a2766] text-[12px] sm:text-[14px] xl:text-[17px] leading-snug">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-[11px] sm:text-[12px] xl:text-[14px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Alert Banner */}
            <div tabIndex={0} className="bg-[#e9eff7] rounded-xl p-4 sm:p-5 flex items-center gap-4 mt-auto outline-none shadow-[0_15px_40px_-10px_rgba(10,39,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(10,39,102,0.25)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-11 h-11 shrink-0 bg-[#3b5b95] rounded-full flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-[#0a2766] text-[14px] sm:text-[15px] leading-snug">
                  Great performance doesn't begin at the finish line.
                </p>
                <p className="text-[#3b5b95] text-[15px] sm:text-[16px] font-bold leading-snug">
                  It starts with every component inside.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
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

      {/* Products Hover Gallery Section */}
      <ProductsHoverGallery />

      {/* CTA Banner Section */}
      <CTABanner />

      {/* Parts to Power Slider Section */}
      <PartsToPower />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
