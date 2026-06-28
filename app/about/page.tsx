"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { MissionVisionSection } from '../components/MissionVisionSection';

export default function AboutPage() {
  const [activeLegacy, setActiveLegacy] = useState<'founder' | 'son'>('founder');

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* About Us Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/About-hero.png" 
            alt="XCEL Headquarters" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Our Story Section - Stylish Multi-Column */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Title */}
          <div className="flex flex-col items-center mb-10 lg:mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
              <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Our Story</span>
            </div>
            <h2 className="font-extrabold mt-[2px] text-2xl md:text-3xl lg:text-4xl leading-[1.15] text-[#0a2766] tracking-tight text-center">
              A legacy of precision.
            </h2>
            <div className="w-16 h-1 bg-[#4777c9] mt-6 mx-auto"></div>
          </div>

          {/* Stylish 2-Column Layout */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 relative group cursor-default">
            
            {/* Background Quote Icon for Style - Animated */}
            <div className="absolute top-0 left-0 -ml-4 -mt-10 text-[160px] leading-none font-serif text-[#f4f6f9] pointer-events-none select-none z-0 transform transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-105 group-hover:text-[#e8ecf3]">
              "
            </div>

            {/* Column 1 */}
            <div className="w-full md:w-1/2 md:pr-10 lg:pr-16 space-y-6 relative z-10 text-[15px] sm:text-[16px] leading-[1.8] font-medium text-gray-600 transition-colors duration-500 hover:text-gray-900 group/col">
              <p className="text-[#0a2766] font-semibold text-lg sm:text-xl leading-[1.6] transform transition-transform duration-500 group-hover/col:translate-x-2">
                Our journey began with a single conviction that Indian businesses deserve world-class laundry equipment, engineered and manufactured right here at home. 
              </p>
              <p className="transform transition-transform duration-500 delay-75 group-hover/col:translate-x-1">
                That conviction laid the foundation stone of XCEL. Built under the <strong className="text-[#0a2766] font-bold group-hover/col:text-[#32589c] transition-colors duration-300">Make in India</strong> initiative at our 20,000 sq ft manufacturing unit, every machine that leaves our facility carries the precision of domestic engineering, tested to meet international quality and performance benchmarks.
              </p>
            </div>
            
            {/* Vertical Divider - Animated */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-300 group-hover:via-[#32589c] to-transparent relative z-10 transition-colors duration-700"></div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 md:pl-10 lg:pl-16 space-y-6 relative z-10 text-[15px] sm:text-[16px] leading-[1.8] font-medium text-gray-600 transition-colors duration-500 hover:text-gray-900 group/col2">
              <p className="transform transition-transform duration-500 group-hover/col2:translate-x-2">
                We do not simply assemble components, we design, fabricate and produce complete laundry solutions from the ground up.
              </p>
              <p className="transform transition-transform duration-500 delay-75 group-hover/col2:translate-x-1">
                From large hotel chains and NABH-accredited hospitals to garment manufacturing units, high-volume commercial laundries and retail laundries, our machines power the clean operations that keep India's most critical industries running every single day. Our machines are industry-configured, technically optimised systems, designed with the specific operational realities of each sector firmly in mind.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Legacy Section - Interactive Tabbed Layout */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-10 bg-[#f8f9fa] border-t border-gray-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Header & Toggle */}
          <div className="text-center mb-16">
             <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a2766] tracking-tight mb-8">
                Two Generations. <br className="sm:hidden" />
                <span className="text-[#32589c] font-serif italic font-light">One Vision.</span>
             </h2>
             
             {/* Elegant Toggle Switch */}
             <div className="inline-flex bg-white p-1.5 rounded-full relative shadow-sm border border-gray-100 mx-auto">
               <div 
                 className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#0a2766] rounded-full shadow-md transition-all duration-500 ease-in-out z-0 ${activeLegacy === 'founder' ? 'left-1.5' : 'left-[calc(50%+4px)]'}`}
               ></div>
               
               <button 
                 onClick={() => setActiveLegacy('founder')}
                 className={`relative z-10 px-8 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${activeLegacy === 'founder' ? 'text-white' : 'text-gray-500 hover:text-[#0a2766]'}`}
               >
                 Deepak Chawla
               </button>
               <button 
                 onClick={() => setActiveLegacy('son')}
                 className={`relative z-10 px-8 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${activeLegacy === 'son' ? 'text-white' : 'text-gray-500 hover:text-[#0a2766]'}`}
               >
                 Mehul Chawla
               </button>
             </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[500px] lg:min-h-[400px]">
             
             {/* Generation 1: Father */}
             <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeLegacy === 'founder' ? 'opacity-100 translate-y-0 pointer-events-auto relative' : 'opacity-0 translate-y-8 pointer-events-none absolute'}`}>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
                   
                   {/* Image */}
                   <div className="w-full lg:w-[45%]">
                      <div className="aspect-[4/3] lg:aspect-square bg-[#e0e4eb] relative overflow-hidden rounded-2xl shadow-inner">
                         {/* <img src="/father-portrait.jpg" alt="Deepak Chawla" className="absolute inset-0 w-full h-full object-cover" /> */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-[#3b5b95]/40 pointer-events-none">
                           <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <span className="font-semibold text-sm">Image Placeholder (Deepak Chawla)</span>
                         </div>
                      </div>
                   </div>
                   
                   {/* Text */}
                   <div className="w-full lg:w-[55%]">
                      <h3 className="text-3xl font-serif text-[#0a2766] mb-2 flex items-center gap-4">
                         <span className="italic">Founders Note</span>
                         <span className="w-12 h-px bg-[#32589c] opacity-50"></span>
                      </h3>
                      <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">Generation 01</p>
                      
                      <div className="space-y-5 text-[15px] leading-[1.8] text-gray-600 font-light">
                         <p>When we started this journey, our goal was simple: to build machines that Indian businesses could genuinely rely on. Not imported equipment with long lead times, but homegrown industrial washing machines built with precision and a deep understanding of what our customers truly need.</p>
                         <p className="pl-4 border-l-2 border-[#32589c]">Our commitment remains unchanged: to manufacture machines that work harder, last longer, and deliver more value. <strong className="text-[#0a2766] font-medium">Because when your operation runs without interruption, we know we have done our job right.</strong></p>
                      </div>
                      
                      <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                         <div>
                            <p className="text-2xl font-serif text-[#32589c] italic leading-none mb-1.5">Deepak Chawla</p>
                            <p className="text-[10.5px] font-bold tracking-widest text-[#0a2766] uppercase">Managing Director</p>
                         </div>
                      </div>
                   </div>

                </div>
             </div>

             {/* Generation 2: Son */}
             <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeLegacy === 'son' ? 'opacity-100 translate-y-0 pointer-events-auto relative' : 'opacity-0 -translate-y-8 pointer-events-none absolute'}`}>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
                   
                   {/* Image */}
                   <div className="w-full lg:w-[45%]">
                      <div className="aspect-[4/3] lg:aspect-square bg-[#e0e4eb] relative overflow-hidden rounded-2xl shadow-inner">
                         {/* <img src="/son-portrait.jpg" alt="Mehul Chawla" className="absolute inset-0 w-full h-full object-cover" /> */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-[#3b5b95]/40 pointer-events-none">
                           <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <span className="font-semibold text-sm">Image Placeholder (Mehul Chawla)</span>
                         </div>
                      </div>
                   </div>
                   
                   {/* Text */}
                   <div className="w-full lg:w-[55%]">
                      <h3 className="text-3xl font-serif text-[#0a2766] mb-2 flex items-center gap-4">
                         <span className="italic">Rooted in Legacy</span>
                         <span className="w-12 h-px bg-[#32589c] opacity-50"></span>
                      </h3>
                      <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">Generation 02</p>
                      
                      <div className="space-y-5 text-[15px] leading-[1.8] text-gray-600 font-light">
                         <p>My father built this company from the ground up, with limited resources but an unlimited commitment to the people who chose us. He taught me early on that <span className="italic font-medium text-[#0a2766]">“the machine is just the beginning; the relationship is the real product.”</span></p>
                         <p>As a second-generation entrant, my decision was simple: to honour everything that got us here and build everything that will take us forward. <strong className="text-[#0a2766] font-medium">This is a business built on trust, and we intend to keep earning it.</strong></p>
                      </div>
                      
                      <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                         <div>
                            <p className="text-2xl font-serif text-[#32589c] italic leading-none mb-1.5">Mehul Chawla</p>
                            <p className="text-[10.5px] font-bold tracking-widest text-[#0a2766] uppercase">Executive Director</p>
                         </div>
                      </div>
                   </div>

                 </div>
             </div>

          </div>
        </div>
      </section>

      <DraggableTimeline />
      <MissionVisionSection />
    </main>
  );
}

