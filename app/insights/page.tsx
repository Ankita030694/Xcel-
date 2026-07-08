"use client";
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const placeholderFeatured = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop";
const placeholderSquare = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-12 md:py-16 xl:py-24 pt-[100px] lg:pt-[120px]">
        
        {/* Page Header */}
        <div className="flex flex-col mb-16 lg:mb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#3b5b95] font-semibold text-lg lg:text-xl tracking-wide">
              <span className="animate-pulse">{"//"}</span>
              <span>Insights & Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-[#0a2766] tracking-tight leading-[1.1] mt-4">
              Latest Insights from XCEL
            </h1>
          </div>
          
          {/* Filters / Tabs */}
          <div className="flex flex-wrap gap-6 lg:gap-10 border-t border-gray-200 pt-6">
            {['Industry News', 'Case Studies', 'Laundry Tips', 'Product Updates'].map((filter, index) => (
              <button 
                key={index}
                className={`text-[16px] lg:text-[18px] font-semibold pb-2 border-b-2 transition-all ${
                  index === 0 
                    ? "text-[#0a2766] border-[#0a2766]" 
                    : "text-[#363636] border-transparent hover:text-[#0a2766] hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-24 lg:mb-32">
          {/* Image */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md group cursor-pointer relative aspect-square lg:aspect-auto lg:h-[600px]">
            <img 
              src={placeholderFeatured} 
              alt="Featured Article" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="font-bold text-[14px] lg:text-[16px] tracking-[2px] mb-6 text-[#3b5b95] uppercase">
              FEATURED ARTICLE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.2] text-[#0a2766] mb-6 hover:text-[#3b5b95] transition-colors cursor-pointer">
              Choosing the Right Industrial Washing Machine for Your Business
            </h2>
            <p className="text-[#363636] text-[18px] lg:text-[22px] leading-relaxed mb-10 max-w-2xl">
              From hotels and hospitals to garment units and laundromats, selecting the right laundry equipment can improve productivity, reduce operating costs, and ensure consistent performance for years to come.
            </p>
            
            <button className="flex items-center gap-2 text-[#0a2766] font-bold text-[18px] hover:text-[#3b5b95] transition-colors self-start mb-12 group">
              Read More
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <div className="w-full h-[1px] bg-gray-200 mb-8"></div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[#0a2766] font-bold text-[18px]">By XCEL Engineering Team</span>
              <span className="text-[#363636] text-[16px]">Apr 12, 2026 • 5 min read</span>
            </div>
          </div>
        </div>

        {/* Other Articles Section */}
        <div>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-[#0a2766] mb-12">Other Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {/* We will map over 6 items as requested */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col group cursor-pointer">
                <div className="w-full aspect-[16/9] lg:h-[280px] rounded-2xl overflow-hidden mb-6 relative shadow-sm">
                  <img 
                    src={placeholderSquare} 
                    alt="Article thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                
                <p className="font-bold text-[12px] tracking-[1.5px] mb-4 text-[#3b5b95] uppercase">
                  STORIES
                </p>
                <h3 className="text-[22px] lg:text-[26px] font-bold leading-[1.3] text-[#0a2766] mb-4 group-hover:text-[#3b5b95] transition-colors">
                  The Future of Digital Experiences in a Fast-Moving World
                </h3>
                <p className="text-[#363636] text-[16px] leading-relaxed mb-6">
                  Discover how modern businesses are leveraging technology, design, and data-driven strategies to build seamless user experiences that drive engagement and long-term growth across platforms.
                </p>
                
                <button className="flex items-center gap-2 text-[#0a2766] font-bold text-[16px] group-hover:text-[#3b5b95] transition-colors mt-auto w-fit">
                  Read More
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
