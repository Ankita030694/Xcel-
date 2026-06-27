"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="w-full py-16 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[#32589c] font-bold text-xl md:text-2xl tracking-widest animate-pulse">{"//"}</span>
            <span className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Manufacturing Excellence</span>
          </div>
          <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-[#0a2766] tracking-tight">
            See the Difference
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Drag the slider to explore our advanced manufacturing facilities and engineering precision.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative w-full max-w-[1000px] mx-auto aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden select-none shadow-2xl group cursor-ew-resize"
          onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
          onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        >
          {/* Background Image (After) */}
          <div className="absolute inset-0 w-full h-full">
            <img src="/After.jpeg" alt="After" className="w-full h-full object-cover pointer-events-none" />
          </div>

          {/* Foreground Image (Before) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src="/Blefore.jpeg" alt="Before" className="w-full h-full object-cover pointer-events-none" />
          </div>

          {/* Slider line and button */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a2766] rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <ChevronLeft className="w-5 h-5 text-white -mr-1" />
              <ChevronRight className="w-5 h-5 text-white -ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
