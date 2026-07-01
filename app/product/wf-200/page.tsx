"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Send, Download, Headset, Phone, Mail, ArrowRight, Settings, ShieldCheck, Factory, HelpCircle, Home } from 'lucide-react';

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>('features');

  const images = [
    '/Before.svg',
    '/After.jpeg',
    '/Before.svg',
    '/After.jpeg'
  ];

  const sections = [
    {
      id: 'features',
      title: 'Key Features',
      icon: Settings,
      subtext: 'Explore the features engineered to maximize productivity',
      content: (
        <div className="flex flex-col gap-6">
          <div className="border-l-4 border-[#0a2766] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">High-Capacity Production Range</h4>
            <p className="text-gray-600 text-[14px]">Available in 100 kg and 200kg capacities for high-volume processing environments where output, consistency, and operational efficiency are critical.</p>
          </div>
          <div className="border-l-4 border-transparent pl-4 hover:border-[#0a2766]/30 transition-colors">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Advanced Multi-Stage Programming</h4>
            <p className="text-gray-600 text-[14px]">Fully programmable wash cycles with multiple independent process stages, allowing precise control over temperature, water levels, basket speed, chemical dosing and cycle duration.</p>
          </div>
          <div className="border-l-4 border-transparent pl-4 hover:border-[#0a2766]/30 transition-colors">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Imported VFD (Variable Frequency Drive)</h4>
            <p className="text-gray-600 text-[14px]">Enables accurate drum speed control from gentle fabric handling to aggressive denim processing, delivering superior wash quality and process consistency.</p>
          </div>
          <div className="border-l-4 border-transparent pl-4 hover:border-[#0a2766]/30 transition-colors">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">High-Temperature Processing</h4>
            <p className="text-gray-600 text-[14px]">Steam-heated operation with digital temperature control for enzyme washing, bleaching, dyeing, garment treatment and specialized textile processing applications.</p>
          </div>
          <div className="border-l-4 border-[#0a2766] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Programmable Water Level Management</h4>
            <p className="text-gray-600 text-[14px]">Low, medium and high water level options programmable per wash step for optimized liquor ratio and chemical efficiency.</p>
          </div>
          <div className="border-l-4 border-[#0a2766] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Auto Forward & Reverse Basket Rotation</h4>
            <p className="text-gray-600 text-[14px]">Fully programmable reversing action ensures uniform garment movement, improved chemical penetration and tangle-free processing across every batch.</p>
          </div>
        </div>
      )
    },
    {
      id: 'why-us',
      title: 'Why Choose Us',
      icon: ShieldCheck,
      subtext: 'Discover the advantages that set XCEL apart',
      content: (
        <div className="p-4 text-gray-600 text-sm">
          Built with quality, engineered for performance. We prioritize durability and continuous innovation.
        </div>
      )
    },
    {
      id: 'industries',
      title: 'Industries Served',
      icon: Factory,
      subtext: 'Tailored laundry solutions for every industry we serve',
      content: (
        <div className="flex flex-col gap-4">
           <div className="border-l-4 border-transparent pl-4 hover:border-[#0a2766]/30 transition-colors">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Auto Forward & Reverse Basket Rotation</h4>
            <p className="text-gray-600 text-[14px]">Fully programmable reversing action ensures uniform garment movement, improved chemical penetration and tangle-free processing across every batch.</p>
          </div>
          <div className="border-l-4 border-transparent pl-4 hover:border-[#0a2766]/30 transition-colors">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">SS 304 Chemical-Resistant Inner Drum & Door</h4>
            <p className="text-gray-600 text-[14px]">Constructed from premium-grade 304 stainless steel to withstand continuous exposure to enzymes, bleach, acids, dyes and textile processing chemicals.</p>
          </div>
        </div>
      )
    },
    {
      id: 'faqs',
      title: 'FAQs',
      icon: HelpCircle,
      subtext: 'Find quick answers to common product questions',
      content: (
        <div className="p-4 text-gray-600 text-sm">
          Frequently asked questions will be listed here.
        </div>
      )
    }
  ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Breadcrumbs */}
        <div className="flex flex-row items-center gap-3 text-[13px] text-gray-500 mb-6 lg:mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <a href="/" className="text-gray-500 hover:text-[#0a2766] transition-colors flex items-center">
             <Home size={14} strokeWidth={1.5} />
          </a>
          <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
          <a href="/" className="hover:text-[#0a2766] transition-colors">Home</a>
          <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
          <span className="hover:text-[#0a2766] transition-colors cursor-pointer">Products</span>
          <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
          <span className="hover:text-[#0a2766] transition-colors cursor-pointer">Apparel Processing Machines</span>
          <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
          <span className="text-[#0a2766] font-semibold">Washing Machine WF-200</span>
        </div>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 lg:mb-20 bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-sm border border-gray-100">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden group border border-gray-100 shadow-sm flex items-center justify-center">
              <img src={images[activeImage]} alt="Washing Machine WF-200" className="w-[85%] h-[85%] object-contain" />
              
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0a2766] shadow-md hover:bg-[#0a2766] hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0a2766] shadow-md hover:bg-[#0a2766] hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 sm:w-24 aspect-square shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-center bg-white ${activeImage === idx ? 'border-[#0a2766] shadow-md' : 'border-gray-100 hover:border-[#0a2766]/50 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="absolute inset-0 w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start">
            <div className="inline-block bg-[#eef2f9] text-[#32589c] text-[11px] sm:text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider w-fit mb-4">
              Apparel Processing Machines
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2766] tracking-tight leading-tight mb-2">
              Washing Machine WF-200
            </h1>
            
            <div className="w-12 h-[4px] bg-[#32589c] rounded-full mb-6 mt-2"></div>
            
            <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed mb-8">
              Xcel's heavy-duty front loading apparel washing machine features advanced PCB programming for enzyme, acid, bleach & stone wash. Built for garment export, apparel processing and denim units PAN India!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button className="flex-1 bg-[#0a2766] text-white py-3.5 sm:py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#071b4a] hover:-translate-y-1 hover:shadow-lg transition-all">
                <Send size={18} />
                Request a Quote
              </button>
              <button className="flex-1 bg-white text-[#0a2766] border-2 border-[#0a2766] py-3.5 sm:py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f8f9fa] hover:-translate-y-1 hover:shadow-md transition-all">
                <Download size={18} />
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="mb-12 lg:mb-20">
          
          {/* Accordion View (Always visible on all screen sizes) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${activeSection === section.id ? 'border-[#0a2766] shadow-lg' : 'border-gray-100 shadow-sm'}`}
              >
                {/* Header Row */}
                <button 
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className={`w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors ${activeSection === section.id ? 'bg-[#0a2766] text-white' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`font-bold text-[16px] sm:text-[18px] ${activeSection === section.id ? 'text-white' : 'text-[#0a2766]'}`}>
                      {section.title}
                    </span>
                    {/* On mobile, show subtext. On desktop active, we show subtext in left panel instead */}
                    {activeSection !== section.id && (
                      <span className="text-[13px] text-gray-500 lg:hidden mt-0.5">{section.subtext}</span>
                    )}
                  </div>
                  {activeSection === section.id ? (
                    <ChevronUp size={24} className="text-white shrink-0 ml-4" />
                  ) : (
                    <ChevronDown size={24} className="text-[#0a2766] shrink-0 ml-4" />
                  )}
                </button>

                {/* Content Area */}
                {activeSection === section.id && (
                  <div className="flex flex-col lg:flex-row border-t border-gray-100">
                    {/* Desktop Left Sidebar (Hidden on mobile) */}
                    <div className="hidden lg:flex w-[35%] bg-[#f8f9fa] p-8 flex-col justify-center border-r border-gray-100">
                      <h3 className="text-3xl font-bold text-[#0a2766] leading-tight pr-4">
                        {section.subtext}
                      </h3>
                      <div className="w-10 h-1 bg-[#32589c] mt-6"></div>
                    </div>
                    
                    {/* Right Content / Mobile Content */}
                    <div className="w-full lg:w-[65%] p-5 sm:p-8 bg-white">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#0a2766] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
              <Headset size={28} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-[18px] sm:text-[20px] lg:text-[22px] mb-1">
                Need help choosing the right machine?
              </h3>
              <p className="text-blue-100 text-[14px] sm:text-[15px]">
                Our experts are here to help you find the perfect solution.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto mt-2 md:mt-0">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-white font-bold text-[16px] sm:text-[18px] hover:text-blue-200 transition-colors w-full sm:w-auto justify-center">
              <Phone size={20} className="text-blue-300" />
              +91 98765 43210
            </a>
            
            <div className="hidden sm:block w-px h-8 bg-white/20"></div>
            
            <button className="w-full sm:w-auto bg-white text-[#0a2766] py-3.5 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 hover:shadow-lg transition-all">
              <Mail size={18} />
              Get In Touch
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
