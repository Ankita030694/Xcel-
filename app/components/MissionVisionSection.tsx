import React from 'react';
import Image from 'next/image';

export function MissionVisionSection() {
  return (
    <section className="pt-4 pb-6 lg:pt-8 lg:pb-10 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          
          {/* Vision Card */}
          <div className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px]">
              <Image 
                src="/Vision.jpg" 
                alt="Our Vision" 
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mission Card */}
          <div className="w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px]">
              <Image 
                src="/Mission.jpg" 
                alt="Our Mission" 
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
