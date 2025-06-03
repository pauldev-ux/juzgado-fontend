import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Iconos de Heroicons
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

function JuezEdit() {
  // Estados para almacenar los datos del juez
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams(); // Obtener el ID del juez desde la URL
  const navigate = useNavigate(); // Para la navegación

  // Función para cargar los datos del juez desde la API
  useEffect(() => {
    const fetchJuez = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jueces/${id}`);
        const { nombre, apellido, carnet_identidad, email } = response.data;
        setNombre(nombre);
        setApellido(apellido);
        setCarnetIdentidad(carnet_identidad);
        setEmail(email);
      } catch (err) {
        setError('Error al cargar los datos del juez'); // Manejo de error si la carga falla
        console.error(err);
      }
    };

    fetchJuez();
  }, [id]);

  // Función para enviar el formulario y actualizar el juez
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/jueces/update/${id}`, {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });
      navigate('/jueces/list'); // Redirigir a la lista de jueces después de actualizar
    } catch (err) {
      setError('Error al actualizar el juez'); // Manejo de error si la actualización falla
      console.error(err);
    }
  };

  // Función para regresar al Dashboard
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
            {/* Icono de regresar */}
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        {/* Título de la página */}
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Editar Juez
        </h1>

        {/* Mostrar mensaje de error si hay uno */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo: Nombre */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Actualizar el estado de nombre
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
              value={apellido}
              onChange={(e) => setApellido(e.target.value)} // Actualizar el estado de apellido
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Campo: CI (Carnet de Identidad) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Carnet de Identidad
            </label>
            <input
              type="text"
              value={carnetIdentidad}
              readOnly // Este campo es solo de lectura, no puede ser modificado
              className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500"
            />
            <div className="flex items-center mt-1 text-sm text-yellow-600 dark:text-yellow-400">
              {/* Mensaje informativo sobre la inmutabilidad del carnet */}
              <ExclamationCircleIcon className="h-5 w-5 mr-1" />
              Este campo no se puede modificar porque es un identificador único del juez.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizar el estado de email
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
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de contraseña
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Actualizar Juez
          </button>
        </form>
      </div>
    </div>
  );
}

export default JuezEdit;
