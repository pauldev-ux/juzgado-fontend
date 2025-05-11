// src/pages/abogados/AbogadoList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Iconos de Heroicons
import { BriefcaseIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Obtener lista de abogados al montar el componente
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

  // Eliminar abogado por ID
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

  // Filtro por nombre
  const filteredAbogados = abogados.filter((abogado) =>
    abogado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-8">
      {/* Título estilizado con ícono */}
      <div className="flex items-center justify-center mb-8">
        <BriefcaseIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Lista de Abogados</h1>
      </div>

      {/* Mostrar error si ocurre */}
      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-sm">{error}</div>}

      {/* Campo de búsqueda con el mismo ancho que la tabla */}
      <div className="mb-6 w-full overflow-x-auto">
        <div className="min-w-[700px] max-w-full mx-auto">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla responsive */}
      <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['ID', 'Nombre', 'Apellido', 'Carnet de Identidad', 'Correo', 'Acciones'].map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-center font-semibold text-gray-600 uppercase text-xs tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAbogados.map((abogado) => (
              <tr key={abogado.id} className="hover:bg-gray-50 border-b transition">
                <td className="px-6 py-4 text-center">{abogado.id}</td>
                <td className="px-6 py-4 text-center">{abogado.nombre}</td>
                <td className="px-6 py-4 text-center">{abogado.apellido}</td>
                <td className="px-6 py-4 text-center">{abogado.carnet_identidad}</td>
                <td className="px-6 py-4 text-center">{abogado.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  <Link
                    to={`/abogados/edit/${abogado.id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(abogado.id)}
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

export default AbogadoList;
