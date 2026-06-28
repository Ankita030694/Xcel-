import React from 'react';

export function MissionVisionSection() {
  return (
    <section className="pt-4 pb-16 lg:pt-8 lg:pb-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          
          {/* Vision Card */}
          <div className="w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
            <img 
              src="/Vision.jpg" 
              alt="Our Vision" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Mission Card */}
          <div className="w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
            <img 
              src="/Mission.jpg" 
              alt="Our Mission" 
              className="w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
