"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, storage } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Plus, X } from 'lucide-react';

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
  categoryId: string;
  shortDescription: string;
  imageUrl: string;
  additionalImages?: string[];
  features: ProductFeature[];
  faqs: ProductFAQ[];
  whyChooseUs?: string;
  industriesServed?: string;
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

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [shortDescription, setShortDescription] = useState('');
  const [whyChooseUs, setWhyChooseUs] = useState('');
  const [industriesServed, setIndustriesServed] = useState('');
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
      } else {
        router.push('/adminloginn');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      // Sort by creation date client-side
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

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/adminloginn');
  };

  const resetForm = () => {
    setName('');
    setCategoryId(CATEGORIES[0].id);
    setShortDescription('');
    setWhyChooseUs('');
    setIndustriesServed('');
    setImageFiles([]);
    setBrochureFile(null);
    setFeatures([]);
    setFaqs([]);
    setError('');
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
    if (!name || !categoryId || !shortDescription || imageFiles.length === 0) {
      setError("Please fill all required fields and select at least one image.");
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Upload Images to Storage
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
          await uploadBytes(fileRef, file);
          return await getDownloadURL(fileRef);
        })
      );
      const imageUrl = imageUrls[0];
      const additionalImages = imageUrls.slice(1);

      // 1.5 Upload Brochure if exists
      let brochureUrl = '';
      if (brochureFile) {
        const brochureRef = ref(storage, `brochures/${Date.now()}_${brochureFile.name}`);
        await uploadBytes(brochureRef, brochureFile);
        brochureUrl = await getDownloadURL(brochureRef);
      }

      // 2. Save Product to Firestore
      const newProduct = {
        name,
        categoryId,
        shortDescription,
        whyChooseUs,
        industriesServed,
        imageUrl,
        additionalImages,
        ...(brochureUrl ? { brochureUrl } : {}),
        features: features.filter(f => f.title.trim() && f.description.trim()),
        faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "products"), newProduct);
      
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while saving the product. Remember: Firebase Storage must be fully enabled in the console to upload product images.");
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

        <div className="mb-6 flex justify-end">
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#32589c] text-white px-4 py-2 rounded shadow-md hover:bg-[#1f3a6a] transition-colors font-medium"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

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
                    <th className="py-4 px-6 font-semibold">Image</th>
                    <th className="py-4 px-6 font-semibold">Name</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Description</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain bg-white border border-gray-200 rounded" />
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                      <td className="py-4 px-6 text-gray-700">
                        {CATEGORIES.find(c => c.id === product.categoryId)?.name || product.categoryId}
                      </td>
                      <td className="py-4 px-6 text-gray-700 line-clamp-2 max-w-xs">{product.shortDescription}</td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleDelete(product.id, product.imageUrl, product.additionalImages, product.brochureUrl)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
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
              <h2 className="text-2xl font-bold text-[#0a2766]">Add New Product</h2>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" placeholder="e.g., WF-200 Washer Extractor" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none">
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                    <textarea required value={shortDescription} onChange={e => setShortDescription(e.target.value)} rows={2} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" placeholder="Brief description for the catalog page..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images * (Select multiple)</label>
                    <input type="file" required multiple accept="image/*" onChange={e => {
                      if (e.target.files) setImageFiles(Array.from(e.target.files));
                    }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e6f0ff] file:text-[#0a2766] hover:file:bg-[#d0e3ff]" />
                    {imageFiles.length > 0 && <p className="text-xs text-gray-500 mt-2">{imageFiles.length} file(s) selected.</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Brochure (PDF, optional)</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => {
                      if (e.target.files && e.target.files[0]) setBrochureFile(e.target.files[0]);
                    }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e6f0ff] file:text-[#0a2766] hover:file:bg-[#d0e3ff]" />
                    {brochureFile && <p className="text-xs text-gray-500 mt-2">Selected: {brochureFile.name}</p>}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">Why Choose Us</h3>
                  </div>
                  <textarea value={whyChooseUs} onChange={e => setWhyChooseUs(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" placeholder="Enter 'Why Choose Us' description..."></textarea>
                </div>

                {/* Industries Served */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-lg text-gray-800">Industries Served</h3>
                  </div>
                  <textarea value={industriesServed} onChange={e => setIndustriesServed(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-[#32589c] focus:border-[#32589c] outline-none" placeholder="Enter 'Industries Served' description..."></textarea>
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
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
