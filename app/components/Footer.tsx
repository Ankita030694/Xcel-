import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f5f8] pt-8 lg:pt-10 pb-0 px-4 sm:px-8 lg:px-12 flex justify-center font-sans">
      {/* Outer Wrapper for the white grid lines */}
      <div className="w-full max-w-[1500px] bg-white flex flex-col gap-[2px] shadow-sm">
        
        {/* Top Split Area */}
        <div className="flex flex-col lg:flex-row gap-[2px] w-full">
          
          {/* Left Column - Contact Form */}
          <div className="w-full lg:w-[35%] bg-[#d3dce8] p-6 lg:p-8 flex flex-col text-[#0a2766]">
            <h3 className="text-[24px] lg:text-[28px] font-bold mb-1">Get in Touch with us</h3>
            <p className="text-[#0a2766]/80 text-[14px] mb-5 leading-snug">
              A Xcel Professional will contact you at the earliest.
            </p>
            
            {/* Flush Inputs */}
            <div className="flex flex-col bg-white border-none w-full mb-4">
              <input type="text" placeholder="Name*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="text" placeholder="Contact No.*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="email" placeholder="Email Address*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="text" placeholder="Location*" className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <textarea rows={2} placeholder="Message" className="w-full bg-transparent px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors resize-none text-[13px]"></textarea>
            </div>
            
            {/* Checkboxes */}
            <div className="mt-1 mb-6">
              <p className="text-[#0a2766] mb-2 text-[13px]">Area of Interest</p>
              <div className="flex flex-wrap gap-5 mb-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Sales</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Services</span>
                </label>

              </div>
              
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 accent-[#002d73] cursor-pointer shrink-0" />
                <span className="text-[#0a2766] text-[13px] leading-tight">By checking this box I accept the <strong>Privacy Policy</strong></span>
              </label>
            </div>

            <button type="button" className="w-1/2 mx-auto bg-[#002d73] hover:bg-[#001f54] text-white font-medium text-[14px] py-2.5 transition-colors">
              SUBMIT
            </button>
          </div>

          {/* Right Column - Info & Links (Grid of white gaps) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-[2px] bg-white">
            
            {/* Section 1: Corporate Office & About */}
            <div className="flex flex-col md:flex-row gap-[2px] h-auto">
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">Our Corporate Office</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  Plot No. 70, Sector 27C,<br />
                  Faridabad, Haryana 121003, India<br /><br />
                  sales@xcelstiro.com
                </p>
              </div>
              
              {/* Image spacer block */}
              <div className="hidden md:block w-[120px] relative overflow-hidden bg-[#3b5e94]/20">
                <img src="/commercial-washing-machine-generated.png" alt="Commercial Washing Machine" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">About XCEL</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  XCEL has been manufacturing high-performance industrial and commercial laundry equipment since 1994, delivering complete range of machines, backed by a nationwide network of after sales service and support.
                </p>
              </div>
            </div>

            {/* Section 2: Social Icons */}
            <div className="w-full bg-[#3b5e94] py-3 flex justify-center items-center gap-6">
              {/* Facebook Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              {/* Instagram Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* WhatsApp Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>

            {/* Section 3: Links Grid */}
            <div className="w-full bg-[#3b5e94] px-6 py-8 flex flex-col md:flex-row justify-between gap-8 md:gap-4 text-white">
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3 md:mb-0">HOME</h5>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3 md:mb-3">
                  <a href="/about" className="hover:text-white/80 transition-colors">ABOUT US</a>
                </h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="/about#our-story" className="hover:text-white transition-colors">OUR STORY</a></li>
                  <li><a href="/about#leadership" className="hover:text-white transition-colors">LEADERSHIP</a></li>
                  <li><a href="/about#vision" className="hover:text-white transition-colors">VISION</a></li>
                </ul>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3">
                  <a href="/products" className="hover:text-white/80 transition-colors">PRODUCTS</a>
                </h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="/products#washing" className="hover:text-white transition-colors">WASHING</a></li>
                  <li><a href="/products#drying" className="hover:text-white transition-colors">DRYING</a></li>
                  <li><a href="/products#apparel-processing" className="hover:text-white transition-colors">APPAREL PROCESSING</a></li>
                  <li><a href="/products#dry-cleaning" className="hover:text-white transition-colors">DRY-CLEANING</a></li>
                  <li><a href="/products#flat-work" className="hover:text-white transition-colors">FLAT-WORK</a></li>
                  <li><a href="/products#steam-finishing" className="hover:text-white transition-colors">STEAM-FINISHING</a></li>
                  <li><a href="/products#water-heater" className="hover:text-white transition-colors">WATER HEATER</a></li>
                  <li><a href="/products#fabric-checking" className="hover:text-white transition-colors">FABRIC CHECKING</a></li>
                  <li><a href="/products#other-equipment" className="hover:text-white transition-colors">OTHER EQUIPMENT</a></li>
                  <li><a href="/products#complete-range" className="hover:text-white transition-colors">COMPLETE RANGE</a></li>
                </ul>
              </div>
              <div className="flex-[1.5]">
                <h5 className="font-semibold text-[14px] mb-3">INDUSTRY INSIGHTS</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">The Future of Commercial Laundry</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Eco-Friendly Washing Solutions</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Optimizing Hotel Laundry Operations</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Preventive Maintenance Guide</a></li>
                </ul>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3">CONTACT US</h5>
              </div>
            </div>

            {/* Section 4: Certifications & Badges */}
            <div className="w-full bg-[#002d73] py-6 px-6 flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
              <img src="/Logo/ISO_9001_2008_Certification_at_%E2%82%B9_5000_certificate_in_New_Delhi_ID_22229167830_indiamart%201.svg" alt="ISO Certification" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/How_to_get_a_CE_Certification_-_tradesnest%201.svg" alt="CE Certification" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/Make_in_India_Logo_PNG_Vector_(EPS)_Free_Download_seeklogo%201.svg" alt="Make in India" className="h-12 sm:h-16 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/What_is_NSIC_Online_Finance_Facilitation_Centres_(FFCs)_luxefinalyzer%201..svg" alt="NSIC" className="h-6 sm:h-8 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/Our_Certifications_acquafrasassi%201.svg" alt="Certifications" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-[#002d73] px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10">
          <div className="text-white font-semibold text-[12px] sm:text-[14px] tracking-wide">
            XCEL STIRO PRIVATE LIMITED. ALL RIGHTS RESERVED
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[12px] font-semibold tracking-wide text-white">
            <a href="/privacy" className="hover:text-white/70 transition-colors">PRIVACY</a>
            <a href="/terms" className="hover:text-white/70 transition-colors">TERMS OF SERVICE</a>
            <a href="/sitemap" className="hover:text-white/70 transition-colors">SITEMAP</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
