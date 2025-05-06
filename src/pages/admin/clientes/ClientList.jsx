import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/clientes/');
        setClients(response.data);
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (clientId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/clientes/delete/${clientId}`);
      if (response.status === 200) {
        setClients(clients.filter((client) => client.id !== clientId));
      }
    } catch (err) {
      setError(`Error al eliminar el cliente: ${err.response ? err.response.data.mensaje : err.message}`);
      console.error(err);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Clientes</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td className="px-4 py-2 border">{client.id}</td>
              <td className="px-4 py-2 border">{client.nombre}</td>
              <td className="px-4 py-2 border">{client.apellido}</td>
              <td className="px-4 py-2 border">{client.carnet_identidad}</td>
              <td className="px-4 py-2 border">{client.email}</td>
              <td className="px-4 py-2 border">
                <Link to={`/clientes/edit/${client.id}`} className="text-blue-500 hover:text-blue-700">Editar</Link>
                <button
                  onClick={() => handleDelete(client.id)}
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

export default ClientList;
