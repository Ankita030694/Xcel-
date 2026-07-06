"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';

const TOP_BAR_PHRASES = [
  "Complete Laundry Solutions For Every Industry.",
  "Pan-India Installation and Service Network.",
  "Trusted Manufacturer Of Laundry Equipment.",
  "Proudly Made in India Laundry Machines Since 1994."
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % TOP_BAR_PHRASES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full relative z-40">
      {/* Top Bar Ticker */}
      <div className="bg-[#3b5b95] text-white py-2 text-[13px] font-medium tracking-wide overflow-hidden relative flex h-[34px] w-full">
        {TOP_BAR_PHRASES.map((phrase, idx) => (
          <div 
            key={idx} 
            className="absolute inset-0 flex items-center justify-center text-center px-4 transition-transform duration-700 ease-in-out w-full"
            style={{ 
              transform: `translateX(${(idx - phraseIndex) * 100}%)` 
            }}
          >
            {phrase}
          </div>
        ))}
      </div>
      
      {/* Main Navbar */}
      <div className="bg-[#f8f9fa] w-full border-b border-gray-100 relative z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-[90px]">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center focus:outline-none">
              <img src="/Xcel%20logo%20image%202.svg" alt="XCEL Logo" className="h-[38px] md:h-[46px] w-auto object-contain" />
            </Link>
            
            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center space-x-9 mt-1">
              <Link href="/" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                HOME
              </Link>
              <Link href="/about" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                ABOUT US
              </Link>
              <div className="group flex flex-col justify-center h-[90px]">
                <Link href="/products" className="relative flex items-center cursor-pointer pb-1 border-b-[1.5px] border-transparent group-hover:border-[#3b5b95] transition-all">
                  <span className="text-[#3b5b95] font-semibold text-[14px]">PRODUCTS</span>
                  <svg className="w-[14px] h-[14px] ml-1 text-[#3b5b95] group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                {/* Full-width Sub-nav Dropdown */}
                <div className="absolute top-[90px] left-0 w-full bg-[#3b5b95] hidden group-hover:flex items-center justify-center py-3.5 shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 border-t border-[#3b5b95]">
                  <div className="flex flex-row items-center justify-center gap-x-4 xl:gap-x-7 gap-y-2 text-white font-semibold text-[11px] xl:text-[12px] tracking-wider uppercase max-w-[1400px] px-4 w-full flex-wrap">
                    <Link href="/products#washing" className="hover:text-blue-300 transition-colors">WASHING</Link>
                    <Link href="/products#drying" className="hover:text-blue-300 transition-colors">DRYING</Link>
                    <Link href="/products#apparel-processing" className="hover:text-blue-300 transition-colors">APPAREL PROCESSING</Link>
                    <Link href="/products#dry-cleaning" className="hover:text-blue-300 transition-colors">DRY-CLEANING</Link>
                    <Link href="/products#flat-work" className="hover:text-blue-300 transition-colors">FLAT-WORK</Link>
                    <Link href="/products#steam-finishing" className="hover:text-blue-300 transition-colors">STEAM-FINISHING</Link>
                    <Link href="/products#water-heater" className="hover:text-blue-300 transition-colors">WATER HEATER</Link>
                    <Link href="/products#fabric-checking" className="hover:text-blue-300 transition-colors">FABRIC CHECKING</Link>
                    <Link href="/products#other-equipment" className="hover:text-blue-300 transition-colors">OTHER EQUIPMENT</Link>
                    <Link href="/products#complete-range" className="hover:text-blue-300 transition-colors">COMPLETE RANGE</Link>
                  </div>
                </div>
              </div>
              <Link href="/insights" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                INDUSTRY INSIGHTS
              </Link>
              <Link href="/contact" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                CONTACT US
              </Link>
            </nav>
            
            {/* Download Button - Desktop */}
            <div className="hidden lg:flex items-center">
              <button className="bg-gradient-to-b from-white to-gray-50 text-[#0a2766] font-bold text-[14px] lg:text-[15px] tracking-wider px-5 py-2.5 lg:px-6 lg:py-2.5 rounded-[12px] border border-gray-100 shadow-[0_5px_0_#cbd5e1,0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_0_#94a3b8,0_15px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:shadow-[0_0px_0_#cbd5e1,0_0px_0_rgba(0,0,0,0.2)] active:translate-y-[5px] transition-all duration-200 flex items-center justify-center">
                Download Brochure
                <Download className="w-4 h-4 ml-2" strokeWidth={2.5} />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center relative z-[60]">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#3b5b95] hover:text-[#2f497a] focus:outline-none w-10 h-10 transition-colors flex flex-col items-center justify-center relative"
                aria-label="Toggle menu"
              >
                <div className={`absolute w-[34px] h-[2.5px] bg-current transition-all duration-700 ease-in-out rounded-full ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-[10px]'}`}></div>
                <span className={`absolute text-[11px] font-bold tracking-widest leading-none transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>MENU</span>
                <div className={`absolute w-[34px] h-[2.5px] bg-current transition-all duration-700 ease-in-out rounded-full ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-[10px]'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-full left-0 w-full bg-white z-30 transition-all duration-700 ease-in-out overflow-hidden border-b border-gray-100 shadow-xl lg:hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-transparent shadow-none'
        }`}
      >
        <nav className="flex flex-col items-center py-6 px-6 space-y-6 text-center">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            HOME
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            ABOUT US
          </Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center">
            <div className="flex items-center justify-center cursor-pointer">
              <span className="text-[#3b5b95] font-semibold text-[15px]">PRODUCTS</span>
              <svg className="w-4 h-4 ml-1 text-[#3b5b95]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/insights" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            INDUSTRY INSIGHTS
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            CONTACT US
          </Link>
          
          <div className="pt-6 mt-4 border-t border-gray-100 flex lg:hidden">
            <button className="bg-gradient-to-b from-white to-gray-50 text-[#0a2766] font-bold text-[14px] tracking-wider px-5 py-3 rounded-[12px] border border-gray-100 shadow-[0_5px_0_#cbd5e1,0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_0_#94a3b8,0_15px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:shadow-[0_0px_0_#cbd5e1,0_0px_0_rgba(0,0,0,0.2)] active:translate-y-[5px] transition-all duration-200 flex items-center justify-center w-full">
              Download Brochure
              <Download className="w-4 h-4 ml-2" strokeWidth={2.5} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
