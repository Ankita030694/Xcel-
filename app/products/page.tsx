"use client";
import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const categories = [
  {
    id: 'washing',
    title: 'Washing',
    icon: '/New Icons/1.png',
    products: [
      { name: 'Washer Extractors', image: '/prod.final/Washing 1.png', link: '#' },
      { name: 'Front Loading Washing Machines', image: '/prod.png/Washing Front 60 kg Left View 1.png', link: '#' },
      { name: 'Washer Extractors (Model 2)', image: '/prod.final/Washing 1.png', link: '#' },
      { name: 'Front Loading (Model 2)', image: '/prod.png/Washing Front 60 kg Left View 1.png', link: '#' },
      { name: 'Washer Extractors (Model 3)', image: '/prod.final/Washing 1.png', link: '#' }
    ]
  },
  {
    id: 'drying',
    title: 'Drying',
    icon: '/New Icons/2.png',
    products: [
      { name: 'Drying Tumblers', image: '/prod.final/Drying 1.png', link: '#' },
      { name: 'Drying Tumblers (Pro)', image: '/prod.final/Drying 1.png', link: '#' },
      { name: 'Drying Tumblers (Max)', image: '/prod.final/Drying 1.png', link: '#' },
      { name: 'Drying Tumblers (Eco)', image: '/prod.final/Drying 1.png', link: '#' },
      { name: 'Drying Tumblers (Ultra)', image: '/prod.final/Drying 1.png', link: '#' }
    ]
  },
  {
    id: 'apparel-processing',
    title: 'Apparel Processing',
    icon: '/New Icons/3.png',
    products: [
      { name: 'Apparel Washing Machines', image: '/prod.final/Apparel Washing 1.png', link: '#' },
      { name: 'Apparel Washing (Pro)', image: '/prod.final/Apparel Washing 1.png', link: '#' },
      { name: 'Apparel Washing (Max)', image: '/prod.final/Apparel Washing 1.png', link: '#' },
      { name: 'Apparel Washing (Eco)', image: '/prod.final/Apparel Washing 1.png', link: '#' },
      { name: 'Apparel Washing (Ultra)', image: '/prod.final/Apparel Washing 1.png', link: '#' }
    ]
  },
  {
    id: 'dry-cleaning',
    title: 'Dry-Cleaning',
    icon: '/New Icons/4.png',
    products: [
      { name: 'Perc Dry Cleaning Machines', image: '/prod.final/Dry-Cleaning 1.png', link: '#' },
      { name: 'Perc Dry Cleaning (Pro)', image: '/prod.final/Dry-Cleaning 1.png', link: '#' },
      { name: 'Perc Dry Cleaning (Max)', image: '/prod.final/Dry-Cleaning 1.png', link: '#' },
      { name: 'Perc Dry Cleaning (Eco)', image: '/prod.final/Dry-Cleaning 1.png', link: '#' },
      { name: 'Perc Dry Cleaning (Ultra)', image: '/prod.final/Dry-Cleaning 1.png', link: '#' }
    ]
  },
  {
    id: 'flat-work',
    title: 'Flat-Work',
    icon: '/New Icons/5.png',
    products: [
      { name: 'Flat Work Ironers', image: '/prod.final/Flat-Work 1.png', link: '#' },
      { name: 'Flat Work Ironers (Pro)', image: '/prod.final/Flat-Work 1.png', link: '#' },
      { name: 'Flat Work Ironers (Max)', image: '/prod.final/Flat-Work 1.png', link: '#' },
      { name: 'Flat Work Ironers (Eco)', image: '/prod.final/Flat-Work 1.png', link: '#' },
      { name: 'Flat Work Ironers (Ultra)', image: '/prod.final/Flat-Work 1.png', link: '#' }
    ]
  },
  {
    id: 'steam-finishing',
    title: 'Steam-Finishing',
    icon: '/New Icons/6.png',
    products: [
      { name: 'Steam Finishing Equipment', image: '/prod.final/Steam-Finishing 1.png', link: '#' },
      { name: 'Steam Finishing (Pro)', image: '/prod.final/Steam-Finishing 1.png', link: '#' },
      { name: 'Steam Finishing (Max)', image: '/prod.final/Steam-Finishing 1.png', link: '#' },
      { name: 'Steam Finishing (Eco)', image: '/prod.final/Steam-Finishing 1.png', link: '#' },
      { name: 'Steam Finishing (Ultra)', image: '/prod.final/Steam-Finishing 1.png', link: '#' }
    ]
  },
  {
    id: 'water-heater',
    title: 'Water Heater',
    icon: '/New Icons/7.png',
    products: [
      { name: 'Industrial Water Heaters', image: '/prod.final/Water Heater 1.png', link: '#' },
      { name: 'Industrial Water Heaters (Pro)', image: '/prod.final/Water Heater 1.png', link: '#' },
      { name: 'Industrial Water Heaters (Max)', image: '/prod.final/Water Heater 1.png', link: '#' },
      { name: 'Industrial Water Heaters (Eco)', image: '/prod.final/Water Heater 1.png', link: '#' },
      { name: 'Industrial Water Heaters (Ultra)', image: '/prod.final/Water Heater 1.png', link: '#' }
    ]
  },
  {
    id: 'fabric-checking',
    title: 'Fabric Checking',
    icon: '/New Icons/8.png',
    products: [
      { name: 'Fabric Checking Machines', image: '/prod.final/Fabric Checking 1.png', link: '#' },
      { name: 'Fabric Checking (Pro)', image: '/prod.final/Fabric Checking 1.png', link: '#' },
      { name: 'Fabric Checking (Max)', image: '/prod.final/Fabric Checking 1.png', link: '#' },
      { name: 'Fabric Checking (Eco)', image: '/prod.final/Fabric Checking 1.png', link: '#' },
      { name: 'Fabric Checking (Ultra)', image: '/prod.final/Fabric Checking 1.png', link: '#' }
    ]
  },
  {
    id: 'other-equipment',
    title: 'Other Equipment',
    icon: '/New Icons/9.png',
    products: [
      { name: 'Ancillary Equipment', image: '/prod.final/Other Equipment 1.png', link: '#' },
      { name: 'Ancillary Equipment (Pro)', image: '/prod.final/Other Equipment 1.png', link: '#' },
      { name: 'Ancillary Equipment (Max)', image: '/prod.final/Other Equipment 1.png', link: '#' },
      { name: 'Ancillary Equipment (Eco)', image: '/prod.final/Other Equipment 1.png', link: '#' },
      { name: 'Ancillary Equipment (Ultra)', image: '/prod.final/Other Equipment 1.png', link: '#' }
    ]
  },
  {
    id: 'complete-range',
    title: 'Complete Range',
    icon: '/New Icons/10.png',
    products: [
      { name: 'Complete Laundry Setup', image: '/prod.final/Complete Range 1.png', link: '#' },
      { name: 'Complete Laundry Setup (Pro)', image: '/prod.final/Complete Range 1.png', link: '#' },
      { name: 'Complete Laundry Setup (Max)', image: '/prod.final/Complete Range 1.png', link: '#' },
      { name: 'Complete Laundry Setup (Eco)', image: '/prod.final/Complete Range 1.png', link: '#' },
      { name: 'Complete Laundry Setup (Ultra)', image: '/prod.final/Complete Range 1.png', link: '#' }
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      {/* Hero Banner Section */}
      <section className="w-full bg-[#f3f5f8]">
         <img 
           src="/Product overview new.svg" 
           alt="Product Overview - From Washing To Finishing" 
           className="w-full h-auto object-contain block"
         />
      </section>

      {/* Products Content */}
      <section className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-20 flex flex-col gap-10 lg:gap-16">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-4 lg:gap-8 w-full">
            
            {/* Category Header */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f3f6fa] flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                <img src={category.icon} alt={category.title} className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-80" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#0a2766] tracking-tight">
                  {category.title}
                </h2>
                <div className="w-10 sm:w-14 h-[2px] bg-[#32589c] rounded-full"></div>
              </div>
            </div>

            {/* Product Cards Scroller */}
            <div className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-10 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {category.products.map((product, idx) => {
                return (
                  <div key={idx} className="flex-shrink-0 w-[160px] sm:w-[280px] lg:w-[300px] snap-start relative group flex flex-col bg-white rounded-md border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-300">
                    
                    {/* Top Content (Title & Line) */}
                    <div className="pt-4 px-4 sm:pt-6 sm:px-6 z-10 relative">
                      <div className="w-4 sm:w-6 h-[2px] bg-[#32589c] mb-2 sm:mb-3"></div>
                      <h3 className="text-[12px] sm:text-[18px] font-bold text-[#0a2766] leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Image Area */}
                    <div className="relative w-full h-[160px] sm:h-[320px] mt-2 z-10">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Bottom Gradient Background (sits behind image and covers bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#e6effc] to-white/0 pointer-events-none z-0"></div>

                    {/* View Details Link */}
                    <div className="pb-4 px-3 sm:pb-6 sm:px-6 mt-auto z-10 relative">
                      <Link href={product.link} className="inline-flex items-center gap-1 sm:gap-2 text-[#0a2766] font-bold text-[11px] sm:text-[14px] group-hover:text-[#32589c] transition-colors">
                        View Details
                        <svg className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
