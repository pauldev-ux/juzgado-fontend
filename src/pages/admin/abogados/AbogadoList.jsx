// src/pages/abogados/AbogadoList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Iconos de Heroicons
import { BriefcaseIcon, PencilSquareIcon, TrashIcon, PlusIcon, HomeIcon } from '@heroicons/react/24/outline';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAbogados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/abogados/');
        setAbogados(response.data);
      } catch (err) {
        setError('Error al cargar los abogados');
        console.error(err);
      }
    };

    fetchAbogados();
  }, []);

  const handleDelete = async (abogadoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/abogados/delete/${abogadoId}`);
      if (response.status === 200) {
        setAbogados(abogados.filter((abogado) => abogado.id !== abogadoId));
      }
    } catch (err) {
      setError(`Error al eliminar el abogado: ${err.response ? err.response.data.mensaje : err.message}`);
      console.error(err);
    }
  };

  const filteredAbogados = abogados.filter((abogado) =>
    abogado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">

      {/* Botón Home en la esquina superior izquierda */}
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
        <BriefcaseIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lista de Abogados</h1>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Búsqueda */}
      <div className="mb-6 w-full overflow-x-auto">
        <div className="min-w-[700px] max-w-full mx-auto">
          <input
            type="text"
            placeholder="Buscar por nombre..."
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
              {['ID', 'Nombre', 'Apellido', 'Carnet de Identidad', 'Correo', 'Acciones'].map((header, i) => (
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
            {filteredAbogados.map((abogado) => (
              <tr key={abogado.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition">
                <td className="px-6 py-4 text-center">{abogado.id}</td>
                <td className="px-6 py-4 text-center">{abogado.nombre}</td>
                <td className="px-6 py-4 text-center">{abogado.apellido}</td>
                <td className="px-6 py-4 text-center">{abogado.carnet_identidad}</td>
                <td className="px-6 py-4 text-center">{abogado.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  {/* Botón Editar */}
                  <Link
                    to={`/abogados/edit/${abogado.id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>

                  {/* Botón Eliminar */}
                  <button
                    onClick={() => handleDelete(abogado.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-rose-100 text-rose-600 text-xs font-medium rounded-full hover:bg-rose-200 transition dark:bg-rose-600 dark:text-rose-200 dark:hover:bg-rose-500"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Eliminar
                  </button>

                  {/* Botón Crear Abogado (verde) con icono "+" */}
                  <Link
                    to="/abogados/create"
                    className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-600 text-xs font-medium rounded-full hover:bg-green-200 transition dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
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

export default AbogadoList;
