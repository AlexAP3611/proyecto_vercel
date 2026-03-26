'use client';

import { useState } from 'react';
import { Contact } from '@/lib/store';

export default function ContactForm({ onAdd }: { onAdd: (contact: Contact) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      if (res.ok) {
        const newContact = await res.json();
        onAdd(newContact);
        setName('');
        setEmail('');
      }
    } catch (error) {
      console.error('Failed to add contact', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl border border-white/40 p-7 rounded-3xl shadow-2xl flex flex-col gap-5 w-full max-w-md transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">New Contact</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
        <input 
          id="name"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
          placeholder="e.g. Jane Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
        <input 
          id="email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
          placeholder="e.g. jane@example.com"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center transform hover:-translate-y-0.5"
      >
        {loading ? (
          <span className="animate-pulse">Saving...</span>
        ) : (
          'Add Contact'
        )}
      </button>
    </form>
  );
}
