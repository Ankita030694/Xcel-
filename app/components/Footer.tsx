import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f5f8] py-8 lg:py-10 px-4 sm:px-8 lg:px-12 flex justify-center font-sans">
      {/* Outer Wrapper for the white grid lines */}
      <div className="w-full max-w-[1500px] bg-white flex flex-col gap-[2px] shadow-sm">
        
        {/* Top Split Area */}
        <div className="flex flex-col lg:flex-row gap-[2px] w-full">
          
          {/* Left Column - Contact Form */}
          <div className="w-full lg:w-[35%] bg-[#d3dce8] p-6 lg:p-8 flex flex-col text-[#0a2766]">
            <h3 className="text-[24px] lg:text-[28px] font-bold mb-1">Get in Touch with us</h3>
            <p className="text-[#0a2766]/80 text-[14px] mb-5 leading-snug">
              A Stefab professional will<br />contact you as soon as possible.
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
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Services 2</span>
                </label>
              </div>
              
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 accent-[#002d73] cursor-pointer shrink-0" />
                <span className="text-[#0a2766] text-[13px] leading-tight">by checking this box I accept the <strong>Privacy Policy</strong></span>
              </label>
            </div>

            <button type="button" className="w-full bg-[#002d73] hover:bg-[#001f54] text-white font-medium text-[15px] py-3 transition-colors">
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
                  XCEL Engineering Pvt. Ltd.<br />
                  Plot No. 123, Industrial Estate,<br />
                  Sector 18, IMT Manesar,<br />
                  Gurugram, Haryana 122050, India<br /><br />
                  info@xcelindia.com
                </p>
              </div>
              
              {/* White spacer block */}
              <div className="hidden md:block w-[120px] bg-white"></div>
              
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">About XCEL</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  XCEL has been manufacturing high-performance industrial and commercial laundry equipment since 1994, delivering reliable washing, drying, ironing, and dry-cleaning solutions across India.
                </p>
              </div>
            </div>

            {/* Section 2: Social Icons */}
            <div className="w-full bg-[#3b5e94] py-3 flex justify-center items-center gap-6">
              {/* X Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* WhatsApp Icon */}
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>

            {/* Section 3: Links Grid */}
            <div className="w-full bg-[#3b5e94] px-6 py-6 grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-4 text-white">
              <div>
                <h5 className="font-semibold text-[14px] mb-3">HOME</h5>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">ABOUT US</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Company Profile</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Manufacturing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Quality Assurance</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Why XCEL</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">PRODUCTS</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Washing Machines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Drying Tumblers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Washer Extractors</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Flatwork Ironers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">INDUSTRIES</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Hotels & Resorts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Laundromats</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Garment Industry</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Industrial & Textile</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">SUPPORT</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Spare Parts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[14px] mb-3">CONTACT</h5>
                <ul className="flex flex-col gap-2 text-white/80 text-[11px]">
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Service Centers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dealer Network</a></li>
                </ul>
              </div>
            </div>

            {/* Section 4: Certifications & Badges */}
            <div className="w-full bg-[#002d73] py-6 px-6 flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
               {/* Placeholders for logos matching the image */}
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">ISO</span>
                 <span className="text-[6px] font-bold text-center leading-tight mt-1">9001-2008<br/>CERTIFIED</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">PCMS</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-md flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="text-[7px] mb-1">Registered</span>
                 <span className="font-bold text-[12px]">Care</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[24px]">CE</span>
                 <span className="text-[5px] tracking-widest mt-1">CERTIFIED</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center text-white border border-white/20">
                 <span className="font-extrabold text-[14px]">GMP</span>
               </div>
               <div className="w-16 h-16 bg-white/5 rounded-md flex flex-col items-center justify-center text-white border border-white/20">
                 <div className="w-5 h-5 border-2 border-white rounded-t-full mb-1"></div>
                 <span className="text-[5px] text-center leading-tight">NORWEGIAN<br/>ACCREDITATION</span>
               </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-[#002d73] px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-white font-semibold text-[20px] tracking-wide">
            XCEL INDIA
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[12px] font-semibold tracking-wide text-white">
            <a href="#" className="hover:text-white/70 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white/70 transition-colors">TERMS & CONDITIONS</a>
            <a href="#" className="hover:text-white/70 transition-colors">SITEMAP</a>
            <a href="#" className="hover:text-white/70 transition-colors">SALES TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
