// src/pages/expedientes/ExpedienteList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, PencilSquareIcon, TrashIcon, PlusIcon, HomeIcon } from '@heroicons/react/24/outline';

function ExpedienteList() {
  const [expedientes, setExpedientes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpedientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/expedientes/');
        setExpedientes(response.data);
      } catch (err) {
        setError('Error al cargar los expedientes');
        console.error(err);
      }
    };
    fetchExpedientes();
  }, []);

  const handleDelete = async (expedienteId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/expedientes/delete/${expedienteId}`);
      if (response.status === 200) {
        setExpedientes(expedientes.filter((exp) => exp.numero_expediente !== expedienteId));
      }
    } catch (err) {
      setError('Error al eliminar el expediente');
      console.error('Error en la solicitud DELETE:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      
      {/* Botón Dashboard */}
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
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Gestión de Expedientes</h1>
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
              {['ID', 'Juez', 'Demandante', 'Ab. Demandante', 'Demandado', 'Ab. Demandado', 'Contenido', 'Acciones'].map((header, i) => (
                <th key={i} className="px-6 py-4 text-left font-semibold text-gray-800 dark:text-white uppercase text-xs tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expedientes.map((expediente) => (
              <tr key={expediente.numero_expediente} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition">
                <td className="px-6 py-4">{expediente.numero_expediente}</td>
                <td className="px-6 py-4">{expediente.juez_carnet}</td>
                <td className="px-6 py-4">{expediente.demandante_carnet}</td>
                <td className="px-6 py-4">{expediente.abogado_demandante_carnet}</td>
                <td className="px-6 py-4">{expediente.demandado_carnet}</td>
                <td className="px-6 py-4">{expediente.abogado_demandado_carnet}</td>
                <td className="px-6 py-4">{expediente.contenido}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {/* Editar */}
                  <Link
                    to={`/expedientes/edit/${expediente.numero_expediente}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>

                  {/* Eliminar */}
                  <button
                    onClick={() => handleDelete(expediente.numero_expediente)}
                    className="inline-flex items-center px-3 py-1.5 bg-rose-100 text-rose-600 text-xs font-medium rounded-full hover:bg-rose-200 transition dark:bg-rose-600 dark:text-rose-200 dark:hover:bg-rose-500"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Eliminar
                  </button>

                {/* NUEVO: Botón Crear Cliente (verde) con icono "+" */}
                 <Link
                  to="/expedientes/create"
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

export default ExpedienteList;
