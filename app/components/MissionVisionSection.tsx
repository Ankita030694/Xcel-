import React from 'react';
import Image from 'next/image';

export function MissionVisionSection() {
  return (
    <section className="w-full min-h-[calc(100vh-124px)] flex flex-col justify-center items-center py-4 lg:py-6 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full flex justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1080px] lg:max-w-[1180px] mx-auto justify-items-center items-center w-full">
          
          {/* Vision Card */}
          <div 
            className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 flex items-center justify-center bg-white aspect-square max-w-[min(480px,calc(100vh-180px))] lg:max-w-[min(528px,calc(100vh-150px))]"
          >
            <img 
              src="/banners/our-vision.webp" 
              alt="Our Vision" 
              className="w-full h-full object-contain block"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Mission Card */}
          <div 
            className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 flex items-center justify-center bg-white aspect-square max-w-[min(480px,calc(100vh-180px))] lg:max-w-[min(528px,calc(100vh-150px))]"
          >
            <img 
              src="/banners/our-mission.webp" 
              alt="Our Mission" 
              className="w-full h-full object-contain block"
              loading="lazy"
              decoding="async"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
