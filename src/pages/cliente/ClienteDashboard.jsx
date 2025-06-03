import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  DocumentTextIcon, 
  HomeIcon, 
  IdentificationIcon, 
  EnvelopeIcon, 
  ClipboardDocumentListIcon, 
  UserIcon, 
  ScaleIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ClienteDashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !storedUser.id) return;

    const fetchClienteConExpedientes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/clientes/perfil/${storedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCliente(res.data.cliente);
        setExpedientes(res.data.expedientes);
      } catch (error) {
        console.error('Error al obtener perfil del cliente:', error);
        setError('No se pudo cargar tu perfil.');
      }
    };

    fetchClienteConExpedientes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 py-8">
      
      {/* Botón Dashboard */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="inline-flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Encabezado */}
      <div className="flex items-center justify-center mb-8">
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Panel del Cliente</h1>
      </div>

      {/* Perfil */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 space-y-2">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
          Bienvenido, {cliente?.nombre}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <IdentificationIcon className="w-5 h-5 text-gray-500" />
          CI: {cliente?.carnet_identidad}
        </p>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          Correo: {cliente?.correo}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      {/* Tabla de expedientes */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-x-auto">
        <div className="flex items-center gap-2 px-6 py-4">
          <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Tus Expedientes</h3>
        </div>

        {expedientes.length === 0 ? (
          <p className="px-6 pb-6 text-gray-500 dark:text-gray-300">No tienes expedientes registrados.</p>
        ) : (
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Nro. Expediente</th>
                <th className="px-6 py-3 text-left">Contenido</th>
                <th className="px-6 py-3 text-left">Juez</th>
              </tr>
            </thead>
            <tbody>
              {expedientes.map((exp) => (
                <tr key={exp.numero_expediente} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b">
                  <td className="px-6 py-4">{exp.numero_expediente}</td>
                  <td className="px-6 py-4">{exp.contenido || exp.descripcion}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <ScaleIcon className="w-4 h-4 text-indigo-500" />
                    {exp.juez_carnet || 'No asignado'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ClienteDashboard;
