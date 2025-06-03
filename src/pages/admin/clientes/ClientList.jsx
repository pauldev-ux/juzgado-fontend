import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Iconos de Heroicons
import {
  UserGroupIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1) Al montar: comprueba si hay token en localStorage; si no, redirige
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    // Si hay token, obtén la lista
    fetchClients(token);
  }, [navigate]);

  // 2) Función para obtener la lista de clientes
  const fetchClients = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesión inválida o sin permisos. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Error al cargar los clientes');
      }
      console.error(err);
    }
  };

  // 3) Eliminar cliente por ID (incluye token en header)
  const handleDelete = async (clientId) => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/clientes/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setClients((prev) => prev.filter((cliente) => cliente.id !== clientId));
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesión inválida o sin permisos para eliminar. Inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        const msg = err.response?.data?.mensaje || 'Error al eliminar el cliente';
        setError(msg);
      }
      console.error(err);
    }
  };

  // 4) Filtrar clientes por nombre
  const filteredClients = clients.filter((client) =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 5) Si el error es “No autenticado…”, mostramos solo la alerta grande
  if (error === 'No autenticado. Por favor, inicia sesión.') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8 relative">
      {/* Botón Home (Dashboard) */}
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Título con ícono */}
      <div className="flex items-center justify-center mb-8">
        <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lista de Clientes</h1>
      </div>

      {/* Mostrar error genérico */}
      {error && error !== 'No autenticado. Por favor, inicia sesión.' && (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Campo de búsqueda */}
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

      {/* Tabla responsive */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b">
            <tr>
              {['ID', 'Nombre', 'Apellido', 'Carnet de Identidad', 'Correo', 'Acciones'].map(
                (header, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-center font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b transition"
              >
                <td className="px-6 py-4 text-center">{client.id}</td>
                <td className="px-6 py-4 text-center">{client.nombre}</td>
                <td className="px-6 py-4 text-center">{client.apellido}</td>
                <td className="px-6 py-4 text-center">{client.carnet_identidad}</td>
                <td className="px-6 py-4 text-center">{client.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                  {/* Botón Editar */}
                  <Link
                    to={`/clientes/edit/${client.id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Editar
                  </Link>

                  {/* Botón Eliminar */}
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-rose-100 text-rose-600 text-xs font-medium rounded-full hover:bg-rose-200 transition dark:bg-rose-600 dark:text-rose-200 dark:hover:bg-rose-500"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Eliminar
                  </button>

                  {/* Botón Crear Cliente */}
                  <Link
                    to="/clientes/create"
                    className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-600 text-xs font-medium rounded-full hover:bg-green-200 transition dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Crear
                  </Link>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && !error && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;
