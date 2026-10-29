"use client";

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, storage } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Plus, X, Edit, ArrowUp, ArrowDown, ExternalLink, Layers, ArrowUpDown, Check, RotateCcw, ChevronDown } from 'lucide-react';

interface ProductFeature {
  title: string;
  description: string;
}

interface ProductFAQ {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  subheading?: string;
  categoryId: string;
  order?: number;
  slug?: string;
  customUrl?: string;
  cardDescription?: string;
  detailDescription?: string;
  shortDescription?: string;
  highlights?: string[];
  imageUrl: string;
  additionalImages?: string[];
  features: ProductFeature[];
  faqs: ProductFAQ[];
  whyChooseUs?: ProductFeature[] | string;
  industriesServed?: ProductFeature[] | string;
  brochureUrl?: string;
  createdAt: any;
}

const CATEGORIES = [
  { id: 'washing', name: 'Washing' },
  { id: 'drying', name: 'Drying' },
  { id: 'apparel-processing', name: 'Apparel Processing' },
  { id: 'dry-cleaning', name: 'Dry-Cleaning' },
  { id: 'flat-work', name: 'Flat-Work' },
  { id: 'steam-finishing', name: 'Steam-Finishing' },
  { id: 'water-heater', name: 'Water Heater' },
  { id: 'fabric-checking', name: 'Fabric Checking' },
  { id: 'other-equipment', name: 'Other Equipment' },
  { id: 'complete-range', name: 'Complete Range' }
];

