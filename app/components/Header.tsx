"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
  );
};
