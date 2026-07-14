"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const categories = [
  {
    id: 'washing',
    title: 'Washing',
    icon: '/New Icons/1.png',
    products: [
      { name: 'Washer Extractors', image: '/prod.final/Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Front Loading Washing Machines', image: '/prod.png/Washing Front 60 kg Left View 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Washer Extractors (Model 2)', image: '/prod.final/Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Front Loading (Model 2)', image: '/prod.png/Washing Front 60 kg Left View 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Washer Extractors (Model 3)', image: '/prod.final/Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'drying',
    title: 'Drying',
    icon: '/New Icons/2.png',
    products: [
      { name: 'Drying Tumblers', image: '/prod.final/Drying 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Drying Tumblers (Pro)', image: '/prod.final/Drying 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Drying Tumblers (Max)', image: '/prod.final/Drying 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Drying Tumblers (Eco)', image: '/prod.final/Drying 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Drying Tumblers (Ultra)', image: '/prod.final/Drying 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'apparel-processing',
    title: 'Apparel Processing',
    icon: '/New Icons/3.png',
    products: [
      { name: 'Apparel Washing Machines', image: '/prod.final/Apparel Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Apparel Washing (Pro)', image: '/prod.final/Apparel Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Apparel Washing (Max)', image: '/prod.final/Apparel Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Apparel Washing (Eco)', image: '/prod.final/Apparel Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Apparel Washing (Ultra)', image: '/prod.final/Apparel Washing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'dry-cleaning',
    title: 'Dry-Cleaning',
    icon: '/New Icons/4.png',
    products: [
      { name: 'Perc Dry Cleaning Machines', image: '/prod.final/Dry-Cleaning 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Perc Dry Cleaning (Pro)', image: '/prod.final/Dry-Cleaning 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Perc Dry Cleaning (Max)', image: '/prod.final/Dry-Cleaning 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Perc Dry Cleaning (Eco)', image: '/prod.final/Dry-Cleaning 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Perc Dry Cleaning (Ultra)', image: '/prod.final/Dry-Cleaning 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'flat-work',
    title: 'Flat-Work',
    icon: '/New Icons/5.png',
    products: [
      { name: 'Flat Work Ironers', image: '/prod.final/Flat-Work 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Flat Work Ironers (Pro)', image: '/prod.final/Flat-Work 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Flat Work Ironers (Max)', image: '/prod.final/Flat-Work 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Flat Work Ironers (Eco)', image: '/prod.final/Flat-Work 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Flat Work Ironers (Ultra)', image: '/prod.final/Flat-Work 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'steam-finishing',
    title: 'Steam-Finishing',
    icon: '/New Icons/6.png',
    products: [
      { name: 'Steam Finishing Equipment', image: '/prod.final/Steam-Finishing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Steam Finishing (Pro)', image: '/prod.final/Steam-Finishing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Steam Finishing (Max)', image: '/prod.final/Steam-Finishing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Steam Finishing (Eco)', image: '/prod.final/Steam-Finishing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Steam Finishing (Ultra)', image: '/prod.final/Steam-Finishing 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'water-heater',
    title: 'Water Heater',
    icon: '/New Icons/7.png',
    products: [
      { name: 'Industrial Water Heaters', image: '/prod.final/Water Heater 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Industrial Water Heaters (Pro)', image: '/prod.final/Water Heater 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Industrial Water Heaters (Max)', image: '/prod.final/Water Heater 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Industrial Water Heaters (Eco)', image: '/prod.final/Water Heater 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Industrial Water Heaters (Ultra)', image: '/prod.final/Water Heater 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'fabric-checking',
    title: 'Fabric Checking',
    icon: '/New Icons/8.png',
    products: [
      { name: 'Fabric Checking Machines', image: '/prod.final/Fabric Checking 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Fabric Checking (Pro)', image: '/prod.final/Fabric Checking 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Fabric Checking (Max)', image: '/prod.final/Fabric Checking 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Fabric Checking (Eco)', image: '/prod.final/Fabric Checking 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Fabric Checking (Ultra)', image: '/prod.final/Fabric Checking 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'other-equipment',
    title: 'Other Equipment',
    icon: '/New Icons/9.png',
    products: [
      { name: 'Ancillary Equipment', image: '/prod.final/Other Equipment 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Ancillary Equipment (Pro)', image: '/prod.final/Other Equipment 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Ancillary Equipment (Max)', image: '/prod.final/Other Equipment 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Ancillary Equipment (Eco)', image: '/prod.final/Other Equipment 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Ancillary Equipment (Ultra)', image: '/prod.final/Other Equipment 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  },
  {
    id: 'complete-range',
    title: 'Complete Range',
    icon: '/New Icons/10.png',
    products: [
      { name: 'Complete Laundry Setup', image: '/prod.final/Complete Range 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Complete Laundry Setup (Pro)', image: '/prod.final/Complete Range 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Complete Laundry Setup (Max)', image: '/prod.final/Complete Range 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Complete Laundry Setup (Eco)', image: '/prod.final/Complete Range 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' },
      { name: 'Complete Laundry Setup (Ultra)', image: '/prod.final/Complete Range 1.png', link: '/product/wf-200', description: 'Built for heavy loads. Engineered for excellence.' }
    ]
  }
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('washing');
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        // @ts-ignore
        if (categories.some(c => c.id === id)) {
          setActiveTab(id);
          const element = document.getElementById('products-section');
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
          }
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset scroll and dot index when category changes
  useEffect(() => {
    setActiveDotIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    // On mobile, card is about 90vw + gap. 
    // We can just use the container's width as an approximation or calculate based on children.
    // For snap scrolling, each item is centered or start. We can find which element is closest to the left edge.
    const itemWidth = container.scrollWidth / activeCategory.products.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeDotIndex && newIndex >= 0 && newIndex < activeCategory.products.length) {
      setActiveDotIndex(newIndex);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />



      {/* Products Content */}
      <section id="products-section" className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-16 lg:pb-24 flex flex-col items-center scroll-mt-[100px]">
        
        {/* Header Texts */}
        <div className="flex flex-col items-center text-center mb-10 w-full">
          <h4 className="flex items-center justify-center gap-2 text-[#3b5b95] font-bold text-[11px] md:text-[10px] lg:text-sm tracking-[0.2em] uppercase mb-4">
            <span className="animate-pulse">{"//"}</span> OUR PRODUCT CATEGORIES
          </h4>
          <h2 className="text-[13px] sm:text-[21px] lg:text-[27px] font-bold text-[#0a2766] font-serif mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Complete Solutions for Every Laundry Need
          </h2>
          <div className="w-16 h-[2px] bg-[#3b5b95]"></div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full mb-8 lg:mb-12">
          <div className="flex flex-wrap justify-center items-center gap-y-1 sm:gap-y-2 lg:border-b lg:border-gray-200 px-0 sm:px-2">
            {categories.map((cat, index) => {
              const isActive = activeTab === cat.id;
              return (
                <div key={cat.id} className="flex items-center">
                  <button
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-1 sm:px-2 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-4 text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold uppercase tracking-normal lg:tracking-wider transition-all ${
                      isActive 
                        ? 'text-[#0a2766] border-b-[2px] lg:border-b-[2.5px] border-[#3b5b95] lg:border-[#0a2766]' 
                        : 'text-[#363636] border-b-[2px] lg:border-b-[2.5px] border-transparent hover:text-gray-800'
                    }`}
                  >
                    {cat.title}
                  </button>
                  {/* Vertical separator on mobile */}
                  {index !== categories.length - 1 && (
                    <div className="h-3 w-[1px] bg-gray-300 mx-[2px] sm:mx-1 lg:hidden"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Header (Mobile specific styling, but visible on all) */}
        <div className="w-full flex justify-start items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 lg:h-6 bg-[#3b5b95]"></div>
            <h2 className="text-[#0a2766] font-bold text-[16px] lg:text-[22px] uppercase tracking-wide">
              {activeCategory.title}
            </h2>
          </div>
        </div>

        {/* Product Carousel (Mobile) / Grid (Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full pb-8">
          {activeCategory.products.map((product, idx) => (
            <Link href={product.link} key={idx} className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-row lg:flex-col group cursor-pointer h-[160px] sm:h-[180px] lg:h-full">
              
              {/* Product Image */}
              <div className="w-[45%] lg:w-full h-full lg:h-[260px] bg-[#f8f9fa] lg:bg-white p-3 lg:p-6 relative flex items-center justify-center flex-shrink-0 lg:border-b lg:border-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply lg:mix-blend-normal" 
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 p-4 lg:p-6 text-left">
                <h3 className="text-[12px] lg:text-[15px] font-extrabold text-[#0a2766] uppercase mb-1.5 lg:mb-3 leading-snug">
                  {product.name}
                </h3>
                <p className="text-[10px] lg:text-[13px] text-[#363636] leading-relaxed flex-1 line-clamp-3 lg:line-clamp-none">
                  {/* @ts-ignore */}
                  {product.description || 'Built for heavy loads. Engineered for excellence.'}
                </p>
                
                {/* Arrow Button */}
                <div className="w-full flex justify-end mt-2 lg:mt-5">
                  <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full border border-[#3b5b95] flex items-center justify-center text-[#3b5b95] group-hover:bg-[#3b5b95] group-hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>


      </section>

      <Footer />
    </div>
  );
}
