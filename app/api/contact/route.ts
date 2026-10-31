import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, email, state, message, interest, acceptedPolicy, source } = body;

    // Validate name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your name' }, { status: 400 });
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return NextResponse.json({ error: 'Name can contain only characters and spaces' }, { status: 400 });
    }

    // Validate contact
    if (!contact || typeof contact !== 'string' || contact.replace(/\D/g, '').length !== 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Validate state
    if (!state || typeof state !== 'string') {
      return NextResponse.json({ error: 'Please select your State/UT' }, { status: 400 });
    }

    // Save lead to Firestore
    const docRef = await addDoc(collection(db, "contactForms"), {
      name: name.trim(),
      contact: contact.replace(/\D/g, '').slice(0, 10),
      email: email.trim().toLowerCase(),
      state: state.trim(),
      message: (message || '').trim(),
      interest: interest || 'General Enquiry',
      source: source || 'Contact Form',
      acceptedPolicy: Boolean(acceptedPolicy),
      submittedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Error submitting contact form via API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

