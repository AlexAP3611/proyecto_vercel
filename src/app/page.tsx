'use client';

import { useEffect, useState } from 'react';
import ContactForm from '@/components/ContactForm';
import ContactList from '@/components/ContactList';
import { Contact } from '@/lib/store';

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setContacts(data);
        }
      } catch (error) {
        console.error('Failed to fetch contacts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete contact', error);
    }
  };

  return (
    <div className="min-h-full w-full relative flex flex-col items-center pt-12 pb-24 px-4 sm:px-6 md:px-12 selection:bg-blue-200">
      
      {/* Decorative background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 -z-20"></div>
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-300/20 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-indigo-300/20 blur-[120px] -z-10 pointer-events-none"></div>

      <header className="mb-10 text-center relative z-10 w-full max-w-2xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 drop-shadow-sm mb-4 tracking-tight">
          Contacts Dashboard
        </h1>
        <p className="text-gray-500 sm:text-lg mx-auto font-medium">Manage your connections with a beautifully simple, modern interface.</p>
      </header>

      <div className="w-full flex justify-center z-10 max-w-3xl">
        <ContactForm onAdd={handleAddContact} />
      </div>

      <div className="w-full max-w-3xl mt-4 z-10">
        <ContactList 
          contacts={contacts} 
          onDelete={handleDeleteContact} 
          loading={loading}
        />
      </div>
    </div>
  );
}
