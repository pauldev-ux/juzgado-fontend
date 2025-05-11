// src/pages/jueces/JuezList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Importar íconos de Heroicons
import { ScaleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function JuezList() {
  const [jueces, setJueces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener jueces desde la API
    const fetchJueces = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/jueces/');
        setJueces(response.data);
      } catch (err) {
        setError('Error al cargar los jueces');
        console.error(err);
      }
    };

    fetchJueces();
  }, []);

  // Eliminar juez
  const handleDelete = async (juezId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/jueces/delete/${juezId}`);
      if (response.status === 200) {
        setJueces(jueces.filter((juez) => juez.id !== juezId));
      }
    } catch (err) {
      setError(`Error al eliminar el juez: ${err.response ? err.response.data.mensaje : err.message}`);
      console.error(err);
    }
  };

  // Filtro por nombre
  const filteredJueces = jueces.filter((juez) =>
    juez.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-8">
      {/* Título con ícono */}
      <div className="flex items-center justify-center mb-8">
        <ScaleIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Lista de Jueces</h1>
      </div>

      {/* Mostrar errores */}
      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-sm">{error}</div>}

      {/* Campo de búsqueda con mismo ancho que la tabla */}
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
              {['ID', 'Nombre', 'Apellido', 'Carnet de Identidad', 'Correo', 'Acciones'].map((title, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-center font-semibold text-gray-600 uppercase text-xs tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredJueces.map((juez) => (
              <tr key={juez.id} className="hover:bg-gray-50 border-b transition">
                <td className="px-6 py-4 text-center">{juez.id}</td>
                <td className="px-6 py-4 text-center">{juez.nombre}</td>
                <td className="px-6 py-4 text-center">{juez.apellido}</td>
                <td className="px-6 py-4 text-center">{juez.carnet_identidad}</td>
                <td className="px-6 py-4 text-center">{juez.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  {/* Botón Editar */}
                  <Link
                    to={`/jueces/edit/${juez.id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>
                  {/* Botón Eliminar */}
                  <button
                    onClick={() => handleDelete(juez.id)}
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

export default JuezList;