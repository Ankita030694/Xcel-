import React from 'react';
import Image from 'next/image';

export function MissionVisionSection() {
  return (
    <section className="w-full min-h-[calc(100vh-124px)] flex flex-col justify-center items-center py-4 lg:py-6 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full flex justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1080px] mx-auto justify-items-center items-center w-full">
          
          {/* Vision Card */}
          <div 
            className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] flex items-center justify-center bg-white"
            style={{ 
              maxWidth: 'min(480px, calc(100vh - 180px))',
              aspectRatio: '1/1'
            }}
          >
            <img 
              src="/banners/our-vision.webp" 
              alt="Our Vision" 
              className="w-full h-full object-contain block"
              loading="lazy"
            />
          </div>

          {/* Mission Card */}
          <div 
            className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] flex items-center justify-center bg-white"
            style={{ 
              maxWidth: 'min(480px, calc(100vh - 180px))',
              aspectRatio: '1/1'
            }}
          >
            <img 
              src="/banners/our-mission.webp" 
              alt="Our Mission" 
              className="w-full h-full object-contain block"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
