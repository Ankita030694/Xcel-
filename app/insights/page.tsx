import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const imgPlaceholder = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";
const imgPlaceholderSmall = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#3b5b95] font-bold text-xl tracking-widest">//</span>
            <span className="text-gray-500 font-bold text-sm tracking-[0.15em]">Insights & Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-black tracking-tight leading-[1.1] mb-10 max-w-2xl">
            Latest Insights from XCEL
          </h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {['Industry News', 'Case Studies', 'Laundry Tips', 'Product Updates'].map((filter, index) => (
              <button 
                key={index}
                className="px-6 py-2 rounded-full border border-[#1e448a] text-[#1e448a] font-medium text-[13px] hover:bg-[#1e448a] hover:text-white transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Grid from Figma */}
        <div className="w-full mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
            
            {/* Item 1 - Featured (Spans 2 columns) */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-[15px] p-8 relative group min-h-[450px] lg:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col md:flex-row border border-gray-100">
              <div className="w-full md:w-1/2 flex flex-col h-full relative z-10 pr-4">
                <p className="font-semibold text-[20px] tracking-[2px] mb-4 text-black uppercase">DESIGN</p>
                <h2 className="text-3xl md:text-4xl lg:text-[35px] font-medium leading-[40px] text-black mb-4 pr-12">
                  The Importance of Mobile-First Design in 2005
                </h2>
                <p className="text-[rgba(0,0,0,0.65)] text-[20px] lg:text-[28px]">Feb 26, 2001</p>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0 relative h-[300px] md:h-auto overflow-hidden rounded-[10px] transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl">
                <img src={imgPlaceholder} alt="Feature" className="absolute inset-0 w-full h-full object-cover rounded-[10px]" />
              </div>
            </div>

            {/* Item 2 - Tall Standard (Spans 1 column) */}
            <div className="col-span-1 bg-white rounded-[15px] p-8 relative group min-h-[450px] lg:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col border border-gray-100">
              <p className="font-semibold text-[16px] lg:text-[20px] tracking-[2px] mb-4 text-black uppercase">DESIGN</p>
              <h2 className="text-2xl md:text-3xl lg:text-[35px] font-medium leading-[1.2] lg:leading-[40px] text-black pr-4 mb-4 relative z-10">
                The Importance of Mobile-First Design in 2005
              </h2>
              <p className="text-[rgba(0,0,0,0.65)] text-[20px] lg:text-[28px] relative z-10">Feb 26, 2001</p>
              
              <div className="mt-auto pt-8 flex items-end justify-between relative min-h-[130px] lg:min-h-[160px]">
                <div className="w-[140px] h-[90px] md:w-[160px] md:h-[100px] lg:w-[220px] lg:h-[130px] absolute -bottom-[15px] -right-[15px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white z-0 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:-translate-y-3 group-hover:-translate-x-3 group-hover:shadow-2xl">
                  <img src={imgPlaceholderSmall} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Items 3, 4, 5 - Standard Normal (Spans 1 column each) */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-span-1 bg-white rounded-[15px] p-8 relative group min-h-[350px] lg:min-h-[377px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col border border-gray-100">
                <p className="font-semibold text-[16px] lg:text-[20px] tracking-[2px] mb-4 text-black uppercase relative z-10">DESIGN</p>
                <h2 className="text-xl md:text-2xl lg:text-[35px] font-medium leading-[1.2] lg:leading-[40px] text-black pr-4 mb-4 relative z-10">
                  The Importance of Mobile-First Design in 2005
                </h2>
                <p className="text-[rgba(0,0,0,0.65)] text-[18px] lg:text-[28px] relative z-10">Feb 26, 2001</p>
                
                <div className="mt-auto pt-8 flex items-end justify-between relative min-h-[110px] lg:min-h-[140px]">
                  <div className="w-[130px] h-[80px] md:w-[150px] md:h-[90px] lg:w-[220px] lg:h-[130px] absolute -bottom-[15px] -right-[15px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white z-0 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:-translate-y-3 group-hover:-translate-x-3 group-hover:shadow-2xl">
                    <img src={imgPlaceholderSmall} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16 mb-8">
            <button className="bg-[#1e448a] text-white font-semibold text-[20px] px-10 py-4 rounded-[82px] shadow-md hover:bg-[#15346b] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Load More
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
