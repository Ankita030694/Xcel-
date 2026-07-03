"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Send, Download, Headset, Phone, Mail, ArrowRight, Settings, ShieldCheck, Factory, HelpCircle, Home } from 'lucide-react';

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>('features');
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const images = [
    '/we-30-photo.jpg.svg',
    '/we-30-infographic.jpg'
  ];

  const sections = [
    {
      id: 'features',
      title: 'Key Features',
      icon: Settings,
      subtext: 'Explore the features engineered to maximize productivity',
      shortDesc: 'Explore powerful features and technical specifications',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">High-Capacity Production Range</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Available in 100 kg and 200kg capacities for high-volume processing environments where output, consistency, and operational efficiency are critical.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Auto Forward & Reverse Basket Rotation</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Fully programmable reversing action ensures uniform garment movement, improved chemical penetration and tangle-free processing across every batch.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Advanced Multi-Stage Programming</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Fully programmable wash cycles with multiple independent process stages, allowing precise control over temperature, water levels, basket speed, chemical dosing and cycle duration.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">SS 304 Chemical-Resistant Inner Drum & Door</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Constructed from premium-grade 304 stainless steel to withstand continuous exposure to enzymes, bleach, acids, dyes and textile processing chemicals.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Imported VFD (Variable Frequency Drive)</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Enables accurate drum speed control from gentle fabric handling to aggressive denim processing, delivering superior wash quality and process consistency.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Industrial-Grade CNC Fabricated Frame</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Precision CNC-cut welded frame construction delivers exceptional structural strength, vibration resistance and long operational life.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">High-Temperature Processing</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Steam-heated operation with digital temperature control for enzyme washing, bleaching, dyeing, garment treatment and specialized textile processing applications.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Automatic Water Inlet & Drain System</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">PLC-controlled water filling and draining enables uninterrupted production with minimal operator intervention.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Programmable Water Level Management</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">Low, medium and high water level options programmable per wash step for optimized liquor ratio and chemical efficiency.</p>
          </div>
          <div className="border-l-[3px] border-[#32589c] pl-4">
            <h4 className="text-[#0a2766] font-bold text-[15px] sm:text-[16px] mb-1">Operator Safety Protection</h4>
            <p className="text-gray-600 text-[14px] leading-relaxed">The machine automatically stops basket rotation if the door is opened during operation, enhancing workplace safety and reducing operational risks.</p>
          </div>
        </div>
      )
    },
    {
      id: 'why-us',
      title: 'Why Choose Us',
      icon: ShieldCheck,
      subtext: 'Discover the advantages that set XCEL apart',
      shortDesc: 'Built with quality, engineered for performance',
      content: (
        <div className="p-2 text-gray-600 text-sm">
          Built with quality, engineered for performance. We prioritize durability and continuous innovation.
        </div>
      )
    },
    {
      id: 'industries',
      title: 'Industries Served',
      icon: Factory,
      subtext: 'Tailored laundry solutions for every industry we serve',
      shortDesc: 'Solutions trusted across diverse industries',
      content: (
        <div className="p-2 text-gray-600 text-sm">
          Content for Industries Served will go here.
        </div>
      )
    },
    {
      id: 'faqs',
      title: 'FAQs',
      icon: HelpCircle,
      subtext: 'Find quick answers to common product questions',
      shortDesc: 'Get answers to common questions',
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10 lg:mb-12">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[50%] flex flex-col bg-[#f8f9fc] border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8">
            <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[380px] flex items-center justify-center mb-6 lg:mb-8">
              <img src={images[activeImage]} alt="Washing Machine WF-200" className="w-full h-full object-contain mix-blend-multiply" />
              
              <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0a2766] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-all z-10">
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0a2766] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-all z-10">
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex flex-row justify-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 sm:w-20 lg:w-24 aspect-[4/3] shrink-0 rounded-lg overflow-hidden transition-all bg-white ${activeImage === idx ? 'border-2 border-[#0a2766] shadow-sm' : 'border border-gray-200 hover:border-gray-300 opacity-90 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="absolute inset-0 w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-[50%] flex flex-col justify-start lg:pb-4">
            <div className="inline-block bg-[#eaf0ff] text-[#0a2766] text-[11px] sm:text-[12px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit mb-4">
              Apparel Processing Machines
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2766] tracking-tight leading-tight mb-4">
              Washing Machine WF-200
            </h1>
            
            <div className="w-16 h-[4px] bg-[#0a2766] rounded-full mb-6 mt-1"></div>
            
            <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed mb-8">
              Xcel's heavy-duty front loading apparel washing machine features advanced PCB programming for enzyme, acid, bleach & stone wash. Built for garment export, apparel processing and denim units PAN India!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 lg:pt-0">
              <button className="flex-1 bg-[#0a2766] text-white py-3 sm:py-3.5 px-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#071b4a] hover:-translate-y-1 hover:shadow-lg transition-all">
                <Send size={18} />
                Request a Quote
              </button>
              <button className="flex-1 bg-white text-[#0a2766] border-2 border-[#0a2766] py-3 sm:py-3.5 px-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#f8f9fa] hover:-translate-y-1 hover:shadow-md transition-all">
                <Download size={18} />
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Features Accordion Section (Mobile) */}
        <div className="flex lg:hidden flex-col mb-12 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {sections.map(section => (
            <div key={section.id} className="flex flex-col bg-white">
              <button 
                onClick={() => setMobileExpanded(mobileExpanded === section.id ? null : section.id)} 
                className="flex flex-row items-center justify-between p-4 sm:p-5 text-left w-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-row items-center gap-4">
                  <div className="w-[2px] h-[40px] bg-[#0a2766] shrink-0"></div>
                  <div className="flex flex-col gap-0.5 pr-2">
                    <span className="text-[#0a2766] font-semibold text-[15px] sm:text-[16px]">{section.title}</span>
                    <span className="text-gray-500 text-[13px] leading-snug">{section.shortDesc}</span>
                  </div>
                </div>
                <ChevronDown size={22} strokeWidth={1.5} className={`text-[#0a2766] shrink-0 ml-2 transition-transform duration-300 ${mobileExpanded === section.id ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === section.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 sm:p-5 pt-0 mt-0">
                  <div className="pt-4 border-t border-gray-100">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Tabs Section (Desktop) */}
        <div className="hidden lg:flex mb-12 lg:mb-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex-col">
            {/* Tabs Header */}
            <div className="flex flex-row w-full mb-0 relative z-20 [&>button:first-child]:rounded-tl-2xl [&>button:last-child]:rounded-tr-2xl">
              {sections.map((section, index) => {
                const isNextActive = index < sections.length - 1 && sections[index + 1].id === activeSection;
                const showSeparator = index < sections.length - 1 && activeSection !== section.id && !isNextActive;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-4 sm:py-5 text-sm sm:text-base font-bold transition-all ${
                      activeSection === section.id 
                        ? 'text-white bg-[#0a2766]' 
                        : 'text-[#0a2766] bg-white hover:bg-gray-50'
                    } ${
                      showSeparator 
                        ? 'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[14px] after:bg-[#0a2766]/20' 
                        : ''
                    }`}
                  >
                  {section.title}
                  {activeSection === section.id && (
                    <>
                      <ChevronUp size={20} className="text-white" />
                      <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a2766] rotate-45"></div>
                    </>
                  )}
                </button>
                );
              })}
            </div>
             {/* Content Area */}
            <div className="relative w-full">
              {sections.map((section) => (
                <div 
                  key={section.id}
                  className={activeSection === section.id ? 'block' : 'hidden'}
                >
                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pt-0 pr-6 sm:pr-10 lg:pr-12 pb-6 sm:pb-10 lg:pb-0 pl-0">
                    {/* Left: Subtext Box */}
                    <div className="w-full lg:w-[35%] flex flex-col items-start shrink-0 bg-[#f8f9fc] rounded-br-[24px] rounded-tr-[24px] lg:rounded-bl-2xl p-8 sm:p-10 relative overflow-hidden shadow-sm">
                    <h3 className="text-[#0a2766] font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.3] mb-8 relative z-10">
                      {section.subtext}
                    </h3>
                    <div className="w-16 h-[4px] bg-[#0a2766] rounded-full relative z-10"></div>
                    
                    {/* Decorative Wave Pattern at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 opacity-[0.03] pointer-events-none">
                      <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full fill-none stroke-[#0a2766] stroke-[2px]">
                        <path d="M 0 150 Q 250 300 500 150 T 1000 150" />
                        <path d="M 0 170 Q 250 320 500 170 T 1000 170" />
                        <path d="M 0 190 Q 250 340 500 190 T 1000 190" />
                        <path d="M 0 210 Q 250 360 500 210 T 1000 210" />
                        <path d="M 0 230 Q 250 380 500 230 T 1000 230" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Right: Actual Content */}
                  <div className="w-full lg:w-[65%] pt-6 sm:pt-8 lg:pt-12 lg:pb-12">
                    {section.content}
                  </div>
                </div>
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
