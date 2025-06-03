// src/pages/admin/audiencias/VistaAudienciaList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CalendarIcon,
  PencilSquareIcon,
  EyeIcon,
  CheckCircleIcon,
  PlusIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

function VistaAudienciaList() {
  const [audiencias, setAudiencias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/audiencias')
      .then((res) => {
        console.log('Audiencias:', res.data);
        if (Array.isArray(res.data)) {
          setAudiencias(res.data);
        } else if (Array.isArray(res.data.data)) {
          setAudiencias(res.data.data);
        } else {
          setAudiencias([]);
        }
      })
      .catch((err) => {
        console.error('Error al obtener audiencias:', err);
        setError('Error al cargar audiencias');
      });
  }, []);

  const filtered = audiencias.filter((a) =>
    a.id_expediente?.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      {/* Botón Home */}
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-500"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Título */}
      <div className="flex items-center justify-center mb-8">
        <CalendarIcon className="h-8 w-8 text-blue-600 mr-2 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lista de Audiencias</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-sm dark:bg-red-200 dark:text-red-800">
          {error}
        </div>
      )}

      {/* Búsqueda */}
      <div className="mb-6 w-full overflow-x-auto">
        <div className="min-w-[700px] max-w-full mx-auto">
          <input
            type="text"
            placeholder="Buscar por ID expediente..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
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
              {['ID', 'Expediente', 'Fecha', 'Duración', 'Estado', 'Acciones'].map((h, i) => (
                <th key={i} className="px-6 py-4 text-center font-semibold uppercase text-xs tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((aud) => (
              <tr key={aud.id_audiencia} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition">
                <td className="px-6 py-4 text-center">{aud.id_audiencia}</td>
                <td className="px-6 py-4 text-center">{aud.id_expediente}</td>
                <td className="px-6 py-4 text-center">{new Date(aud.fecha).toLocaleString()}</td>
                <td className="px-6 py-4 text-center">{aud.duracion || '-'}</td>
                <td className="px-6 py-4 text-center">{aud.estado}</td>
                <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                  <Link to={`/audiencias/edit/${aud.id_audiencia}`} className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-200 dark:hover:bg-blue-600">
                    <PencilSquareIcon className="w-4 h-4 mr-1" /> Editar
                  </Link>
                  <Link to={`/audiencias/observaciones?id=${aud.id_audiencia}`} className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-600">
                    <EyeIcon className="w-4 h-4 mr-1" /> Ver
                  </Link>
                  <Link to={`/audiencias/resolver?id=${aud.id_audiencia}`} className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-600 text-xs font-medium rounded-full hover:bg-green-200 dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600">
                    <CheckCircleIcon className="w-4 h-4 mr-1" /> Resolver
                  </Link>
                  <Link to="/audiencias/create" className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-medium rounded-full hover:bg-purple-200 dark:bg-purple-700 dark:text-purple-200 dark:hover:bg-purple-600">
                    <PlusIcon className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VistaAudienciaList;
