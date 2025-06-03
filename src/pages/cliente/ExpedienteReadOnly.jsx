import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ExpedienteReadOnly({ user }) {
  const [expedientes, setExpedientes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpedientesCliente = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/expedientes/cliente/${user.id_usuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpedientes(response.data);
      } catch (err) {
        setError('Error al cargar los expedientes del cliente');
        console.error(err);
      }
    };

    if (user?.id_usuario) {
      fetchExpedientesCliente();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      
      {/* Botón Dashboard */}
      <div className="absolute top-4 left-4">
        <Link
          to="/cliente/dashboard"
          className="inline-flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Título */}
      <div className="flex items-center justify-center mb-8">
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Mis Expedientes</h1>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              {['ID', 'Estado', 'Contenido'].map((header, i) => (
                <th key={i} className="px-6 py-4 text-left font-semibold text-gray-800 dark:text-white uppercase text-xs tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expedientes.map((expediente) => (
              <tr key={expediente.id_expediente} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition">
                <td className="px-6 py-4">{expediente.numero_expediente}</td>
                <td className="px-6 py-4">{expediente.estado_actual}</td>
                <td className="px-6 py-4">{expediente.descripcion || expediente.contenido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpedienteReadOnly;
