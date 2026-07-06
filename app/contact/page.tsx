"use client";
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="w-full relative bg-[#0a2766]">
        <img 
          src="/Contact Us Banner  (1).svg" 
          alt="Contact Us Banner" 
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* Form & Map Section */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 lg:px-12 flex justify-center bg-white border-b border-gray-100">
        <div className="w-full max-w-[1300px] flex flex-col items-center">
          
          <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Form */}
            <div className="w-full lg:w-1/2 flex flex-col pt-4">
              
              <div className="mb-10">
                <h4 className="text-[#32589c] font-bold text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <span className="animate-pulse">//</span> GET IN TOUCH
                </h4>
                <h2 className="text-[36px] sm:text-[44px] font-black text-[#000] leading-[1.15] mb-4 tracking-tight">
                  Let's Start the<br/><span className="text-[#32589c]">Conversation</span>
                </h2>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-[90%]">
                  Whether you're planning a new facility or upgrading existing equipment, we're ready to help you find the right solution.
                </p>
              </div>

              <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                
                <div className="border border-gray-200 border-b-0 px-4 py-3.5">
                  <input type="text" placeholder="Name*" className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none" required />
                </div>
                
                <div className="border border-gray-200 border-b-0 px-4 py-3.5">
                  <input type="text" placeholder="Contact No.*" className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none" required />
                </div>

                <div className="border border-gray-200 border-b-0 px-4 py-3.5">
                  <input type="email" placeholder="Email Address*" className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none" required />
                </div>

                <div className="border border-gray-200 border-b-0 px-4 py-3.5 relative">
                  <select className="w-full bg-transparent text-[14px] text-[#0a2766] font-medium focus:outline-none appearance-none cursor-pointer" required defaultValue="">
                    <option value="" disabled>Select State/UT*</option>
                    <option value="ap">Andhra Pradesh</option>
                    <option value="ar">Arunachal Pradesh</option>
                    <option value="as">Assam</option>
                    <option value="br">Bihar</option>
                    <option value="cg">Chhattisgarh</option>
                    <option value="ga">Goa</option>
                    <option value="gj">Gujarat</option>
                    <option value="hr">Haryana</option>
                    <option value="hp">Himachal Pradesh</option>
                    <option value="jh">Jharkhand</option>
                    <option value="ka">Karnataka</option>
                    <option value="kl">Kerala</option>
                    <option value="mp">Madhya Pradesh</option>
                    <option value="mh">Maharashtra</option>
                    <option value="mn">Manipur</option>
                    <option value="ml">Meghalaya</option>
                    <option value="mz">Mizoram</option>
                    <option value="nl">Nagaland</option>
                    <option value="or">Odisha</option>
                    <option value="pb">Punjab</option>
                    <option value="rj">Rajasthan</option>
                    <option value="sk">Sikkim</option>
                    <option value="tn">Tamil Nadu</option>
                    <option value="tg">Telangana</option>
                    <option value="tr">Tripura</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="ut">Uttarakhand</option>
                    <option value="wb">West Bengal</option>
                    <option value="an">Andaman and Nicobar Islands</option>
                    <option value="ch">Chandigarh</option>
                    <option value="dn">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="dl">Delhi</option>
                    <option value="jk">Jammu and Kashmir</option>
                    <option value="la">Ladakh</option>
                    <option value="ld">Lakshadweep</option>
                    <option value="py">Puducherry</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#0a2766]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="border border-gray-200 px-4 py-3.5">
                  <textarea placeholder="Message" rows={3} className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none resize-none"></textarea>
                </div>

                <button type="submit" className="self-start mt-8 bg-[#0a2766] hover:bg-[#001f54] text-white font-medium text-[12px] tracking-wider uppercase py-3.5 px-16 rounded transition-colors shadow-lg shadow-[#0a2766]/20">
                  SUBMIT
                </button>
              </form>
            </div>

            {/* Right: Map */}
            <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px]">
              <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center bg-gray-50 border border-gray-100 relative">
                 <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0263604850785!2d77.30799797549526!3d28.47875957574884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce711f1f2e4db%3A0xc54eb8e3f42c2b77!2sSector%2027C%2C%20Faridabad%2C%20Haryana%20121003!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', inset: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Xcel Corporate Office Map"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Office Locations Section */}
      <section className="w-full pt-16 lg:pt-20 pb-8 px-4 sm:px-8 lg:px-12 flex justify-center bg-[#f8f9fa] relative">
        <div className="w-full max-w-[1300px] flex flex-col">
          
          <div className="text-center mb-16 flex flex-col items-center">
            <h4 className="text-[#32589c] font-bold text-[14px] sm:text-[16px] tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2">
              <span className="animate-pulse">//</span> OUR LOCATIONS
            </h4>
            <p className="text-gray-500 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl">
              Our facilities and support network ensure quality products and reliable assistance, wherever you are.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left: India Map Graphic */}
            <div className="w-full lg:w-[45%] flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-visible">
              <div className="relative w-full max-w-[550px] scale-105 lg:scale-110 hover:scale-[1.08] lg:hover:scale-[1.15] transition-all duration-500 ease-in-out group cursor-default">
                <img src="/india-map.svg" alt="India Map" className="w-full h-auto drop-shadow-sm opacity-80 group-hover:opacity-100 group-hover:drop-shadow-lg transition-all duration-500" />
                
                {/* Faridabad Pin (Haryana) */}
                <div className="absolute top-[32%] left-[34%] flex flex-col items-center -translate-x-1/2 -translate-y-full group cursor-pointer z-10">
                  <div className="bg-white border border-gray-100 text-[#0a2766] text-[11px] font-bold py-1.5 px-3 rounded-full mb-1 opacity-100 shadow-[0_4px_10px_rgba(0,0,0,0.1)] whitespace-nowrap">
                    Faridabad, Haryana
                  </div>
                  <svg className="w-8 h-8 text-[#32589c] drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>

                {/* Tiruppur Pin (Tamil Nadu) */}
                <div className="absolute top-[86%] left-[38%] flex flex-col items-center -translate-x-1/2 -translate-y-full group cursor-pointer z-10">
                  <div className="bg-white border border-gray-100 text-[#0a2766] text-[11px] font-bold py-1.5 px-3 rounded-full mb-1 opacity-100 shadow-[0_4px_10px_rgba(0,0,0,0.1)] whitespace-nowrap">
                    Tiruppur, Tamil Nadu
                  </div>
                  <svg className="w-8 h-8 text-[#32589c] drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
              </div>
            </div>

            {/* Right: Location Cards (Stacked) */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6">
              
              {/* Card 1: Corporate Office (Swapped to Faridabad Text) */}
              <div className="bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col sm:flex-row gap-8">
                
                <div className="flex-1">
                  <h3 className="text-[#32589c] font-bold text-[15px] mb-4">Corporate Office and Manufacturing Plant</h3>
                  
                  <div className="flex flex-col gap-1 text-[13px] text-gray-600 leading-relaxed mb-6">
                    <p>Plot 70, Sector 27C,</p>
                    <p>Faridabad, Haryana 121003, India</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>+91 129-4155713</p>
                    <p>+91 129-4155714</p>
                    <p>+91 9971025730</p>
                  </div>

                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>sales@xcelstiro.com</p>
                    <p>servicing@xcelstiro.com</p>
                  </div>

                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>Mon – Sat: 8:30 AM – 5:30 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

              </div>

              {/* Card 2: Regional Office (Swapped to Tamil Nadu Text) */}
              <div className="bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col sm:flex-row gap-8">
                
                <div className="flex-1">
                  <h3 className="text-[#32589c] font-bold text-[15px] mb-4">Regional Office</h3>
                  
                  <div className="flex flex-col gap-1 text-[13px] text-gray-600 leading-relaxed mb-6">
                    <p>12/26, PN Road, Laxmi Nagar,</p>
                    <p>New Extension, Tiruppur,</p>
                    <p>Tamil Nadu 641602, India</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>+91 7428087070</p>
                    <p>+91 8438067251</p>
                  </div>

                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>tirupur@xcelstiro.com</p>
                    <p>sales@xcelstiro.com</p>
                  </div>

                  <div className="flex flex-col gap-1 text-[13px] text-gray-600">
                    <p>Mon – Sat: 9:30 AM – 7:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
