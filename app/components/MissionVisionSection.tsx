import React from 'react';

export function MissionVisionSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Slick Mission Card */}
          <div className="group relative w-full h-[550px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Mission" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2766]/10 via-[#0a2766]/60 to-[#0a2766] opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
            
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full"></div>

            {/* Content */}
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
              
              {/* Top Glass Badge */}
              <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-full border border-white/20 self-start shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
                <span className="text-white text-[11px] font-black tracking-[0.25em] uppercase">Our Mission</span>
              </div>

              {/* Bottom Content Area */}
              <div className="flex flex-col transform transition-transform duration-500 lg:translate-y-8 group-hover:translate-y-0">
                <h3 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] mb-6 tracking-tighter drop-shadow-2xl">
                  Cleaner Results.<br/>Smarter Operations.<br/>Better Efficiency.
                </h3>
                
                <p className="text-base lg:text-lg text-blue-50/90 leading-relaxed font-medium max-w-md drop-shadow-md lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  To design and deliver high-performance commercial washing machines that empower businesses across India to operate with maximum efficiency, hygiene, and reliability.
                </p>
                
                {/* Glassmorphic Features */}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-x-8 gap-y-4 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {[
                    "Heavy Duty Performance", 
                    "Perfect Results", 
                    "Trusted Engineering"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 backdrop-blur-sm bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                       <span className="text-[10px] font-bold text-white tracking-widest uppercase">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slick Vision Card */}
          <div className="group relative w-full h-[550px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Vision" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#186a7d]/10 via-[#186a7d]/60 to-[#186a7d] opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
            
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full"></div>

            {/* Content */}
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
              
              {/* Top Glass Badge */}
              <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-full border border-white/20 self-start shadow-lg">
                <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse shadow-[0_0_10px_rgba(94,234,212,0.8)]"></span>
                <span className="text-white text-[11px] font-black tracking-[0.25em] uppercase">Our Vision</span>
              </div>

              {/* Bottom Content Area */}
              <div className="flex flex-col transform transition-transform duration-500 lg:translate-y-8 group-hover:translate-y-0">
                <h3 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] mb-6 tracking-tighter drop-shadow-2xl">
                  Powering Clean.<br/>Driving Efficiency.<br/>Building Trust.
                </h3>
                
                <p className="text-base lg:text-lg text-teal-50/90 leading-relaxed font-medium max-w-md drop-shadow-md lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  To be India's most trusted name in heavy-duty laundry technology, recognized for the machines we build and the operational excellence we enable.
                </p>
                
                {/* Glassmorphic Features */}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-x-8 gap-y-4 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {[
                    "Industrial Strength", 
                    "Unmatched Reliability", 
                    "Sustainable Solutions"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 backdrop-blur-sm bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
                       <div className="w-1.5 h-1.5 rounded-full bg-teal-300"></div>
                       <span className="text-[10px] font-bold text-white tracking-widest uppercase">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
