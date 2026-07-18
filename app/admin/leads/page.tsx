"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  contact: string;
  email: string;
  state: string;
  interest: string;
  message: string;
  submittedAt: any;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthChecking(false);
        fetchLeads();
      } else {
        router.push('/adminloginn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "contactForms"), orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedLeads: Lead[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedLeads.push({ id: doc.id, ...doc.data() } as Lead);
      });
      
      setLeads(fetchedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/adminloginn');
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#363636] font-sans">
        Authenticating...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0a2766]">Leads Dashboard</h1>
            <p className="text-[#363636] mt-1">View and manage contact form submissions</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin/products" className="text-[#32589c] hover:text-[#0a2766] font-semibold transition-colors">
              Manage Products &rarr;
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#363636]">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center text-[#363636] border border-gray-200">
            No leads found.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f3f5f8] text-[#0a2766] border-b border-gray-200 text-sm">
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Date</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Name</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Contact</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Email</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">State</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Interest</th>
                    <th className="py-4 px-6 font-semibold min-w-[200px]">Message</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-[#363636] whitespace-nowrap">
                        {lead.submittedAt?.toDate ? lead.submittedAt.toDate().toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{lead.name}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{lead.contact}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{lead.email}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{lead.state}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">
                        {lead.interest ? (
                          <span className="bg-[#e6f0ff] text-[#002d73] px-2.5 py-1 rounded-full text-xs font-medium">
                            {lead.interest}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-4 px-6 text-[#363636] line-clamp-2 max-w-xs" title={lead.message}>
                        {lead.message || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
