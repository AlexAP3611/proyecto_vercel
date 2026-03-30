'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('--- Configuración Guardada ---');
    console.log('Perfil:', profile);
    console.log('Tema:', theme);
    console.log('Notificaciones:', notifications);
    alert('Cambios guardados. Revisa la consola.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 w-full animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ajustes</h1>
        <p className="text-gray-500 mt-2 font-medium">Gestiona las preferencias y configuración de tu cuenta.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 transition-all hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Perfil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Nombre</label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email</label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800"
                placeholder="tu@email.com"
              />
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 transition-all hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
            </svg>
            Preferencias
          </h2>
          <div>
            <label htmlFor="theme" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Tema de la aplicación</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium cursor-pointer"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 flex items-center justify-between transition-all hover:shadow-md">
          <div className="flex gap-4 items-center">
            <div className="bg-purple-100 p-2.5 rounded-full text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Notificaciones</h2>
              <p className="text-sm text-gray-500 font-medium mt-0.5">Recibir alertas y correos sobre actividad de la cuenta.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
          </label>
        </section>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-gray-900/30"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
