import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ArrowLeftCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

function VistaAudienciaCreate() {
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [id_expediente, setIdExpediente] = useState('');
  const [id_juez, setIdJuez] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/audiencias', {
        fecha,
        duracion,
        ubicacion,
        id_expediente,
        id_juez,
      });
      navigate('/audiencias/list');
    } catch (err) {
      setError('Error al crear audiencia');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* Botón regresar */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <PlusCircleIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Crear Audiencia</h1>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 px-4 py-2 mb-4 rounded text-center shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Duración */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duración</label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Ej. 2 horas"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ubicación</label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Expediente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Expediente</label>
            <input
              type="number"
              value={id_expediente}
              onChange={(e) => setIdExpediente(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:border-gray-600 bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>

          {/* Juez */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Juez</label>
            <input
              type="number"
              value={id_juez}
              onChange={(e) => setIdJuez(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:border-gray-600 bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
            >
              Crear Audiencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VistaAudienciaCreate;