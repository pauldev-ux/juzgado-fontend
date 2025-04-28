import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JuecesList() {
  const [jueces, setJueces] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Jueces</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Apellido</th>
            <th className="px-4 py-2 border">Carnet de Identidad</th>
            <th className="px-4 py-2 border">Correo</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jueces.map((juez) => (
            <tr key={juez.id}>
              <td className="px-4 py-2 border">{juez.id}</td>
              <td className="px-4 py-2 border">{juez.nombre}</td>
              <td className="px-4 py-2 border">{juez.apellido}</td>
              <td className="px-4 py-2 border">{juez.carnet_identidad}</td>
              <td className="px-4 py-2 border">{juez.email}</td>
              <td className="px-4 py-2 border">
                <Link to={`/jueces/edit/${juez.id}`} className="text-blue-500 hover:text-blue-700">Editar</Link>
                <button
                  onClick={() => handleDelete(juez.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JuecesList;
