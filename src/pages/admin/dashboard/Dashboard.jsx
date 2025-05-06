// src/dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';

function Dashboard() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const storedMessage = localStorage.getItem('dashboardMessage');
    if (storedMessage) {
      setMensaje(storedMessage);
      localStorage.removeItem('dashboardMessage');
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bienvenido al Dashboard</h1>

        {mensaje && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center shadow">
            {mensaje}
          </div>
        )}

        <p className="text-lg text-gray-600">Este es el área principal del Dashboard.</p>
      </main>
    </div>
  );
}

export default Dashboard;
