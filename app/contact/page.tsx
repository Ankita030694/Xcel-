"use client";
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] flex flex-col md:flex-row items-center overflow-hidden bg-gray-100">
        
        {/* Background Image (Right side on desktop) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/ontact-hero.png" 
            alt="Interior Office" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Diagonal Dark Blue Overlay */}
        <div className="absolute inset-0 z-10 hidden md:block">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L60,0 L40,100 L0,100 Z" className="text-[#0a2766] fill-current opacity-95" />
          </svg>
        </div>
        <div className="absolute inset-0 z-10 md:hidden bg-[#0a2766] opacity-95"></div>

        {/* Hero Content */}
        <div className="relative z-20 w-full md:w-[60%] lg:w-[50%] h-full flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 md:py-0 text-white">
          <h4 className="text-[13px] font-bold tracking-[0.25em] uppercase mb-4 text-blue-300">
            CONTACT US
          </h4>
          <h1 className="text-[40px] sm:text-[50px] lg:text-[60px] font-black leading-[1.1] mb-6">
            We&apos;re Here to Help!
          </h1>
          <p className="text-white/80 font-medium text-[15px] sm:text-[16px] leading-[1.6] md:max-w-[80%] mb-12">
            Need a quote, product information, or support with genuine laundry spare parts? Fill out the contact form below and our team will respond promptly.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 md:max-w-[90%]">
            {/* Feature 1 */}
            <div className="group flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-full border border-blue-400 group-hover:border-white group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <svg className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h5 className="font-bold text-[13px] mb-1 group-hover:text-white transition-colors">Expert Support</h5>
              <p className="text-[11px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">Get professional assistance</p>
            </div>
            {/* Feature 2 */}
            <div className="group flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-full border border-blue-400 group-hover:border-white group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <svg className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h5 className="font-bold text-[13px] mb-1 group-hover:text-white transition-colors">Quick Response</h5>
              <p className="text-[11px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">Prompt support for every inquiry</p>
            </div>
            {/* Feature 3 */}
            <div className="group flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-full border border-blue-400 group-hover:border-white group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <svg className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h5 className="font-bold text-[13px] mb-1 group-hover:text-white transition-colors">Reliable Service</h5>
              <p className="text-[11px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">Rapid repairs &amp; service as every minute counts</p>
            </div>
            {/* Feature 4 */}
            <div className="group flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-full border border-blue-400 group-hover:border-white group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <svg className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h5 className="font-bold text-[13px] mb-1 group-hover:text-white transition-colors">PAN India</h5>
              <p className="text-[11px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">Comprehensive support across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 lg:px-12 flex justify-center bg-white">
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-[36px] sm:text-[44px] font-black text-[#000] leading-tight mb-4 tracking-tight">
              Let&apos;s Start the<br/>Conversation
            </h2>
            <p className="text-gray-500 text-[15px] sm:text-[16px] leading-relaxed">
              Subheading: Whether you&apos;re planning a new facility or upgrading existing equipment, we&apos;re ready to help you find the right solution.
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-800">First Name*</label>
                  <input type="text" className="w-full border border-gray-300 bg-[#f7f9fa] rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-800">Your email*</label>
                  <input type="email" className="w-full border border-gray-300 bg-[#f7f9fa] rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-800">Subject*</label>
                  <input type="text" className="w-full border border-gray-300 bg-[#f7f9fa] rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-800">Your message (optional)</label>
                  <textarea rows={5} className="w-full border border-gray-300 bg-[#f7f9fa] rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="self-center lg:self-start mt-2 bg-[#0a2766] hover:bg-[#001f54] text-white font-medium text-[15px] py-3 px-10 rounded-[30px] transition-colors">
                  Submit Now!
                </button>
              </form>
            </div>

            {/* Right: Map (Pink Area replacement) */}
            <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] bg-pink-100/50 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0263604850785!2d77.30799797549526!3d28.47875957574884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce711f1f2e4db%3A0xc54eb8e3f42c2b77!2sSector%2027C%2C%20Faridabad%2C%20Haryana%20121003!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', inset: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Faridabad Corporate Office Map"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* Office Locations Section */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-8 lg:px-12 flex justify-center border-t border-gray-100 bg-white relative">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-12 lg:gap-24 relative z-10">
          
          {/* Location 1: Tamil Nadu */}
          <div className="w-full md:w-1/2 flex flex-col p-8 lg:p-12 border border-gray-100 shadow-sm rounded-xl bg-white relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background faint map decoration (simulated with an icon for now, ideally an SVG path) */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-700">
              <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            
            <div className="mb-8">
              <h3 className="text-[20px] font-medium text-gray-800 mb-1">India, Tamil Nadu</h3>
              <h2 className="text-[24px] font-bold text-[#0a2766]">Xcel Stiro Manufacturing Facility</h2>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Address</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  12/26, PN Road, Laxmi Nagar,<br/>
                  New Extension, Tiruppur,<br/>
                  Tamil Nadu 641602, India
                </p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Phone</h4>
                <p className="text-[14px] text-gray-600 mb-1">+91 7428087070</p>
                <p className="text-[14px] text-gray-600">+91 8438067251</p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-[14px] text-gray-600 mb-1">tirupur@xcelstiro.com</p>
                <p className="text-[14px] text-gray-600">sales@xcelstiro.com</p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Business Hours</h4>
                <p className="text-[14px] text-gray-600 mb-1">Mon – Sat: 9:30 AM – 7:00 PM</p>
                <p className="text-[14px] text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Location 2: Faridabad */}
          <div className="w-full md:w-1/2 flex flex-col p-8 lg:p-12 border border-gray-100 shadow-sm rounded-xl bg-white relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-700">
              <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>

            <div className="mb-8">
              <h3 className="text-[20px] font-medium text-gray-800 mb-1">Faridabad, Haryana</h3>
              <h2 className="text-[24px] font-bold text-[#0a2766]">Xcel Stiro Corporate Office &amp; Plant</h2>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Address</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Plot 70, Sector 27C,<br/>
                  Faridabad, Haryana 121003, India
                </p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Phone</h4>
                <p className="text-[14px] text-gray-600 mb-1">+91 129-4155713</p>
                <p className="text-[14px] text-gray-600 mb-1">+91 129-4155714</p>
                <p className="text-[14px] text-gray-600">+91 9971025730</p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-[14px] text-gray-600 mb-1">sales@xcelstiro.com</p>
                <p className="text-[14px] text-gray-600">servicing@xcelstiro.com</p>
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">Working Hours</h4>
                <p className="text-[14px] text-gray-600 mb-1">Monday – Saturday: 8:30 AM – 5:30 PM</p>
                <p className="text-[14px] text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
