"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowUpRight, HelpCircle, PhoneCall, ChevronRight } from "../components/icons";
import { BlogArticle } from "@/data/blogs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// XCEL Industrial Laundry FAQ Section
const LaundryFAQ = () => {
  const faqs = [
    {
      q: "How do I calculate the right laundry machine capacity for my hotel or hospital?",
      a: "Capacity is determined by multiplying total daily linen load (e.g., 2.5 kg to 4.5 kg per occupied bed/room) by daily occupancy, then dividing by operational wash shift hours (typically 8 to 10 hours) and turnaround cycle duration (45-50 minutes). XCEL provides free CAD layouts and capacity planning audits.",
    },
    {
      q: "What is the typical lifespan and maintenance frequency of XCEL machines?",
      a: "With heavy-duty Grade 304/316 stainless steel construction and Japanese-engineered drive bearings, XCEL machines are designed for a 15-20 year service life. Preventive maintenance schedules are recommended every 90 days, supported by our nationwide service technicians.",
    },
    {
      q: "Does XCEL provide nationwide installation and on-site operator training?",
      a: "Yes. XCEL maintains a pan-India technical network covering all states and union territories. Every installation includes full mechanical commissioning, electrical safety checks, and comprehensive hands-on training for your plant operators.",
    },
    {
      q: "How does high G-force extraction reduce facility energy bills?",
      a: "Machines generating 300G to 350G spin extraction remove up to 50% more residual water mechanically before linen enters the drying tumblers. Because thermal evaporation is up to 5x more energy-intensive than centrifugal spinning, high extract washers cut drying fuel/power by 30-40%.",
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] border-y border-gray-200 py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#3b5b95] text-[12px] font-bold tracking-[0.16em] uppercase mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2766] tracking-tight">
            Commercial Laundry Equipment & Planning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-start"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#0a2766] mb-3 leading-snug">
                {faq.q}
              </h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// XCEL Consultation CTA Section
const LaundryCTA = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#0a2766] via-[#1a3d82] to-[#3b5b95] text-white py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-blue-200 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            Custom Plant Engineering & Free Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ready to Upgrade or Set Up Your Commercial Laundry Facility?
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
            Speak directly with our senior application engineers for machine selection, CAD floorplans, utility calculations, and competitive project quotations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#0a2766] hover:bg-blue-50 font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <PhoneCall className="w-5 h-5 text-[#3b5b95]" />
              <span>Request Free Plant Consultation</span>
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200"
            >
              <span>Explore Machine Catalog</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function BlogsClient({ initialArticles }: { initialArticles: BlogArticle[] }) {
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const loadDynamicBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const snap = await getDocs(blogsRef);

        const dynamicList: any[] = [];
        if (!snap.empty) {
          snap.forEach((docSnap: any) => {
            const data = docSnap.data();
            if (data.status !== "draft") {
              dynamicList.push({ id: docSnap.id, ...data });
            }
          });
        }

        // Merge with initialArticles so that the 4 default articles are NEVER missing
        const existingSlugs = new Set(dynamicList.map((a: any) => a.slug?.toLowerCase().trim()));
        const missingDefaults = initialArticles.filter(
          (initArt) => !existingSlugs.has(initArt.slug?.toLowerCase().trim())
        );

        const merged = [...dynamicList, ...missingDefaults];
        merged.sort((a, b) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
          return tB - tA;
        });

        setArticles(merged);
      } catch (err) {
        console.error("Error fetching dynamic blogs from Firestore, retaining initial articles:", err);
      }
    };

    loadDynamicBlogs();
  }, [initialArticles]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172228] font-sans">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-20">
        {/* =========================================================================
            CENTERED HERO HEADER: Pill, Heading, Subheading (XCEL Brand Theme)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Pill in Centre */}
          <div className="inline-flex items-center gap-2 bg-[#3b5b95]/10 text-[#3b5b95] border border-[#3b5b95]/20 px-4 py-1.5 rounded-full text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#3b5b95] animate-pulse" />
            <span>XCEL Technical Journal & Industry Insights</span>
          </div>

          {/* Main Heading in Centre */}
          <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight text-[#0a2766] mb-4 sm:mb-5">
            Engineering Insights for Modern Laundry Facilities
          </h1>

          {/* Subheading in Centre */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#4b5563] font-normal max-w-2xl mx-auto">
            Practical guidance on <span className="font-bold text-[#0a2766]">industrial washer selection, energy-efficient drying, hospital hygiene compliance, and plant workflow engineering</span> from India&apos;s trusted laundry machine manufacturer.
          </p>
        </div>

        {/* =========================================================================
            CARDS GRID: 3-column layout matching reference structure
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {articles.map((article) => (
            <article
              key={article.id || article.slug}
              className="flex flex-col justify-between group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-gray-150 hover:border-[#3b5b95]/40 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Image Banner (1:1 Square) */}
                <Link href={`/blogs/${article.slug}`} className="block">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 bg-gray-100 border border-gray-200/60 shadow-xs">
                    <Image
                      src={article.imageSrc || "/blog1/Blog 1- 1080 x 1080.svg"}
                      alt={article.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </Link>

                {/* Category & Read Time Row */}
                <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase text-[#3b5b95] mb-3">
                  <span className="bg-[#3b5b95]/10 px-2.5 py-1 rounded-md">{article.category}</span>
                  <span className="text-gray-500 font-semibold">{article.readTime}</span>
                </div>

                {/* Article Title */}
                <h2 className="text-[1.25rem] sm:text-[1.38rem] font-bold leading-[1.3] text-[#0a2766] mb-3 group-hover:text-[#3b5b95] transition-colors">
                  <Link href={`/blogs/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-[14px] text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {article.lead}
                </p>
              </div>

              {/* Bottom Row: Date & Arrow Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <span className="text-[13px] text-gray-500 font-medium">
                  {article.date}
                </span>

                <Link
                  href={`/blogs/${article.slug}`}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-[#f8f9fa] flex items-center justify-center text-[#0a2766] group-hover:bg-[#3b5b95] group-hover:text-white group-hover:border-[#3b5b95] transition-all duration-200 shadow-xs"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FAQ Section */}
      <LaundryFAQ />

      {/* CTA Section */}
      <LaundryCTA />

      <Footer />
    </div>
  );
}
