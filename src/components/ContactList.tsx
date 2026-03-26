'use client';

import { Contact } from '@/lib/store';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  loading: boolean;
}

export default function ContactList({ contacts, onDelete, loading }: ContactListProps) {
  if (loading) {
    return (
      <div className="w-full max-w-3xl mt-12 flex justify-center pb-12">
        <div className="flex bg-white/50 backdrop-blur-md px-6 py-3 rounded-full shadow-sm text-gray-600 font-medium items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Loading contacts...
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="w-full max-w-3xl mt-12 p-10 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 text-center shadow-lg">
        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📋</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No contacts found</h3>
        <p className="text-gray-500 font-medium">Your contact list is empty. Add a new contact above to get started.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mt-12 pb-16">
      <div className="flex justify-between items-end mb-6 px-2">
        <h2 className="text-2xl font-extrabold text-gray-800">Your Contacts</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
        </span>
      </div>
      
      <ul className="flex flex-col gap-4">
        {contacts.map((contact) => (
          <li 
            key={contact.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group duration-300"
          >
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex justify-center items-center text-white font-bold text-lg shadow-inner">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">{contact.name}</p>
                <p className="text-sm font-medium text-gray-500">{contact.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => onDelete(contact.id)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all focus:ring-4 focus:ring-red-500/20 outline-none flex items-center justify-center gap-2"
              aria-label={`Delete ${contact.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
