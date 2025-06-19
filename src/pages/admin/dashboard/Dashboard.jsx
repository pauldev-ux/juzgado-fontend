import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import { AcademicCapIcon } from '@heroicons/react/24/outline'; 

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
    <div className="flex min-h-screen bg-[#E8D9C1] dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-8 flex flex-col items-center justify-start bg-[#E8D9C1] dark:bg-gray-800 shadow-lg rounded-lg transition-all duration-300">
        {/* Panel principal */}
        <div className="bg-[#E8D9C1] dark:bg-gray-700 shadow-lg rounded-lg w-full max-w-4xl p-8 transition-all duration-300">
          <div className="flex items-center justify-center mb-6">
            <AcademicCapIcon className="w-10 h-10 text-blue-500 mr-2 dark:text-blue-300" />
            <h1 className="text-3xl font-bold text-gray-800 text-center dark:text-white">
              Bienvenido al Dashboard
            </h1>
          </div>

          {/* Mensaje temporal si existe */}
          {mensaje && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-6 text-center shadow-sm dark:bg-green-900 dark:border-green-700 dark:text-green-300">
              {mensaje}
            </div>
          )}

          {/* Descripción */}
          <p className="text-lg text-gray-600 text-center dark:text-gray-300">
            Aquí puedes gestionar los módulos del sistema judicial como clientes, abogados y expedientes.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
