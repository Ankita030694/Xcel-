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
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
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
            </Link>
            
            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center space-x-9 mt-1">
              <Link href="/" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                HOME
              </Link>
              <Link href="/about" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                ABOUT US
              </Link>
              <div className="relative group flex items-center cursor-pointer pb-1 border-b-[1.5px] border-transparent hover:border-[#3b5b95] transition-all">
                <span className="text-[#3b5b95] font-semibold text-[14px]">PRODUCTS</span>
                <svg className="w-[14px] h-[14px] ml-1 text-[#3b5b95]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <Link href="/insights" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                INDUSTRY INSIGHTS
              </Link>
              <a href="#" className="text-[#3b5b95] font-semibold text-[14px] hover:border-b-[1.5px] hover:border-[#3b5b95] pb-1 border-b-[1.5px] border-transparent transition-all">
                CONTACT US
              </a>
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
                <div className={`absolute w-7 h-[2.5px] bg-current transition-all duration-700 ease-in-out rounded-full ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-[10px]'}`}></div>
                <span className={`absolute text-[11px] font-bold tracking-widest leading-none transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>MENU</span>
                <div className={`absolute w-7 h-[2.5px] bg-current transition-all duration-700 ease-in-out rounded-full ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-[10px]'}`}></div>
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
        <nav className="flex flex-col py-6 px-6 space-y-6">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            HOME
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            ABOUT US
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center cursor-pointer">
              <span className="text-[#3b5b95] font-semibold text-[15px]">PRODUCTS</span>
              <svg className="w-4 h-4 ml-1 text-[#3b5b95]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <Link href="/insights" onClick={() => setIsMobileMenuOpen(false)} className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            INDUSTRY INSIGHTS
          </Link>
          <a href="#" className="text-[#3b5b95] font-semibold text-[15px] hover:text-[#2f497a] transition-colors">
            CONTACT US
          </a>
          
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
