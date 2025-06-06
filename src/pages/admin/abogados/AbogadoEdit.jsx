import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Iconos Heroicons
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
  ArrowLeftCircleIcon, // ✅ Icono para el botón de regreso
  LockClosedIcon, // ✅ Icono para la contraseña
} from '@heroicons/react/24/outline';

function AbogadoEdit() {
  const [abogado, setAbogado] = useState({
    nombre: '',
    apellido: '',
    carnet_identidad: '',
    email: '',
    password: '', // ✅ Agregado el campo para la contraseña
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Cargar datos del abogado por ID
  useEffect(() => {
    const fetchAbogado = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/abogados/${id}`);
        setAbogado(response.data);
      } catch (err) {
        setError('Error al cargar los datos del abogado');
        console.error(err);
      }
    };

    fetchAbogado();
  }, [id]);

  // ✅ Manejar cambios de campos (excepto CI)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'carnet_identidad') return;
    setAbogado({ ...abogado, [name]: value });
  };

  // ✅ Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/abogados/update/${id}`, abogado);
      navigate('/abogados/list');
    } catch (err) {
      setError('Error al actualizar el abogado');
      console.error(err);
    }
  };

  // ✅ Ir al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        
        {/* Botón para regresar al Dashboard, ubicado arriba */}
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
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Editar Abogado
        </h2>

        {/* Mostrar error si ocurre */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          

          {/* Campo: Nombre */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={abogado.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Campo: Apellido */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={abogado.apellido}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Campo: CI (no editable) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Carnet de Identidad
            </label>
            <input
              type="text"
              name="carnet_identidad"
              value={abogado.carnet_identidad}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500"
            />
            <div className="flex items-center mt-1 text-sm text-yellow-600 dark:text-yellow-400">
              <ExclamationCircleIcon className="h-5 w-5 mr-1" />
              Este campo no se puede modificar porque es un identificador único del abogado.
            </div>
          </div>

          {/* Campo: Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={abogado.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <LockClosedIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={abogado.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Botón: Guardar Cambios */}
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

export default AbogadoEdit;
