// src/pages/admin/audiencias/AudienciaList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  EyeIcon,
  CheckCircleIcon,
  PlusIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

function AudienciaList() {
  const [audiencias, setAudiencias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAudiencias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/audiencias/');
        setAudiencias(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Error al cargar las audiencias');
        console.error(err);
      }
    };

    fetchAudiencias();
  }, []);

  const filteredAudiencias = audiencias.filter((aud) =>
    String(aud.id_expediente).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      {/* Botón Home */}
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Título */}
      <div className="flex items-center justify-center mb-8">
        <CalendarDaysIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lista de Audiencias</h1>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Busqueda */}
      <div className="mb-6 w-full overflow-x-auto">
        <div className="min-w-[700px] max-w-full mx-auto">
          <input
            type="text"
            placeholder="Buscar por expediente..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b">
            <tr>
              {['ID', 'Expediente', 'Fecha', 'Estado', 'Acciones'].map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-center font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAudiencias.map((aud) => (
              <tr key={aud.id_audiencia} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition">
                <td className="px-6 py-4 text-center">{aud.id_audiencia}</td>
                <td className="px-6 py-4 text-center">{aud.id_expediente}</td>
                <td className="px-6 py-4 text-center">{new Date(aud.fecha).toLocaleString()}</td>
                <td className="px-6 py-4 text-center">{aud.estado}</td>
                <td className="px-6 py-4 text-center space-x-1">
                  <Link to={`/audiencias/edit/${aud.id_audiencia}`} className="text-indigo-500 hover:text-indigo-700">
                    <PencilSquareIcon className="w-5 h-5 inline" />
                  </Link>
                  <Link to={`/audiencias/observaciones/${aud.id_audiencia}`} className="text-yellow-500 hover:text-yellow-700">
                    <EyeIcon className="w-5 h-5 inline" />
                  </Link>
                  <Link to={`/audiencias/resolver/${aud.id_audiencia}`} className="text-green-500 hover:text-green-700">
                    <CheckCircleIcon className="w-5 h-5 inline" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón crear audiencia */}
      <div className="mt-6 flex justify-end">
        <Link
          to="/audiencias/create"
          className="inline-flex items-center px-4 py-2 bg-green-100 text-green-600 text-sm font-medium rounded-full hover:bg-green-200 transition dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600"
        >
          <PlusIcon className="w-4 h-4 mr-2" /> Crear Audiencia
        </Link>
      </div>
    </div>
  );
}

export default AudienciaList;