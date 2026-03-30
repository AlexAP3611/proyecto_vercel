'use client';

import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // States for the form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    // Simple basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un email válido.');
      return;
    }

    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone
    };

    console.log('--- Nuevo Contacto Agregado ---');
    console.log(newContact);

    setContacts([...contacts, newContact]);
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-8 w-full animate-in fade-in duration-500">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Contactos</h1>
          <p className="text-gray-500 mt-2 font-medium">Gestiona tu lista de contactos directamente.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-500/50 flex items-center gap-2 whitespace-nowrap"
        >
          {showForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancelar
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Agregar contacto
            </>
          )}
        </button>
      </header>

      {/* Add Contact Form (conditionally rendered) */}
      {showForm && (
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 mb-8 transition-all animate-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3">Nuevo Contacto</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Nombre <span className="text-red-500">*</span></label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email <span className="text-red-500">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800"
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-gray-900/30"
              >
                Guardar
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Contacts List */}
      <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 transition-all overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no hay contactos</h3>
            <p className="text-gray-500 font-medium">Haz clic en "Agregar contacto" para empezar a crear tu lista.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Nombre</th>
                  <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Teléfono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex justify-center items-center text-white font-bold text-sm shadow-inner shrink-0">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{contact.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{contact.email}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{contact.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
