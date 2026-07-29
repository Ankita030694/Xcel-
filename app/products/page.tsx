"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const categories = [
  { id: 'washing', title: 'Washing', icon: '/New Icons/1.png' },
  { id: 'drying', title: 'Drying', icon: '/New Icons/2.png' },
  { id: 'apparel-processing', title: 'Apparel Processing', icon: '/New Icons/3.png' },
  { id: 'dry-cleaning', title: 'Dry-Cleaning', icon: '/New Icons/4.png' },
  { id: 'flat-work', title: 'Flat-Work', icon: '/New Icons/5.png' },
  { id: 'steam-finishing', title: 'Steam-Finishing', icon: '/New Icons/6.png' },
  { id: 'water-heater', title: 'Water Heater', icon: '/New Icons/7.png' },
  { id: 'fabric-checking', title: 'Fabric Checking', icon: '/New Icons/8.png' },
  { id: 'other-equipment', title: 'Other Equipment', icon: '/New Icons/9.png' },
  { id: 'complete-range', title: 'Complete Range', icon: '/New Icons/10.png' }
];

const FALLBACK_PRODUCTS: Record<string, any[]> = {
  'washing': [
    { id: 'fallback-1', name: 'Washer Extractors', imageUrl: '/prod.final/Washing 1.png', categoryId: 'washing', shortDescription: 'Built for heavy loads. Engineered for excellence.' },
    { id: 'fallback-2', name: 'Front Loading Washing Machines', imageUrl: '/prod.png/Washing Front 60 kg Left View 1.png', categoryId: 'washing', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'drying': [
    { id: 'fallback-3', name: 'Drying Tumblers', imageUrl: '/prod.final/Drying 1.png', categoryId: 'drying', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'apparel-processing': [
    { id: 'fallback-4', name: 'Apparel Washing Machines', imageUrl: '/prod.final/Apparel Washing 1.png', categoryId: 'apparel-processing', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'dry-cleaning': [
    { id: 'fallback-5', name: 'Perc Dry Cleaning Machines', imageUrl: '/prod.final/Dry-Cleaning 1.png', categoryId: 'dry-cleaning', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'flat-work': [
    { id: 'fallback-6', name: 'Flat Work Ironers', imageUrl: '/prod.final/Flat-Work 1.png', categoryId: 'flat-work', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'steam-finishing': [
    { id: 'fallback-7', name: 'Steam Finishing Equipment', imageUrl: '/prod.final/Steam-Finishing 1.png', categoryId: 'steam-finishing', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'water-heater': [
    { id: 'fallback-8', name: 'Industrial Water Heaters', imageUrl: '/prod.final/Water Heater 1.png', categoryId: 'water-heater', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'fabric-checking': [
    { id: 'fallback-9', name: 'Fabric Checking Machines', imageUrl: '/prod.final/Fabric Checking 1.png', categoryId: 'fabric-checking', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'other-equipment': [
    { id: 'fallback-10', name: 'Ancillary Equipment', imageUrl: '/prod.final/Other Equipment 1.png', categoryId: 'other-equipment', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ],
  'complete-range': [
    { id: 'fallback-11', name: 'Complete Laundry Setup', imageUrl: '/prod.final/Complete Range 1.png', categoryId: 'complete-range', shortDescription: 'Built for heavy loads. Engineered for excellence.' }
  ]
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('washing');
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by creation date
        fetchedProducts.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        if (categories.some(c => c.id === id)) {
          setActiveTab(id);
          const element = document.getElementById('products-section');
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset scroll and dot index when category changes
  useEffect(() => {
    setActiveDotIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];
  let activeCategoryProducts = products.filter(p => p.categoryId === activeCategory.id);
  
  if (activeCategoryProducts.length === 0) {
    activeCategoryProducts = FALLBACK_PRODUCTS[activeCategory.id] || [];
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    if (activeCategoryProducts.length > 0) {
      const itemWidth = container.scrollWidth / activeCategoryProducts.length;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeDotIndex && newIndex >= 0 && newIndex < activeCategoryProducts.length) {
        setActiveDotIndex(newIndex);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      {/* Hero Banner Section */}
      <section className="w-full bg-[#f3f5f8]">
         <img 
           src="/Desktop%20-%20Product%20Overview%20Banner%20(1600%20x%20600%20px).svg" 
           alt="Product Overview - From Washing To Finishing" 
           className="w-full h-auto block"
           style={{ aspectRatio: '1600/600' }}
         />
      </section>

      {/* Products Content */}
      <section id="products-section" className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-16 lg:pb-24 flex flex-col items-center scroll-mt-[100px]">
        
        {/* Header Texts */}
        <div className="flex flex-col items-center text-center mb-10 w-full">
          <h4 className="flex items-center justify-center gap-2 text-[#3b5b95] font-bold text-[11px] md:text-[10px] lg:text-sm tracking-[0.2em] uppercase mb-4">
            <span className="animate-pulse">{"//"}</span> OUR PRODUCT CATEGORIES
          </h4>
          <h2 className="text-[13px] sm:text-[21px] lg:text-[27px] font-bold text-[#0a2766] font-serif mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Complete Solutions for Every Laundry Need
          </h2>
          <div className="w-16 h-[2px] bg-[#3b5b95]"></div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full mb-8 lg:mb-12">
          <div className="flex flex-wrap justify-center items-center gap-y-1 sm:gap-y-2 lg:border-b lg:border-gray-200 px-0 sm:px-2">
            {categories.map((cat, index) => {
              const isActive = activeTab === cat.id;
              return (
                <div key={cat.id} className="flex items-center">
                  <button
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-1 sm:px-2 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-4 text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold uppercase tracking-normal lg:tracking-wider transition-all ${
                      isActive 
                        ? 'text-[#0a2766] border-b-[2px] lg:border-b-[2.5px] border-[#3b5b95] lg:border-[#0a2766]' 
                        : 'text-[#363636] border-b-[2px] lg:border-b-[2.5px] border-transparent hover:text-gray-800'
                    }`}
                  >
                    {cat.title}
                  </button>
                  {/* Vertical separator on mobile */}
                  {index !== categories.length - 1 && (
                    <div className="h-3 w-[1px] bg-gray-300 mx-[2px] sm:mx-1 lg:hidden"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Header */}
        <div className="w-full flex justify-start items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 lg:h-6 bg-[#3b5b95]"></div>
            <h2 className="text-[#0a2766] font-bold text-[16px] lg:text-[22px] uppercase tracking-wide">
              {activeCategory.title}
            </h2>
          </div>
        </div>

        {/* Product Carousel (Mobile) / Grid (Desktop) */}
        {loading ? (
          <div className="w-full text-center py-12 text-gray-500">Loading products...</div>
        ) : activeCategoryProducts.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
            No products available in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full pb-8">
            {activeCategoryProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-row lg:flex-col group cursor-pointer h-[160px] sm:h-[180px] lg:h-full">
                
                {/* Product Image */}
                <div className="w-[45%] lg:w-full h-full lg:h-[260px] bg-[#f8f9fa] lg:bg-white p-3 lg:p-6 relative flex items-center justify-center flex-shrink-0 lg:border-b lg:border-gray-50">
                  <img 
                    src={product.imageUrl || '/placeholder.png'} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply lg:mix-blend-normal" 
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 p-4 lg:p-6 text-left">
                  <h3 className="text-[12px] lg:text-[15px] font-extrabold text-[#0a2766] uppercase mb-1.5 lg:mb-3 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[10px] lg:text-[13px] text-[#363636] leading-relaxed flex-1 line-clamp-2 lg:line-clamp-2">
                    {product.shortDescription}
                  </p>
                  
                  {/* Arrow Button */}
                  <div className="w-full flex justify-end mt-2 lg:mt-5">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full border border-[#3b5b95] flex items-center justify-center text-[#3b5b95] group-hover:bg-[#3b5b95] group-hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
