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
      {
        name: 'Washer Extractors',
        image: '/prod.final/Washing 1.png',
        link: '#'
      },
      {
        name: 'Front Loading Washing Machines',
        image: '/prod.png/Washing Front 60 kg Left View 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'drying',
    title: 'Drying',
    icon: '/New Icons/2.png',
    products: [
      {
        name: 'Drying Tumblers',
        image: '/prod.final/Drying 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'apparel-processing',
    title: 'Apparel Processing',
    icon: '/New Icons/3.png',
    products: [
      {
        name: 'Apparel Washing Machines',
        image: '/prod.final/Apparel Washing 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'dry-cleaning',
    title: 'Dry-Cleaning',
    icon: '/New Icons/4.png',
    products: [
      {
        name: 'Perc Dry Cleaning Machines',
        image: '/prod.final/Dry-Cleaning 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'flat-work',
    title: 'Flat-Work',
    icon: '/New Icons/5.png',
    products: [
      {
        name: 'Flat Work Ironers',
        image: '/prod.final/Flat-Work 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'steam-finishing',
    title: 'Steam-Finishing',
    icon: '/New Icons/6.png',
    products: [
      {
        name: 'Steam Finishing Equipment',
        image: '/prod.final/Steam-Finishing 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'water-heater',
    title: 'Water Heater',
    icon: '/New Icons/7.png',
    products: [
      {
        name: 'Industrial Water Heaters',
        image: '/prod.final/Water Heater 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'fabric-checking',
    title: 'Fabric Checking',
    icon: '/New Icons/8.png',
    products: [
      {
        name: 'Fabric Checking Machines',
        image: '/prod.final/Fabric Checking 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'other-equipment',
    title: 'Other Equipment',
    icon: '/New Icons/9.png',
    products: [
      {
        name: 'Ancillary Equipment',
        image: '/prod.final/Other Equipment 1.png',
        link: '#'
      }
    ]
  },
  {
    id: 'complete-range',
    title: 'Complete Range',
    icon: '/New Icons/10.png',
    products: [
      {
        name: 'Complete Laundry Setup',
        image: '/prod.final/Complete Range 1.png',
        link: '#'
      }
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      {/* Hero Banner Section */}
      <section className="w-full relative bg-[#0a2766] pt-[72px] lg:pt-[88px]">
        {/* We assume the user will upload 'product overview.png' to the public folder */}
        <div className="w-full aspect-[21/9] sm:aspect-[3/1] lg:aspect-[4/1] relative bg-[#f3f5f8] overflow-hidden">
           <img 
             src="/product overview.png" 
             alt="Product Overview - From Washing To Finishing" 
             className="w-full h-full object-cover"
             onError={(e) => {
               // Fallback if image is not uploaded yet
               (e.target as HTMLImageElement).style.display = 'none';
             }}
           />
           {/* Fallback text if image fails to load */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <span className="text-gray-400 font-medium">Please upload &apos;product overview.png&apos; to the public folder</span>
           </div>
        </div>
      </section>

      {/* Products Content */}
      <section className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col gap-16 lg:gap-24">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-8 lg:gap-12 w-full">
            
            {/* Category Header */}
            <div className="flex items-center gap-6">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[#f0f4fa] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                <img src={category.icon} alt={category.title} className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] lg:w-[65px] lg:h-[65px] object-contain" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#0a2766] tracking-tight">
                  {category.title}
                </h2>
                <div className="w-12 sm:w-16 h-[3px] bg-[#32589c] rounded-full"></div>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {category.products.map((product, idx) => {
                // The prompt says "the first image of the product should have gradient effect"
                // It seems they want the gradient on the first card, or maybe all cards. 
                // The screenshot shows gradient on both cards. We will apply it to all for consistency.
                return (
                  <div key={idx} className="relative group flex flex-col bg-white rounded-[24px] border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    
                    {/* Top Content (Title & Line) */}
                    <div className="pt-8 px-8 z-10 relative">
                      <div className="w-8 h-[2px] bg-[#32589c] mb-4"></div>
                      <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0a2766] leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Image Area */}
                    <div className="relative w-full h-[300px] sm:h-[350px] mt-4 z-10">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Bottom Gradient Background (sits behind image and covers bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#e6effc] to-white/0 pointer-events-none z-0"></div>

                    {/* View Details Link */}
                    <div className="pb-8 px-8 mt-auto z-10 relative">
                      <Link href={product.link} className="inline-flex items-center gap-2 text-[#0a2766] font-bold text-[15px] group-hover:text-[#32589c] transition-colors">
                        View Details
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
