import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FolderIcon } from '@heroicons/react/24/outline';

function JuezDashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [juez, setJuez] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setJuez(parsedUser);

      if (parsedUser?.carnet_identidad) {
        axios
          .get(`http://localhost:3001/api/expedientes/juez/${parsedUser.carnet_identidad}`)
          .then((res) => setExpedientes(res.data))
          .catch((err) => console.error('Error al cargar expedientes del juez:', err));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 px-4 py-8 transition-colors duration-300 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Encabezado */}
        <div className="flex items-center justify-center mb-8">
          <FolderIcon className="h-8 w-8 text-indigo-600 mr-2 dark:text-indigo-300" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Panel del Juez</h1>
        </div>

        {/* Información del juez */}
        {juez ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
              Bienvenido, <span className="text-indigo-600 dark:text-indigo-300">{juez.nombre}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">CI: {juez.carnet_identidad}</p>
            <p className="text-gray-600 dark:text-gray-300">Correo: {juez.correo}</p>
          </div>
        ) : (
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md shadow text-center text-red-800 dark:text-red-300 mb-6">
            No se ha iniciado sesión correctamente. Por favor, vuelve a iniciar sesión.
          </div>
        )}

        {/* Lista de expedientes */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white px-6 py-4">Expedientes Asignados</h3>

          {expedientes.length === 0 ? (
            <p className="px-6 pb-6 text-gray-500 dark:text-gray-300">No tienes expedientes asignados.</p>
          ) : (
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">N° Expediente</th>
                  <th className="px-6 py-3 text-left">Demandante</th>
                  <th className="px-6 py-3 text-left">Demandado</th>
                  <th className="px-6 py-3 text-left">Contenido</th>
                </tr>
              </thead>
              <tbody>
                {expedientes.map((exp) => (
                  <tr
                    key={exp.numero_expediente}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b"
                  >
                    <td className="px-6 py-4">{exp.numero_expediente}</td>
                    <td className="px-6 py-4">{exp.demandante_carnet}</td>
                    <td className="px-6 py-4">{exp.demandado_carnet}</td>
                    <td className="px-6 py-4">{exp.contenido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default JuezDashboard;
