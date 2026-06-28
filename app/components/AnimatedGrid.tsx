import React from 'react';

const imgPlaceholder = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";
const imgPlaceholderSmall = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

export const AnimatedGrid = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8 font-sans">
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
        
        {/* Item 1 - Featured (Spans 2 columns) */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-[15px] p-8 relative overflow-hidden group min-h-[450px] lg:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col md:flex-row border border-gray-100">
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col h-full relative z-10 pr-4">
            <p className="font-semibold text-[20px] tracking-[2px] mb-4 text-black uppercase">DESIGN</p>
            <h2 className="text-3xl md:text-4xl lg:text-[35px] font-medium leading-[40px] text-black mb-8 pr-12">
              The Importance of Mobile-First Design in 2005
            </h2>
            <p className="text-[rgba(0,0,0,0.65)] text-[28px] mt-auto pt-8">Feb 26, 2001</p>
          </div>
          
          {/* Large Image Right */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 relative h-[300px] md:h-auto overflow-hidden rounded-[10px]">
            <img 
              src={imgPlaceholder} 
              alt="Feature" 
              className="absolute inset-0 w-full h-full object-cover rounded-[10px] transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Item 2 - Tall Standard (Spans 1 column) */}
        <div className="col-span-1 bg-white rounded-[15px] p-8 relative overflow-hidden group min-h-[450px] lg:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col border border-gray-100">
          <p className="font-semibold text-[20px] tracking-[2px] mb-4 text-black uppercase">DESIGN</p>
          <h2 className="text-3xl md:text-4xl lg:text-[35px] font-medium leading-[40px] text-black pr-4">
            The Importance of Mobile-First Design in 2005
          </h2>
          
          <div className="mt-auto pt-8 flex items-end justify-between relative">
            <p className="text-[rgba(0,0,0,0.65)] text-[28px]">Feb 26, 2001</p>
            {/* Small Image Bottom Right */}
            <div className="w-[180px] h-[110px] lg:w-[247px] lg:h-[130px] absolute -bottom-[20px] -right-[15px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white">
              <img 
                src={imgPlaceholderSmall} 
                alt="Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Items 3, 4, 5 - Standard Normal (Spans 1 column each) */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="col-span-1 bg-white rounded-[15px] p-8 relative overflow-hidden group min-h-[350px] lg:min-h-[377px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col border border-gray-100">
            <p className="font-semibold text-[20px] tracking-[2px] mb-4 text-black uppercase">DESIGN</p>
            <h2 className="text-2xl md:text-3xl lg:text-[35px] font-medium leading-[40px] text-black pr-4">
              The Importance of Mobile-First Design in 2005
            </h2>
            
            <div className="mt-auto pt-8 flex items-end justify-between relative">
              <p className="text-[rgba(0,0,0,0.65)] text-[28px]">Feb 26, 2001</p>
              {/* Small Image Bottom Right */}
              <div className="w-[160px] h-[100px] lg:w-[247px] lg:h-[130px] absolute -bottom-[15px] -right-[15px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src={imgPlaceholderSmall} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-12 mb-8">
        <button className="bg-[#ff5100] text-white font-semibold text-[20px] px-10 py-4 rounded-[82px] shadow-md hover:bg-[#e64a00] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          Load More
        </button>
      </div>

    </div>
  );
};
