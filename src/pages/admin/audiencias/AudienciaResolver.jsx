// src/pages/admin/audiencias/AudienciaResolver.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

function AudienciaResolver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resultado, setResultado] = useState('');
  const [error, setError] = useState('');

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resultado.trim()) {
      setError('El campo resultado no puede estar vacío.');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/audiencias/${id}/resolver`, { resultado });
      navigate('/audiencias/list');
    } catch (err) {
      console.error('Error al resolver audiencia:', err);
      setError('Ocurrió un error al resolver la audiencia.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        
        {/* Botón Regresar */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400 flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
          Resolver Audiencia #{id}
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center flex items-center justify-center gap-2">
            <ExclamationCircleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resultado de la Audiencia
            </label>
            <textarea
              name="resultado"
              value={resultado}
              onChange={(e) => setResultado(e.target.value)}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Ingrese el resultado o veredicto de la audiencia"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition dark:bg-green-500 dark:hover:bg-green-600"
          >
            <CheckCircleIcon className="h-5 w-5" />
            Confirmar Resolución
          </button>
        </form>
      </div>
    </div>
  );
}

export default AudienciaResolver;
