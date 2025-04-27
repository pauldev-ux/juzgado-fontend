import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Abogados</h1>
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
          {abogados.map((abogado) => (
            <tr key={abogado.id}>
              <td className="px-4 py-2 border">{abogado.id}</td>
              <td className="px-4 py-2 border">{abogado.nombre}</td>
              <td className="px-4 py-2 border">{abogado.apellido}</td>
              <td className="px-4 py-2 border">{abogado.carnet_identidad}</td>
              <td className="px-4 py-2 border">{abogado.email}</td>
              <td className="px-4 py-2 border">
                <Link to={`/abogados/edit/${abogado.id}`} className="text-blue-500 hover:text-blue-700">Editar</Link>
                <button
                  onClick={() => handleDelete(abogado.id)}
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

export default AbogadoList;
