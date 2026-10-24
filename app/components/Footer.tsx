"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BLOG_ARTICLES } from '@/data/blogs';

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    state: '',
    message: '',
    interest: '',
    acceptedPolicy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const indianStatesAndUTs = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, name: value });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, contact: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.email || !formData.state) {
      alert("Please fill all required fields");
      return;
    }
    if (formData.contact.length !== 10) {
      alert("Please enter exactly 10 digits for the phone number");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!formData.acceptedPolicy) {
      alert("Please accept the privacy policy");
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "contactForms"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });
      alert("Form submitted successfully!");
      setFormData({
        name: '',
        contact: '',
        email: '',
        state: '',
        message: '',
        interest: '',
        acceptedPolicy: false
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer-contact" className="w-full bg-[#f3f5f8] pt-4 lg:pt-6 pb-0 px-4 sm:px-8 lg:px-12 flex justify-center font-sans scroll-mt-[140px]">
      {/* Outer Wrapper for the white grid lines */}
      <div className="w-full max-w-[1500px] bg-white flex flex-col gap-[2px] shadow-sm">
        
        {/* Top Split Area */}
        <div className="flex flex-col lg:flex-row gap-[2px] w-full">
          
          {/* Left Column - Contact Form */}
          <div className="w-full lg:w-[35%] bg-[#d3dce8] p-6 lg:p-8 flex flex-col text-[#0a2766]">
            <h3 className="text-[24px] lg:text-[28px] font-bold mb-1">Get in Touch with us</h3>
            <p className="text-[#0a2766]/80 text-[14px] mb-5 leading-snug">
              An Xcel Professional will contact you at the earliest.
            </p>
            
            {/* Flush Inputs */}
            <div className="flex flex-col bg-white border-none w-full mb-4">
              <input type="text" placeholder="Name*" value={formData.name} onChange={handleNameChange} className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="text" placeholder="Contact No.*" value={formData.contact} onChange={handleContactChange} className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <input type="email" placeholder="Email Address*" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-gray-200 px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors text-[13px]" />
              <div className="relative w-full">
                <select 
                  value={formData.state} 
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
                  className={`w-full bg-transparent border-b border-gray-200 px-4 py-2.5 focus:outline-none focus:bg-gray-50 transition-colors text-[13px] appearance-none cursor-pointer ${formData.state === '' ? 'text-[#8a9bb0]' : 'text-[#0a2766]'}`}
                >
                  <option value="" disabled className="text-[#8a9bb0]">Select State/UT*</option>
                  {indianStatesAndUTs.map((state) => (
                    <option key={state} value={state} className="text-[#0a2766]">{state}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8a9bb0]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <textarea rows={2} placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent px-4 py-2.5 text-[#0a2766] placeholder-[#8a9bb0] focus:outline-none focus:bg-gray-50 transition-colors resize-none text-[13px]"></textarea>
            </div>
            
            {/* Checkboxes */}
            <div className="mt-1 mb-6">
              <p className="text-[#0a2766] mb-2 text-[13px]">Area of Interest</p>
              <div className="flex flex-wrap gap-5 mb-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" value="Sales" checked={formData.interest === 'Sales'} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Sales</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="interest" value="Services" checked={formData.interest === 'Services'} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="w-3.5 h-3.5 accent-[#002d73] cursor-pointer" />
                  <span className="text-[#0a2766] text-[13px] font-medium">Services</span>
                </label>

              </div>
              
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.acceptedPolicy} onChange={(e) => setFormData({ ...formData, acceptedPolicy: e.target.checked })} className="w-3.5 h-3.5 mt-0.5 accent-[#002d73] cursor-pointer shrink-0" />
                <span className="text-[#0a2766] text-[13px] leading-tight">By checking this box I accept the <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#001f54]">Privacy Policy</a></span>
              </label>
            </div>

            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-1/2 mx-auto bg-[#002d73] hover:bg-[#001f54] text-white font-medium text-[14px] py-2.5 transition-colors disabled:opacity-50">
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </div>

          {/* Right Column - Info & Links (Grid of white gaps) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-[2px] bg-white">
            
            {/* Section 1: Corporate Office & About */}
            <div className="flex flex-col md:flex-row gap-[2px] h-auto">
              <div className="flex-1 bg-[#3b5e94] p-6 text-white">
                <h4 className="text-[16px] font-semibold mb-3">Our Corporate Office</h4>
                <p className="text-white/90 leading-relaxed text-[13px]">
                  Xcel Stiro Private Limited<br />
                  Plot No. 70, Sector 27C,<br />
                  Faridabad, Haryana 121003, India<br /><br />
                  sales@xcelstiro.com
                </p>
              </div>
              
              {/* Image spacer block */}
              <div className="hidden md:block w-[120px] relative overflow-hidden bg-[#3b5e94]/20">
                <Image 
                  src="/commercial-washing-machine-generated.webp" 
                  alt="Commercial Washing Machine" 
                  fill
                  className="object-cover" 
                />
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
              <a 
                href="https://www.facebook.com/profile.php?id=100068674694991&mibextid=LQQJ4d" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="text-white hover:text-white/70 transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              {/* Instagram Icon */}
              <a 
                href="https://www.instagram.com/xcelstiro?obrf=ZzB3N2s3MHN2dm5m&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="text-white hover:text-white/70 transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube Icon */}
              <a 
                href="https://www.youtube.com/@XcelStiroPrivateLimited" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="text-white hover:text-white/70 transition-colors"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              
            </div>

            {/* Section 3: Links Grid */}
            <div className="w-full bg-[#3b5e94] px-6 py-4 flex flex-col md:flex-row justify-between gap-8 md:gap-4 text-white">
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3 md:mb-0">
                  <a href="/" className="hover:text-white/80 transition-colors">HOME</a>
                </h5>
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
                <h5 className="font-semibold text-[14px] mb-3">
                  <Link href="/blogs" className="hover:text-white/80 transition-colors">INDUSTRY INSIGHTS</Link>
                </h5>
                <ul className="flex flex-col gap-2.5 text-white/80 text-[11px]">
                  {BLOG_ARTICLES.slice(0, 4).map((article) => {
                    const hook = article.title
                      .split(/ — | – | \(/)[0]
                      .replace(/\?$/, '')
                      .replace(' for Your Business', '')
                      .trim();

                    return (
                      <li key={article.id}>
                        <Link 
                          href={`/blogs/${article.slug}`} 
                          title={article.title}
                          className="hover:text-white transition-colors block leading-snug"
                        >
                          {hook}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-[14px] mb-3">
                  <a href="/contact" className="hover:text-white/80 transition-colors">CONTACT US</a>
                </h5>
              </div>
            </div>

            {/* Section 4: Certifications & Badges */}
            <div className="w-full bg-[#002d73] pt-3 pb-12 sm:pt-4 sm:pb-16 px-6 flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
              <img src="/Logo/ISO_9001_2008_Certification_at_%E2%82%B9_5000_certificate_in_New_Delhi_ID_22229167830_indiamart%201.webp" alt="ISO Certification" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/How_to_get_a_CE_Certification_-_tradesnest%201.webp" alt="CE Certification" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/Make_in_India_Logo_PNG_Vector_(EPS)_Free_Download_seeklogo%201.webp" alt="Make in India" className="h-12 sm:h-16 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/What_is_NSIC_Online_Finance_Facilitation_Centres_(FFCs)_luxefinalyzer%201..webp" alt="NSIC" className="h-6 sm:h-8 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
              <img src="/Logo/Our_Certifications_acquafrasassi%201.webp" alt="Certifications" className="h-8 sm:h-12 w-auto object-contain grayscale invert contrast-125 mix-blend-screen opacity-90 hover:opacity-100 transition-all duration-300" />
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-[#002d73] px-6 sm:px-8 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10">
          <div className="text-white font-semibold text-[12px] sm:text-[14px] tracking-wide">
            XCEL STIRO PRIVATE LIMITED. ALL RIGHTS RESERVED
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[12px] font-semibold tracking-wide text-white">
            <a href="/privacy" className="hover:text-white/70 transition-colors">PRIVACY POLICY</a>
            <a href="/terms" className="hover:text-white/70 transition-colors">TERMS OF SERVICE</a>
            <a href="/sitemap" className="hover:text-white/70 transition-colors">SITEMAP</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
