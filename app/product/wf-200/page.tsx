"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Send, Download, Headset, Phone, Mail, ArrowRight, ArrowLeft, Settings, ShieldCheck, Factory, HelpCircle, Home, MessageCircle, PhoneCall, LifeBuoy, HeartHandshake } from 'lucide-react';

const FAQList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What washing machine capacity should I choose for my laundry business?",
      a: "The ideal capacity depends on your daily laundry volume and the size of your facility. For high-volume industrial processing, a 100 kg or 200 kg capacity ensures optimal throughput and operational efficiency."
    },
    {
      q: "What is the typical washing cycle time?",
      a: "Cycle times vary based on the specific program, fabric type, and selected chemical processes. With our advanced PCB programming, cycle times are optimized for maximum efficiency without compromising wash quality."
    },
    {
      q: "Are spare parts readily available?",
      a: "Yes. We maintain inventory for commonly required spare parts and consumables to minimise downtime and ensure prompt service support throughout the machine's lifecycle."
    },
    {
      q: "Is the machine suitable for hospital and hotel laundry applications requiring high-temperature washing?",
      a: "Absolutely. Our machines feature high-temperature processing capabilities and steam-heated operation, making them perfect for environments that require stringent hygiene standards like hospitals and hotels."
    },
    {
      q: "Can the machine be customised for garment processing applications such as enzyme wash or stone wash?",
      a: "Yes, the advanced PCB programming and imported VFD allow for extensive customization of wash cycles, drum speed, and water levels, making it highly suitable for enzyme, acid, bleach, and stone washing."
    }
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
          >
            <button 
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
            >
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <span className="text-[#0a2766] font-bold text-[16px] shrink-0">Q{index + 1}.</span>
                <span className="text-[#0a2766] font-bold text-[16px] pr-4 leading-tight">{faq.q}</span>
              </div>
              <div className="shrink-0 text-[#0a2766]">
                {isOpen ? <ChevronUp size={20} strokeWidth={2} /> : <ChevronDown size={20} strokeWidth={2} />}
              </div>
            </button>
            {isOpen && (
              <div className="px-4 sm:pl-[48px] sm:pr-[60px] pb-5 pt-1">
                <p className="text-[#363636] text-[16px] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>('features');
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleMobileAccordionClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const isOpening = mobileExpanded !== id;
    
    if (isOpening) {
      setMobileExpanded(id);
      
      // Smoothly scroll to the expanded section after the CSS transition completes
      const button = e.currentTarget;
      setTimeout(() => {
        const topOffset = button.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }, 310);
    } else {
      setMobileExpanded(null);
    }
  };


  const images = [
    '/we-30-photo.jpg.svg',
    '/we-30-infographic.jpg'
  ];

  const sections = [
    {
      id: 'features',
      title: 'Key Features',
      icon: Settings,
      subtext: 'Explore the features that make a difference',
      shortDesc: 'Explore powerful features and technical specifications',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">High-Capacity Production Range</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Available in 100 kg and 200kg capacities for high-volume processing environments where output, consistency, and operational efficiency are critical.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Auto Forward & Reverse Basket Rotation</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Fully programmable reversing action ensures uniform garment movement, improved chemical penetration and tangle-free processing across every batch.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Advanced Multi-Stage Programming</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Fully programmable wash cycles with multiple independent process stages, allowing precise control over temperature, water levels, basket speed, chemical dosing and cycle duration.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">SS 304 Chemical-Resistant Inner Drum & Door</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Constructed from premium-grade 304 stainless steel to withstand continuous exposure to enzymes, bleach, acids, dyes and textile processing chemicals.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Imported VFD (Variable Frequency Drive)</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Enables accurate drum speed control from gentle fabric handling to aggressive denim processing, delivering superior wash quality and process consistency.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Industrial-Grade CNC Fabricated Frame</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Precision CNC-cut welded frame construction delivers exceptional structural strength, vibration resistance and long operational life.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">High-Temperature Processing</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Steam-heated operation with digital temperature control for enzyme washing, bleaching, dyeing, garment treatment and specialized textile processing applications.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Automatic Water Inlet & Drain System</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">PLC-controlled water filling and draining enables uninterrupted production with minimal operator intervention.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Programmable Water Level Management</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">Low, medium and high water level options programmable per wash step for optimized liquor ratio and chemical efficiency.</p>
          </div>
          <div className="relative pl-6"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-[#32589c]"></div>
            <h4 className="text-[#0a2766] font-bold text-[16px] mb-1">Operator Safety Protection</h4>
            <p className="text-[#363636] text-[16px] leading-relaxed">The machine automatically stops basket rotation if the door is opened during operation, enhancing workplace safety and reducing operational risks.</p>
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
        <div className="p-2 text-[#363636] text-[16px] leading-relaxed">
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
        <div className="p-2 text-[#363636] text-[16px] leading-relaxed">
          Content for Industries Served will go here.
        </div>
      )
    },
    {
      id: 'faqs',
      title: 'FAQs',
      icon: HelpCircle,
      subtext: 'Answers to your most common questions about this machine',
      shortDesc: 'Get answers to common questions',
      content: <FAQList />
    }
  ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Breadcrumbs */}
        <div className="flex flex-row items-center gap-3 text-[13px] text-[#363636] mb-6 lg:mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <a href="/" className="text-[#363636] hover:text-[#0a2766] transition-colors flex items-center">
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10 lg:mb-12">
          
          {/* Left: Image Gallery */}
          <div className="w-full sm:w-[80%] md:w-[65%] lg:w-[45%] xl:w-[40%] mx-auto lg:mx-0 flex flex-col shrink-0">
            {/* Main Image */}
            <div 
              className="relative w-full aspect-square bg-[#f3f5f8] rounded-[32px] flex items-center justify-center mb-6 overflow-hidden"
            >
              <img 
                src={images[activeImage]} 
                alt="Washing Machine WF-200" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            
            {/* Thumbnails Row */}
            <div className="flex flex-row items-center justify-center w-full">
              <button onClick={prevImage} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors shrink-0">
                <ArrowLeft size={24} strokeWidth={1} />
              </button>

              <div className="flex flex-row justify-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-2 px-2 flex-1">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 sm:w-24 lg:w-[90px] aspect-square shrink-0 rounded-2xl overflow-hidden transition-all bg-[#f3f5f8] ${activeImage === idx ? 'opacity-100 ring-2 ring-offset-2 ring-[#0a2766]' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>

              <button onClick={nextImage} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors shrink-0">
                <ArrowRight size={24} strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:flex-1 flex flex-col justify-start lg:pb-4 lg:pl-4">
            
            <div className="inline-block bg-[#eaf0ff] text-[#0a2766] text-[11px] sm:text-[12px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit mb-4">
              Apparel Processing Machines
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-[#0a2766] tracking-tight leading-tight mb-6">
              WF-200 | Washing Machine
            </h1>
            
            <div className="text-[#363636] text-[15px] sm:text-[16px] leading-relaxed mb-8">
              <p>
                Xcel's heavy-duty front loading apparel washing machine features advanced PCB programming for enzyme, acid, bleach & stone wash. Built for garment export, apparel processing and denim units PAN India!
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 lg:pt-0">
              <button onClick={() => document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 bg-[#0a2766] text-white py-3 sm:py-3.5 px-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#071b4a] hover:-translate-y-1 hover:shadow-lg transition-all">
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
                onClick={(e) => handleMobileAccordionClick(e, section.id)} 
                className="flex flex-row items-center justify-between p-4 sm:p-5 text-left w-full transition-colors bg-[#f4f7fb]"
              >
                <div className="flex flex-row items-center gap-4">
                  <div className="w-[2px] h-[40px] shrink-0 bg-[#0a2766]"></div>
                  <div className="flex flex-col gap-0.5 pr-2">
                    <span className="font-semibold text-[16px] sm:text-[17px] text-[#0a2766]">{section.title}</span>
                    <span className="text-[13px] leading-snug text-[#363636]">{section.subtext}</span>
                  </div>
                </div>
                <ChevronDown size={22} strokeWidth={1.5} className={`shrink-0 ml-2 text-[#0a2766] transition-transform duration-300 ${mobileExpanded === section.id ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === section.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 bg-white'}`}>
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
                        ? 'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-[16px] after:bg-[#0a2766]' 
                        : ''
                    }`}
                  >
                  {section.title}
                  {activeSection === section.id && (
                    <>
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
                    <h3 className="text-[#0a2766] font-semibold text-[16px] sm:text-[20px] lg:text-[22px] leading-[1.3] mb-8 relative z-10">
                      {section.subtext}
                    </h3>
                    <div className="w-16 h-[4px] bg-[#0a2766] rounded-full relative z-10"></div>
                    
                    {/* Decorative Wave Pattern at bottom */}
                    <div className="relative w-full h-24 mt-6 opacity-[0.10] pointer-events-none -mb-4 overflow-visible">
                      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="w-full h-full fill-none stroke-[#0a2766] stroke-[2px]">
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
        <div className="bg-[#0a2766] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
          <div className="flex flex-row items-start gap-4 sm:gap-6 w-full lg:w-auto text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#e8effa] rounded-full flex items-center justify-center text-[#0a2766]">
              <Headset size={28} strokeWidth={2} />
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
          
          <div className="flex flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-6 w-full lg:w-auto mt-4 sm:mt-2 lg:mt-0">
            <a href="tel:+919971025730" className="flex items-center gap-1.5 sm:gap-3 text-white font-bold text-[13px] xs:text-[14px] sm:text-[18px] hover:text-blue-200 transition-colors flex-1 sm:flex-none justify-center whitespace-nowrap">
              <Phone className="w-4 h-4 sm:w-6 sm:h-6" />
              +91 99710 25730
            </a>
            
            <div className="w-px h-6 sm:h-8 bg-white/20 shrink-0"></div>
            
            <a href="https://wa.me/919971025730?text=Hi%2C%20I%20am%20looking%20to%20buy%20a%20Laundry%20Machine.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none bg-white text-[#0a2766] py-2.5 sm:py-3.5 px-2 xs:px-4 sm:px-8 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-3 hover:bg-gray-100 hover:shadow-lg transition-all text-[13px] xs:text-[14px] sm:text-[16px] whitespace-nowrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-[22px] sm:h-[22px]">
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
              </svg>
              Get In Touch
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
