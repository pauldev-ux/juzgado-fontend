// src/pages/expedientes/ExpedienteList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Iconos de Heroicons (Outline)
import { DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function ExpedienteList() {
  const [expedientes, setExpedientes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener expedientes al cargar el componente
    const fetchExpedientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/');
        setExpedientes(response.data);
      } catch (err) {
        setError('Error al cargar los expedientes');
        console.error(err);
      }
    };

    fetchExpedientes();
  }, []);

  // Maneja la eliminación de un expediente
  const handleDelete = async (expedienteId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/expedientes/delete/${expedienteId}`);
      if (response.status === 200) {
        setExpedientes(expedientes.filter((exp) => exp.numero_expediente !== expedienteId));
      }
    } catch (err) {
      setError('Error al eliminar el expediente');
      console.error('Error en la solicitud DELETE:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-8">
      {/* Encabezado elegante con ícono */}
      <div className="flex items-center justify-center mb-8">
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Gestión de Expedientes</h1>
      </div>

      {/* Mensaje de error si ocurre */}
      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-sm">{error}</div>}

      {/* Contenedor elegante con sombra y bordes redondeados */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['ID', 'Juez', 'Demandante', 'Ab. Demandante', 'Demandado', 'Ab. Demandado', 'Contenido', ''].map((header, i) => (
                <th key={i} className="px-6 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expedientes.map((expediente) => (
              <tr key={expediente.numero_expediente} className="hover:bg-gray-50 border-b">
                <td className="px-6 py-4">{expediente.numero_expediente}</td>
                <td className="px-6 py-4">{expediente.juez_carnet}</td>
                <td className="px-6 py-4">{expediente.demandante_carnet}</td>
                <td className="px-6 py-4">{expediente.abogado_demandante_carnet}</td>
                <td className="px-6 py-4">{expediente.demandado_carnet}</td>
                <td className="px-6 py-4">{expediente.abogado_demandado_carnet}</td>
                <td className="px-6 py-4">{expediente.contenido}</td>

                {/* Botones de acción con estilo elegante */}
                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                  <Link
                    to={`/expedientes/edit/${expediente.numero_expediente}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(expediente.numero_expediente)}
                    className="inline-flex items-center px-3 py-1.5 bg-rose-100 text-rose-600 text-xs font-medium rounded-full hover:bg-rose-200 transition"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Eliminar
                  </button>
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
