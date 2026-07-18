"use client";

import { useState } from "react";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../lib/firebase";

export default function TestStorage() {
  const [status, setStatus] = useState<string>("Waiting to test...");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleTest = async () => {
    setStatus("Testing...");
    setErrorMsg("");
    
    try {
      const storageRef = ref(storage, "test-folder/test-file.txt");
      // Try to upload a simple string
      await uploadString(storageRef, "Hello World from Test Script!");
      
      setStatus("✅ SUCCESS: Storage is enabled and you have write access!");
    } catch (error: any) {
      console.error(error);
      setStatus("❌ FAILED: Storage test failed.");
      setErrorMsg(error.message || "Unknown error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-[#0a2766] mb-4">Storage Diagnostics</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Click the button below to attempt a test upload to Firebase Storage. This will verify if the Storage bucket is active and if the security rules allow uploads.
        </p>
        
        <button 
          onClick={handleTest}
          className="bg-[#32589c] text-white px-6 py-3 rounded font-medium hover:bg-[#1f3a6a] transition-colors mb-6"
        >
          Run Storage Test
        </button>
        
        <div className="mt-4 p-4 rounded bg-gray-100 text-left border border-gray-300">
          <p className="font-semibold text-gray-800">Status:</p>
          <p className={`mt-1 font-medium ${status.includes("SUCCESS") ? "text-green-600" : status.includes("FAILED") ? "text-red-600" : "text-gray-600"}`}>
            {status}
          </p>
          
          {errorMsg && (
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Error Details:</p>
              <code className="block mt-1 p-2 bg-gray-800 text-red-400 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                {errorMsg}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
