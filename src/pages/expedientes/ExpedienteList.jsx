// src/pages/expedientes/ExpedienteList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ExpedienteList() {
  const [expedientes, setExpedientes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
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

  const handleDelete = async (expedienteId) => {
    try {
      console.log(`Eliminando expediente con ID: ${expedienteId}`);
      const response = await axios.delete(`http://localhost:3001/api/expedientes/delete/${expedienteId}`);
      if (response.status === 200) {
        setExpedientes(expedientes.filter((expediente) => expediente.numero_expediente !== expedienteId));
      }
    } catch (err) {
      setError('Error al eliminar el expediente');
      console.error('Error en la solicitud DELETE:', err.response ? err.response.data : err);
    }
  };

  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Expedientes</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Juez</th>
            <th className="px-4 py-2 border">Demandante</th>
            <th className="px-4 py-2 border">Abogado Demandante</th>
            <th className="px-4 py-2 border">Demandado</th>
            <th className="px-4 py-2 border">Abogado Demandado</th>
            <th className="px-4 py-2 border">Contenido</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((expediente) => (
            <tr key={expediente.numero_expediente}>
              <td className="px-4 py-2 border">{expediente.numero_expediente}</td>
              <td className="px-4 py-2 border">{expediente.juez_carnet}</td>
              <td className="px-4 py-2 border">{expediente.demandante_carnet}</td>
              <td className="px-4 py-2 border">{expediente.abogado_demandante_carnet}</td>
              <td className="px-4 py-2 border">{expediente.demandado_carnet}</td>
              <td className="px-4 py-2 border">{expediente.abogado_demandado_carnet}</td>
              <td className="px-4 py-2 border">{expediente.contenido}</td>
              <td className="px-4 py-2 border">
                <Link to={`/expedientes/edit/${expediente.numero_expediente}`} className="text-blue-500 hover:text-blue-700 mr-4">Editar</Link>
                <button onClick={() => handleDelete(expediente.numero_expediente)} className="text-red-500 hover:text-red-700">
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

export default ExpedienteList;
