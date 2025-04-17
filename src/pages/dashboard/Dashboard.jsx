// src/dashboard/Dashboard.jsx
import React from 'react';
import Sidebar from '../../components/layout/Sidebar';

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bienvenido al Dashboard</h1>
        {/* Aquí puedes colocar tu contenido adicional, tablas, gráficos, etc. */}
        <p className="text-lg text-gray-600">Este es el área principal del Dashboard.</p>
      </main>
    </div>
  );
}

export default Dashboard;
