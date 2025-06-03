// src/pages/admin/audiencias/AudienciaObservaciones.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeftCircleIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

function AudienciaObservaciones() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observacion, setObservacion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarAudiencia = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/audiencias/${id}`);
        setObservacion(res.data.observacion || '');
      } catch (error) {
        console.error('Error al cargar audiencia:', error);
        setError('No se pudo cargar la audiencia.');
      } finally {
        setCargando(false);
      }
    };

    cargarAudiencia();
  }, [id]);

  const guardarObservacion = async () => {
    try {
      await axios.put(`http://localhost:8000/api/audiencias/${id}/observacion`, { observacion });
      setMensaje('✅ Observación guardada exitosamente.');
      setError('');
    } catch (error) {
      console.error('Error al guardar observación:', error);
      setMensaje('');
      setError('❌ Error al guardar observación.');
    }
  };

  const handleGoBack = () => navigate(-1);

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-white text-lg">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

        {/* Botón regresar */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar
          </button>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-7 w-7" />
          Editar Observación de Audiencia
        </h2>

        {/* Campo textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Observación
          </label>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            rows={5}
            placeholder="Ingrese observaciones..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Mensajes */}
        {mensaje && (
          <div className="mt-4 text-green-700 dark:text-green-400 text-sm font-medium">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="mt-4 flex items-center text-red-700 dark:text-red-400 text-sm font-medium">
            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
            {error}
          </div>
        )}

        {/* Botón guardar */}
        <button
          onClick={guardarObservacion}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <PencilSquareIcon className="h-5 w-5" />
          Guardar Observación
        </button>
      </div>
    </div>
  );
}

export default AudienciaObservaciones;