const timelineEvents = [
  { year: "1994", text: "Founded with a vision to redefine Laundry industry machinery through uncompromising quality and precision manufacturing.", position: "bottom" },
  { year: "1998", text: "Expansion into Garment Industry by being a trusted laundry and drying equipment manufacturer and supplier. Opened an office in Tiruppur, Tamil Nadu.", position: "top" },
  { year: "2002", text: "We expanded our manufacturing infrastructure by developing a 20,000 sq. ft. plant in Faridabad to support scaling operations.", position: "bottom" },
  { year: "2008", text: "Successfully completed 100 PERC dry cleaning machine installations across India, significantly expanding our national customer footprint.", position: "top" },
  { year: "2014", text: "Celebrating 20 years of excellence, we reached a milestone of 3,500 customers across India and successfully launched our international export operations for laundry machinery.", position: "bottom" },
  { year: "2019", text: "Pioneered the launch of India's first integrated 3-in-1 laundry solution, seamlessly combining washing, extraction, and drying within a single high-efficiency unit.", position: "top" },
  { year: "2025", text: "Celebrating three decades of excellence, we surpassed a milestone of 7,500 customers PAN India and reached over 700 PERC dry cleaning machine installations nationwide.", position: "bottom" }
];
// Duplicate for seamless looping
const duplicatedEvents = [...timelineEvents, ...timelineEvents, ...timelineEvents];

function DraggableTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered && !isDragging) {
        scrollRef.current.scrollLeft += 1;
        
        // Endless loop logic
        const totalWidth = scrollRef.current.scrollWidth;
        const segmentWidth = totalWidth / 3;
        
        if (scrollRef.current.scrollLeft >= segmentWidth * 2) {
          scrollRef.current.scrollLeft = segmentWidth;
        } else if (scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollLeft = segmentWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Start in the middle segment
  useEffect(() => {
     if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
     }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#32589c] tracking-tight mb-4 transition-transform duration-500 hover:scale-105">
              The Evolution of Laundry Excellence
            </h2>
            <div className="flex items-center justify-center gap-1.5 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32589c]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#32589c]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#32589c]"></span>
              <span className="w-16 h-[2px] rounded-full bg-[#32589c] ml-1"></span>
            </div>
          </div>
        </div>

        <div 
          className="w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing select-none"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
        >
          <div className="flex w-max relative py-12">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-[#1e448a] transform -translate-y-1/2 shadow-[0_0_15px_rgba(30,68,138,0.3)] pointer-events-none"></div>
            
            {duplicatedEvents.map((event, index) => (
               <div key={index} className="w-[320px] lg:w-[400px] flex-shrink-0 group relative px-6 h-[400px] flex flex-col justify-center">
                  
                  {/* Dot */}
                  <div className="absolute top-1/2 left-6 w-[20px] h-[20px] bg-white border-[4px] border-[#32589c] rounded-full transform -translate-y-1/2 z-20 group-hover:scale-[1.6] group-hover:bg-[#32589c] transition-all duration-300 shadow-md"></div>
                  
                  {event.position === 'bottom' ? (
                    <>
                       {/* Top empty space to center the line */}
                       <div className="h-[150px] w-full relative flex items-end pb-4">
                          {/* Year Above */}
                          <span className="text-[40px] lg:text-[46px] font-black text-black tracking-tight group-hover:text-[#32589c] group-hover:-translate-y-2 transition-all duration-300">
                            {event.year}
                          </span>
                       </div>
                       {/* Line space */}
                       <div className="h-0 w-full relative">
                          <div className="absolute top-0 left-[8px] w-[1.5px] h-[100px] bg-[#cbd5e1] group-hover:bg-[#32589c] group-hover:h-[120px] z-10 transition-all duration-300"></div>
                       </div>
                       {/* Bottom text */}
                       <div className="h-[150px] w-full pt-[120px] pl-[20px]">
                          <p className="text-[13.5px] leading-[1.7] text-gray-500 font-medium group-hover:text-gray-800 opacity-80 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 w-[260px]">
                            {event.text}
                          </p>
                       </div>
                    </>
                  ) : (
                    <>
                       {/* Top text */}
                       <div className="h-[150px] w-full relative flex items-start flex-col justify-end pb-[120px] pl-[20px]">
                          <p className="text-[13.5px] leading-[1.7] text-gray-500 font-medium group-hover:text-gray-800 opacity-80 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 w-[260px]">
                            {event.text}
                          </p>
                       </div>
                       {/* Line space */}
                       <div className="h-0 w-full relative">
                          <div className="absolute bottom-0 left-[8px] w-[1.5px] h-[100px] bg-[#cbd5e1] group-hover:bg-[#32589c] group-hover:h-[120px] z-10 transition-all duration-300"></div>
                       </div>
                       {/* Bottom Year */}
                       <div className="h-[150px] w-full pt-4">
                          <span className="text-[40px] lg:text-[46px] font-black text-black tracking-tight group-hover:text-[#32589c] group-hover:translate-y-2 transition-all duration-300">
                            {event.year}
                          </span>
                       </div>
                    </>
                  )}
               </div>
            ))}
          </div>
        </div>
    </section>
  )
}
