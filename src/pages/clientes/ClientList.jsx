import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ClientList() {
  const [clients, setClients] = useState([]);  // Renombramos 'users' a 'clients'
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/clientes/');
        setClients(response.data);  // Aseguramos que los datos de clientes sean cargados
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (clientId) => {
    try {
      console.log(`Eliminando cliente con ID: ${clientId}`);
      const response = await axios.delete(`http://localhost:3001/api/clientes/delete/${clientId}`);
      if (response.status === 200) {
        setClients(clients.filter((client) => client.id !== clientId));  // Filtramos por 'client.id'
      }
    } catch (err) {
      // Mostrar detalles del error más específicos
      setError(`Error al eliminar el cliente: ${err.response ? err.response.data.mensaje : err.message}`);
      console.error('Error en la solicitud DELETE:', err.response ? err.response.data : err);
    }
  };
  
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Clientes</h1>
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
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-4 py-2 border">{client.id}</td>
              <td className="px-4 py-2 border">{client.nombre}</td>  {/* Muestra el 'nombre' del cliente */}
              <td className="px-4 py-2 border">{client.apellido}</td>  {/* Muestra el 'apellido' del cliente */}
              <td className="px-4 py-2 border">{client.carnet_identidad}</td>  {/* Muestra el 'carnet_identidad' */}
              <td className="px-4 py-2 border">{client.email}</td>  {/* Muestra el 'email' del cliente */}
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
