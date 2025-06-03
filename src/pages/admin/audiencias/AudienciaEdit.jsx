// src/pages/admin/audiencias/VistaAudienciaEdit.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilSquareIcon,
  ArrowLeftCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

function VistaAudienciaEdit() {
  const [audiencia, setAudiencia] = useState({
    fecha: '',
    duracion: '',
    ubicacion: '',
    estado: '',
    observacion: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAudiencia = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/audiencias/${id}`);
        setAudiencia(response.data);
      } catch (err) {
        setError('Error al cargar la audiencia');
        console.error(err);
      }
    };

    fetchAudiencia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAudiencia({ ...audiencia, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/audiencias/update/${id}`, audiencia);
      navigate('/audiencias/list');
    } catch (err) {
      setError('Error al actualizar la audiencia');
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
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

        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Editar Audiencia
        </h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <CalendarIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Fecha
            </label>
            <input
              type="datetime-local"
              name="fecha"
              value={audiencia.fecha}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <ClockIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Duración (en horas)
            </label>
            <input
              type="text"
              name="duracion"
              value={audiencia.duracion}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <MapPinIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={audiencia.ubicacion}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado
            </label>
            <select
              name="estado"
              value={audiencia.estado}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observaciones
            </label>
            <textarea
              name="observacion"
              value={audiencia.observacion}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default VistaAudienciaEdit;