const DEFAULT_CATEGORY_ORDER = [
  'washing',
  'drying',
  'apparel-processing',
  'dry-cleaning',
  'flat-work',
  'steam-finishing',
  'water-heater',
  'fabric-checking',
  'other-equipment'
];

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [orderSaveStatus, setOrderSaveStatus] = useState<string | null>(null);

  // Complete Range Category Order State
  const [categoryOrder, setCategoryOrder] = useState<string[]>(DEFAULT_CATEGORY_ORDER);
  const [isCategoryOrderModalOpen, setIsCategoryOrderModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSavingCategoryOrder, setIsSavingCategoryOrder] = useState(false);
  const [categoryOrderSaveStatus, setCategoryOrderSaveStatus] = useState<string | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    if (isCategoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [subheading, setSubheading] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [order, setOrder] = useState<number | ''>('');
  const [customUrl, setCustomUrl] = useState('');
  const [isCustomUrlEdited, setIsCustomUrlEdited] = useState(false);
  const [cardDescription, setCardDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [whyChooseUs, setWhyChooseUs] = useState<ProductFeature[]>([]);
  const [industriesServed, setIndustriesServed] = useState<ProductFeature[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingBrochure, setExistingBrochure] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [features, setFeatures] = useState<ProductFeature[]>([]);
  const [faqs, setFaqs] = useState<ProductFAQ[]>([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthChecking(false);
        fetchProducts();
        fetchCategoryOrder();
      } else {
        router.push('/adminloginn');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCategoryOrder = async () => {
    try {
      const orderDoc = await getDoc(doc(db, "settings", "categoryOrder"));
      if (orderDoc.exists()) {
        const data = orderDoc.data();
        if (Array.isArray(data?.order) && data.order.length > 0) {
          const savedOrder = data.order.filter((id: string) => id !== 'complete-range');
          const missing = DEFAULT_CATEGORY_ORDER.filter(id => !savedOrder.includes(id));
          setCategoryOrder([...savedOrder, ...missing]);
          return;
        }
      }
      setCategoryOrder(DEFAULT_CATEGORY_ORDER);
    } catch (e) {
      console.error("Error fetching category order:", e);
      setCategoryOrder(DEFAULT_CATEGORY_ORDER);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      // Sort by order ascending, then by creation date descending
      fetchedProducts.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
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

  const handleMoveProduct = async (productToMove: Product, direction: 'up' | 'down') => {
    // Get all products in the same category, sorted by current order
    const categoryProducts = products
      .filter(p => p.categoryId === productToMove.categoryId)
      .sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

    const currentIndex = categoryProducts.findIndex(p => p.id === productToMove.id);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= categoryProducts.length) return;

    const otherProduct = categoryProducts[targetIndex];
    const updatedCategoryProducts = [...categoryProducts];
    updatedCategoryProducts[currentIndex] = otherProduct;
    updatedCategoryProducts[targetIndex] = productToMove;

    const orderUpdates = updatedCategoryProducts.map((p, idx) => ({
      id: p.id,
      order: idx + 1
    }));

    // Optimistically update local state
    setProducts(prev => {
      const updated = prev.map(p => {
        const match = orderUpdates.find(u => u.id === p.id);
        return match ? { ...p, order: match.order } : p;
      });
      return updated.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
    });

    setOrderSaveStatus('Updating sequence...');
    try {
      await Promise.all(
        orderUpdates.map(({ id, order }) => 
          updateDoc(doc(db, "products", id), { order })
        )
      );
      setOrderSaveStatus('Sequence updated successfully!');
      setTimeout(() => setOrderSaveStatus(null), 2500);
    } catch (err) {
      console.error("Error updating sequence:", err);
      setOrderSaveStatus('Failed to update sequence');
      setTimeout(() => setOrderSaveStatus(null), 3000);
    }
  };

  const handleSetFirstCategory = (catId: string) => {
    if (!catId) return;
    const filtered = categoryOrder.filter(id => id !== catId);
    setCategoryOrder([catId, ...filtered]);
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categoryOrder.length) return;
    const updated = [...categoryOrder];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setCategoryOrder(updated);
  };

  const handleMoveCategoryToExtreme = (index: number, position: 'top' | 'bottom') => {
    if (position === 'top' && index === 0) return;
    if (position === 'bottom' && index === categoryOrder.length - 1) return;
    const updated = [...categoryOrder];
    const [moved] = updated.splice(index, 1);
    if (position === 'top') {
      updated.unshift(moved);
    } else {
      updated.push(moved);
    }
    setCategoryOrder(updated);
  };

  const handleResetCategoryOrder = () => {
    setCategoryOrder(DEFAULT_CATEGORY_ORDER);
  };

  const handleSaveCategoryOrder = async () => {
    setIsSavingCategoryOrder(true);
    try {
      await setDoc(doc(db, "settings", "categoryOrder"), {
        order: categoryOrder,
        updatedAt: serverTimestamp()
      }, { merge: true });

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('xcel_category_order', JSON.stringify(categoryOrder));
        } catch (e) {}
      }

      setCategoryOrderSaveStatus('Category sequence saved successfully!');
      setTimeout(() => {
        setCategoryOrderSaveStatus(null);
        setIsCategoryOrderModalOpen(false);
      }, 1200);
    } catch (err) {
      console.error("Failed to save category order:", err);
      alert("Failed to save category sequence.");
    } finally {
      setIsSavingCategoryOrder(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/adminloginn');
  };

  const resetForm = () => {
    setEditingProductId(null);
    setName('');
    setSubheading('');
    setCategoryId(CATEGORIES[0].id);
    setOrder('');
    setCustomUrl('');
    setIsCustomUrlEdited(false);
    setCardDescription('');
    setDetailDescription('');
    setHighlights([]);
    setWhyChooseUs([]);
    setIndustriesServed([]);
    setExistingImages([]);
    setExistingBrochure(null);
    setImageFiles([]);
    setBrochureFile(null);
    setFeatures([]);
    setFaqs([]);
    setError('');
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setSubheading(product.subheading || '');
    setCategoryId(product.categoryId);
    setOrder(typeof product.order === 'number' ? product.order : '');
    const currentUrl = product.customUrl || product.slug || '';
    setCustomUrl(currentUrl);
    setIsCustomUrlEdited(Boolean(currentUrl));
    setCardDescription(product.cardDescription || product.shortDescription || '');
    setDetailDescription(product.detailDescription || product.shortDescription || '');
    setHighlights(Array.isArray(product.highlights) ? product.highlights : []);
    setWhyChooseUs(Array.isArray(product.whyChooseUs) ? product.whyChooseUs : []);
    setIndustriesServed(Array.isArray(product.industriesServed) ? product.industriesServed : []);
    setExistingImages([product.imageUrl, ...(product.additionalImages || [])].filter(Boolean));
    setExistingBrochure(product.brochureUrl || null);
    setFeatures(product.features || []);
    setFaqs(product.faqs || []);
    setImageFiles([]); // Clear any previously selected files
    setBrochureFile(null);
    setError('');
    setIsModalOpen(true);
  };

  const generateSlugFromName = (input: string) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!isCustomUrlEdited) {
      setCustomUrl(generateSlugFromName(newName));
    }
  };

  const handleAddHighlight = () => setHighlights([...highlights, '']);
  const handleRemoveHighlight = (index: number) => setHighlights(highlights.filter((_, i) => i !== index));
  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const handleAddWhyChooseUs = () => setWhyChooseUs([...whyChooseUs, { title: '', description: '' }]);
  const handleRemoveWhyChooseUs = (index: number) => setWhyChooseUs(whyChooseUs.filter((_, i) => i !== index));
  const handleWhyChooseUsChange = (index: number, field: keyof ProductFeature, value: string) => {
    const newItems = [...whyChooseUs];
    newItems[index][field] = value;
    setWhyChooseUs(newItems);
  };

  const handleAddIndustries = () => setIndustriesServed([...industriesServed, { title: '', description: '' }]);
  const handleRemoveIndustries = (index: number) => setIndustriesServed(industriesServed.filter((_, i) => i !== index));
  const handleIndustriesChange = (index: number, field: keyof ProductFeature, value: string) => {
    const newItems = [...industriesServed];
    newItems[index][field] = value;
    setIndustriesServed(newItems);
  };

  const handleAddFeature = () => setFeatures([...features, { title: '', description: '' }]);
  const handleRemoveFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const handleFeatureChange = (index: number, field: keyof ProductFeature, value: string) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const handleAddFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const handleRemoveFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const handleFaqChange = (index: number, field: keyof ProductFAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !detailDescription.trim()) {
      setError("Please fill all required fields (Name, Category, and Detail Description).");
      return;
    }

    if (!editingProductId && imageFiles.length === 0 && existingImages.length === 0) {
      setError("Please select at least one image for the product.");
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      let newImageUrls: string[] = [];
      let finalBrochureUrl = existingBrochure || '';

      // Upload new images if any are selected
      if (imageFiles.length > 0) {
        newImageUrls = await Promise.all(
          imageFiles.map(async (file) => {
            const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            return await getDownloadURL(fileRef);
          })
        );
      }

      const allImages = [...existingImages, ...newImageUrls];
      if (allImages.length === 0) {
        setError("Please provide at least one image.");
        setIsSubmitting(false);
        return;
      }
      
      const imageUrl = allImages[0];
      const additionalImages = allImages.slice(1);

      // Upload Brochure if exists
      if (brochureFile) {
        const brochureRef = ref(storage, `brochures/${Date.now()}_${brochureFile.name}`);
        await uploadBytes(brochureRef, brochureFile);
        finalBrochureUrl = await getDownloadURL(brochureRef);
      }

      const productData: any = {
        name,
        subheading,
        categoryId,
        cardDescription: subheading.trim(),
        detailDescription: detailDescription.trim(),
        shortDescription: subheading.trim(), // Kept for backwards compatibility
        highlights: highlights.map(h => h.trim()).filter(Boolean),
        whyChooseUs: whyChooseUs.filter(f => f.title.trim() && f.description.trim()),
        industriesServed: industriesServed.filter(f => f.title.trim() && f.description.trim()),
        features: features.filter(f => f.title.trim() && f.description.trim()),
        faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
        imageUrl,
        additionalImages
      };

      const cleanedSlug = customUrl
        .trim()
        .replace(/^\/+|\/+$/g, '')
        .replace(/^product\//, '')
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-');

      if (cleanedSlug) {
        productData.slug = cleanedSlug;
        productData.customUrl = customUrl.trim();
      } else {
        productData.slug = '';
        productData.customUrl = '';
      }

      if (finalBrochureUrl) {
        productData.brochureUrl = finalBrochureUrl;
      } else {
        productData.brochureUrl = ""; // clear if removed
      }

      if (editingProductId) {
        // Update Product
        if (order !== '') {
          productData.order = Number(order);
        }
        productData.updatedAt = serverTimestamp();
        await updateDoc(doc(db, "products", editingProductId), productData);
      } else {
        // Save New Product
        const categoryProducts = products.filter(p => p.categoryId === categoryId);
        productData.order = order !== '' ? Number(order) : categoryProducts.length + 1;
        productData.createdAt = serverTimestamp();
        await addDoc(collection(db, "products"), productData);
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string, imageUrl: string, additionalImages?: string[], brochureUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, "products", productId));
      
      // Delete images and brochure from Storage
      const allFiles = [imageUrl, ...(additionalImages || []), brochureUrl].filter(Boolean);
      
      for (const fileUrl of allFiles) {
        if (!fileUrl) continue;
        try {
          const pathStart = fileUrl.indexOf('/o/') + 3;
          const pathEnd = fileUrl.indexOf('?alt=media');
          if (pathStart > 2 && pathEnd > -1) {
            const filePath = decodeURIComponent(fileUrl.substring(pathStart, pathEnd));
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
          }
        } catch (storageErr) {
          console.warn("Could not delete file from storage:", storageErr);
        }
      }
      
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  if (authChecking) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Authenticating...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0a2766]">Products Dashboard</h1>
            <p className="text-[#363636] mt-1">Manage your product catalog</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin/leads" className="text-[#32589c] hover:text-[#0a2766] font-semibold transition-colors">
              &larr; Back to Leads
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Filter Category:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-[#32589c]"
              >
                <option value="all">All Categories ({products.length})</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({products.filter(p => p.categoryId === cat.id).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Complete Range Category Sequence Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`border rounded px-3 py-1.5 text-sm font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xs ${
                  isCategoryDropdownOpen 
                    ? 'border-[#0a2766] bg-blue-50 text-[#0a2766] ring-2 ring-[#0a2766]/15' 
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                }`}
                title="Change category display sequence for Complete Range"
              >
                <Layers size={15} className="text-[#32589c]" />
                <span className="text-gray-700">Complete Range Order:</span>
                <span className="font-bold text-[#0a2766] bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                  1st: {CATEGORIES.find(c => c.id === categoryOrder[0])?.name || categoryOrder[0]}
                </span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Popover */}
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[340px] sm:w-[390px] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-bold text-sm text-[#0a2766] flex items-center gap-1.5">
                        <Layers size={16} className="text-[#32589c]" />
                        Complete Range Sequence
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Controls which category appears 1st, 2nd, etc. in Complete Range
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Quick Select: Which category to display 1st */}
                  <div className="mt-3 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg">
                    <label className="block text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                      Display First (1st Position)
                    </label>
                    <select
                      value={categoryOrder[0]}
                      onChange={(e) => handleSetFirstCategory(e.target.value)}
                      className="w-full bg-white border border-amber-300 rounded px-2.5 py-1.5 text-xs font-bold text-[#0a2766] focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                    >
                      {categoryOrder.map((catId) => (
                        <option key={catId} value={catId}>
                          {CATEGORIES.find(c => c.id === catId)?.name || catId} ({products.filter(p => p.categoryId === catId).length} products)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Full Reorderable Category List */}
                  <div className="mt-3 max-h-[250px] overflow-y-auto space-y-1.5 pr-1">
                    {categoryOrder.map((catId, index) => {
                      const name = CATEGORIES.find(c => c.id === catId)?.name || catId;
                      const prodCount = products.filter(p => p.categoryId === catId).length;
                      const isFirst = index === 0;
                      const isLast = index === categoryOrder.length - 1;

                      return (
                        <div
                          key={catId}
                          className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                            isFirst 
                              ? 'bg-amber-50/90 border-amber-200 shadow-2xs' 
                              : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              isFirst ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                              #{index + 1}
                            </span>
                            <span className={`font-semibold truncate ${isFirst ? 'text-amber-950 font-bold' : 'text-gray-800'}`}>
                              {name}
                            </span>
                            <span className="text-[10px] text-gray-400 shrink-0">
                              ({prodCount})
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={isFirst}
                              onClick={() => handleMoveCategory(index, 'up')}
                              className={`p-1 rounded border transition-colors ${
                                isFirst
                                  ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-white/50'
                                  : 'border-gray-200 text-gray-700 hover:text-[#0a2766] hover:bg-white cursor-pointer'
                              }`}
                              title="Move Up"
                            >
                              <ArrowUp size={12} strokeWidth={2.5} />
                            </button>
                            <button
                              type="button"
                              disabled={isLast}
                              onClick={() => handleMoveCategory(index, 'down')}
                              className={`p-1 rounded border transition-colors ${
                                isLast
                                  ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-white/50'
                                  : 'border-gray-200 text-gray-700 hover:text-[#0a2766] hover:bg-white cursor-pointer'
                              }`}
                              title="Move Down"
                            >
                              <ArrowDown size={12} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {categoryOrderSaveStatus && (
                    <div className="mt-3 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-center animate-pulse">
                      {categoryOrderSaveStatus}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleResetCategoryOrder}
                      className="text-[11px] font-semibold text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      Reset Default
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCategoryOrder}
                      disabled={isSavingCategoryOrder}
                      className="bg-[#0a2766] hover:bg-[#123985] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
                    >
                      {isSavingCategoryOrder ? 'Saving...' : 'Save Sequence'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {orderSaveStatus && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 animate-pulse">
                {orderSaveStatus}
              </span>
            )}
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#32589c] text-white px-4 py-2 rounded shadow-md hover:bg-[#1f3a6a] transition-colors font-medium self-end sm:self-auto cursor-pointer"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

        {selectedCategoryFilter === 'complete-range' && (
          <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#0a2766]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0a2766] text-white flex items-center justify-center shrink-0">
                <Layers size={15} />
              </div>
              <div>
                <span className="font-bold">Complete Range Mode:</span> Showing all products ordered by your configured category sequence.
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsCategoryDropdownOpen(true)}
              className="font-bold text-[#32589c] hover:text-[#0a2766] hover:underline cursor-pointer shrink-0 inline-flex items-center gap-1"
            >
              Change Category Order &rarr;
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-[#363636]">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center text-[#363636] border border-gray-200">
            No products found. Click "Add New Product" to create one.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f3f5f8] text-[#0a2766] border-b border-gray-200 text-sm">
                    <th className="py-4 px-4 font-semibold text-center w-28">Sequence</th>
                    <th className="py-4 px-4 font-semibold">Image</th>
                    <th className="py-4 px-6 font-semibold">Name</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Descriptions</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {(selectedCategoryFilter === 'all' 
                    ? products 
                    : selectedCategoryFilter === 'complete-range'
                    ? [...products].sort((a, b) => {
                        const orderA = categoryOrder.indexOf(a.categoryId);
                        const orderB = categoryOrder.indexOf(b.categoryId);
                        const effectiveOrderA = orderA === -1 ? 999 : orderA;
                        const effectiveOrderB = orderB === -1 ? 999 : orderB;
                        if (effectiveOrderA !== effectiveOrderB) {
                          return effectiveOrderA - effectiveOrderB;
                        }
                        const pOrderA = typeof a.order === 'number' ? a.order : 9999;
                        const pOrderB = typeof b.order === 'number' ? b.order : 9999;
                        if (pOrderA !== pOrderB) return pOrderA - pOrderB;
                        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                        return timeB - timeA;
                      })
                    : products.filter(p => p.categoryId === selectedCategoryFilter)
                  ).map((product) => {
                    const categoryProducts = products.filter(p => p.categoryId === product.categoryId);
                    const indexInCat = categoryProducts.findIndex(p => p.id === product.id);
                    const isFirst = indexInCat === 0;
                    const isLast = indexInCat === categoryProducts.length - 1;

                    return (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                            <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                              indexInCat === 0 
                                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                                : 'bg-blue-50 text-[#0a2766]'
                            }`}>
                              #{indexInCat + 1}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                type="button"
                                disabled={isFirst}
                                onClick={() => handleMoveProduct(product, 'up')}
                                className={`p-0.5 rounded transition-colors ${
                                  isFirst 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-600 hover:text-[#0a2766] hover:bg-blue-100 cursor-pointer'
                                }`}
                                title="Move Up (Display Earlier)"
                              >
                                <ArrowUp size={13} strokeWidth={2.5} />
                              </button>
                              <button
                                type="button"
                                disabled={isLast}
                                onClick={() => handleMoveProduct(product, 'down')}
                                className={`p-0.5 rounded transition-colors ${
                                  isLast 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-600 hover:text-[#0a2766] hover:bg-blue-100 cursor-pointer'
                                }`}
                                title="Move Down (Display Later)"
                              >
                                <ArrowDown size={13} strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain bg-white border border-gray-200 rounded" />
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">
                          <div className="font-semibold text-gray-900">{product.name}</div>
                          <div className="mt-1">
                            <a 
                              href={`/product/${product.slug || product.id}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#0a2766] hover:text-[#32589c] hover:underline font-mono bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200 transition-colors"
                              title="Preview product page"
                            >
                              <ExternalLink size={11} className="text-[#32589c]" />
                              /product/{product.slug || product.id}
                            </a>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {CATEGORIES.find(c => c.id === product.categoryId)?.name || product.categoryId}
                        </td>
                        <td className="py-4 px-6 text-gray-700 max-w-xs space-y-1">
                          {product.subheading && (
                            <div>
                              <span className="inline-block text-[10px] font-bold text-[#0a2766] bg-blue-50 px-1.5 py-0.5 rounded mr-1">Subheading</span>
                              <span className="text-xs text-gray-800 line-clamp-1">{product.subheading}</span>
                            </div>
                          )}
                          <div>
                            <span className="inline-block text-[10px] font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded mr-1">Detail</span>
                            <span className="text-xs text-gray-600 line-clamp-1">{product.detailDescription || product.shortDescription || '-'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="text-[#32589c] hover:text-[#1f3a6a] p-2 rounded-full hover:bg-blue-50 transition-colors mr-2 cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id, product.imageUrl, product.additionalImages, product.brochureUrl)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-2xl font-bold text-[#0a2766]">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={e => handleNameChange(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" 
                        placeholder="e.g., WF-200 Washer Extractor" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none">
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Order <span className="text-xs text-gray-500">(#1 displays first)</span>
                      </label>
                      <input 
                        type="number" 
                        min="1" 
                        value={order} 
                        onChange={e => setOrder(e.target.value === '' ? '' : parseInt(e.target.value))} 
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" 
                        placeholder="e.g. 1 (auto-assigned if blank)" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subheading <span className="text-xs font-normal text-gray-500">(Displayed on cards)</span>
                      </label>
                      <input type="text" value={subheading} onChange={e => setSubheading(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" placeholder="e.g., Heavy Duty Automatic" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Page URL (Slug) <span className="text-xs text-gray-500">(Auto-generated from name)</span>
                        </label>
                        {isCustomUrlEdited && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomUrl(generateSlugFromName(name));
                              setIsCustomUrlEdited(false);
                            }}
                            className="text-[11px] text-[#32589c] hover:underline hover:text-[#1f3a6a] font-medium"
                          >
                            Reset to name slug
                          </button>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs font-mono">
                          /product/
                        </span>
                        <input 
                          type="text" 
                          value={customUrl} 
                          onChange={e => {
                            setCustomUrl(e.target.value);
                            setIsCustomUrlEdited(true);
                          }} 
                          className="w-full border border-gray-300 rounded-r-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none font-mono text-xs" 
                          placeholder="e.g., commercial-barrier-washer" 
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Accessible at: <span className="font-mono text-[#0a2766]">/product/{customUrl.trim().replace(/^\/+|\/+$/g, '').replace(/^product\//, '').toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-') || (editingProductId || 'auto-id')}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Description * <span className="text-xs font-normal text-gray-500">(Displayed on the product detail page)</span>
                    </label>
                    <textarea 
                      required 
                      value={detailDescription} 
                      onChange={e => setDetailDescription(e.target.value)} 
                      rows={4} 
                      className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" 
                      placeholder="Detailed overview for the product page (supports multiple paragraphs and **bold** text)..."
                    />
                  </div>

                  {/* Highlighted Lines */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Highlighted Lines <span className="text-xs font-normal text-gray-500">(Displayed in bold dark blue below description)</span>
                      </label>
                      <button 
                        type="button" 
                        onClick={handleAddHighlight} 
                        className="text-xs sm:text-sm text-[#0a2766] font-semibold hover:bg-blue-100 flex items-center gap-1 bg-[#eaf0ff] px-2.5 py-1 rounded-md transition-colors"
                      >
                        <Plus size={14} /> Add Highlight Line
                      </button>
                    </div>
                    
                    {highlights.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No highlighted lines added yet. Click &apos;+ Add Highlight Line&apos; to add one.</p>
                    ) : (
                      <div className="space-y-2">
                        {highlights.map((item, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input 
                              type="text" 
                              placeholder={`Highlighted line #${idx + 1} (e.g., Heavy duty industrial suspension system)`} 
                              value={item} 
                              onChange={e => handleHighlightChange(idx, e.target.value)} 
                              className="flex-1 border border-gray-300 rounded-md p-2 text-sm font-bold text-[#0a2766] outline-none focus:ring-1 focus:ring-[#0a2766] focus:border-[#0a2766]" 
                            />
                            <button 
                              type="button" 
                              onClick={() => handleRemoveHighlight(idx)} 
                              className="text-gray-400 hover:text-red-500 p-2 rounded-md hover:bg-red-50 transition-colors shrink-0"
                              title="Remove Line"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingProductId ? 'Manage Product Images *' : 'Product Images * (Select multiple)'}
                    </label>

                    {existingImages.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        {existingImages.map((imgUrl, idx) => (
                          <div key={idx} className="relative w-20 h-20 border border-gray-200 rounded-md overflow-hidden group bg-white shadow-sm">
                            <img src={imgUrl} alt="Product preview" className="w-full h-full object-contain p-1" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))} className="text-white hover:text-red-400 p-2" title="Remove Image">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <input type="file" required={!editingProductId && existingImages.length === 0} multiple accept="image/*" onChange={e => {
                      if (e.target.files) setImageFiles(Array.from(e.target.files));
                    }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e6f0ff] file:text-[#0a2766] hover:file:bg-[#d0e3ff]" />
                    {imageFiles.length > 0 && <p className="text-xs text-[#0a2766] mt-2 font-medium">Ready to upload {imageFiles.length} new file(s).</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Brochure (PDF, optional)</label>
                    
                    {existingBrochure && !brochureFile && (
                      <div className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="text-sm font-medium text-[#0a2766] truncate max-w-[200px] sm:max-w-[300px]">Existing Brochure Attached</span>
                        </div>
                        <button type="button" onClick={() => setExistingBrochure(null)} className="text-red-500 hover:text-red-700 bg-white shadow-sm p-1.5 rounded-md border border-gray-200 transition-colors" title="Remove Brochure">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}

                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setBrochureFile(e.target.files[0]);
                        setExistingBrochure(null); // Clear existing if new selected
                      }
                    }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e6f0ff] file:text-[#0a2766] hover:file:bg-[#d0e3ff]" />
                    {brochureFile && <p className="text-xs text-[#0a2766] mt-2 font-medium">Selected: {brochureFile.name}</p>}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">Why Choose Us</h3>
                    <button type="button" onClick={handleAddWhyChooseUs} className="text-sm text-[#32589c] font-medium hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add Item
                    </button>
                  </div>
                  
                  {whyChooseUs.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No items added. Click 'Add Item' to start.</p>
                  ) : (
                    <div className="space-y-4">
                      {whyChooseUs.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-md border border-gray-100 relative group">
                          <div className="flex-1 space-y-3">
                            <input type="text" placeholder="Title (e.g., Multiple Capacities)" value={item.title} onChange={e => handleWhyChooseUsChange(idx, 'title', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                            <textarea placeholder="Description" value={item.description} onChange={e => handleWhyChooseUsChange(idx, 'description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                          </div>
                          <button type="button" onClick={() => handleRemoveWhyChooseUs(idx)} className="text-red-400 hover:text-red-600 mt-2">
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Industries Served */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">Industries Served</h3>
                    <button type="button" onClick={handleAddIndustries} className="text-sm text-[#32589c] font-medium hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add Industry
                    </button>
                  </div>
                  
                  {industriesServed.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No industries added. Click 'Add Industry' to start.</p>
                  ) : (
                    <div className="space-y-4">
                      {industriesServed.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-md border border-gray-100 relative group">
                          <div className="flex-1 space-y-3">
                            <input type="text" placeholder="Industry Name (e.g., Healthcare)" value={item.title} onChange={e => handleIndustriesChange(idx, 'title', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                            <textarea placeholder="Description" value={item.description} onChange={e => handleIndustriesChange(idx, 'description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                          </div>
                          <button type="button" onClick={() => handleRemoveIndustries(idx)} className="text-red-400 hover:text-red-600 mt-2">
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">Key Features</h3>
                    <button type="button" onClick={handleAddFeature} className="text-sm text-[#32589c] font-medium hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                  
                  {features.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No features added. Click 'Add Feature' to start.</p>
                  ) : (
                    <div className="space-y-4">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-md border border-gray-100 relative group">
                          <div className="flex-1 space-y-3">
                            <input type="text" placeholder="Feature Title (e.g., High-Capacity)" value={feature.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                            <textarea placeholder="Feature Description" value={feature.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                          </div>
                          <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-400 hover:text-red-600 mt-2">
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FAQs */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">FAQs</h3>
                    <button type="button" onClick={handleAddFaq} className="text-sm text-[#32589c] font-medium hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add FAQ
                    </button>
                  </div>
                  
                  {faqs.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No FAQs added. Click 'Add FAQ' to start.</p>
                  ) : (
                    <div className="space-y-4">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-md border border-gray-100 relative group">
                          <div className="flex-1 space-y-3">
                            <input type="text" placeholder="Question" value={faq.question} onChange={e => handleFaqChange(idx, 'question', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                            <textarea placeholder="Answer" value={faq.answer} onChange={e => handleFaqChange(idx, 'answer', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 outline-none focus:border-[#32589c]" />
                          </div>
                          <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-400 hover:text-red-600 mt-2">
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 shrink-0 bg-white flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="product-form"
                disabled={isSubmitting}
                className="px-6 py-2 rounded bg-[#0a2766] text-white font-medium hover:bg-[#071b4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? 'Saving...' : (editingProductId ? 'Update Product' : 'Save Product')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
