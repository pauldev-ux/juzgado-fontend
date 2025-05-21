import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BriefcaseIcon,
  ArrowLeftCircleIcon, // NUEVO: icono de regresar al dashboard
} from '@heroicons/react/24/outline';

function AbogadoCreate() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/abogados', {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });
      navigate('/abogados/list');
    } catch (err) {
      setError('Error al crear el abogado');
      console.error(err);
    }
  };

  // NUEVO: función para manejar el regreso al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">

        {/* Botón regresar al Dashboard, estilo uniforme */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <BriefcaseIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Crear Abogado</h1>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 px-4 py-2 mb-4 rounded text-center shadow">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2 dark:text-gray-300" />
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apellido
            </label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2 dark:text-gray-300" />
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Carnet Identidad */}
          <div>
            <label htmlFor="carnet_identidad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Carnet de Identidad
            </label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2 dark:text-gray-300" />
              <input
                type="text"
                id="carnet_identidad"
                value={carnetIdentidad}
                onChange={(e) => setCarnetIdentidad(e.target.value)}
                maxLength={10}
                placeholder="Máximo 10 dígitos"
                className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo
            </label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2 dark:text-gray-300" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="flex items-center border rounded px-3 py-2 dark:border-gray-600">
              <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2 dark:text-gray-300" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                required
              />
            </div>
          </div>

          {/* Contenedor para el botón con flex */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
            >
              Crear Abogado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AbogadoCreate;
