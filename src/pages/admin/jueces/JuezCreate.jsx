import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// NUEVO: importación de Heroicons tipo outline para consistencia visual
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ScaleIcon, // NUEVO: ícono representativo para jueces (balanza)
  ArrowLeftCircleIcon, // NUEVO: icono de regresar al dashboard
} from '@heroicons/react/24/outline';

function JuezCreate() {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1) Al montar: verificamos token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [navigate]);

  // 2) Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      // Enviamos los datos para crear el nuevo juez
      await axios.post(
        'http://localhost:3000/api/jueces', 
        {
          nombre,
          apellido,
          carnet_identidad: carnetIdentidad,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de enviar el token
          },
        }
      );

      // Redirige a la lista de jueces después de la creación
      navigate('/jueces/list');
    } catch (err) {
      // Si 401/403, limpiamos y redirigimos
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('No tienes permisos para crear jueces o token inválido.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Error al crear el juez');
      }
      console.error(err);
    }
  };

  // 3) Función para manejar el regreso al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">

        {/* Botón regresar al Dashboard */}
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
          <ScaleIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">Crear Juez</h1>
        </div>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 px-4 py-2 mb-4 rounded text-center shadow">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Campo: Nombre */}
          <div>
            <label htmlFor="nombre" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Nombre</label>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Campo: Apellido */}
          <div>
            <label htmlFor="apellido" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Apellido</label>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Campo: Carnet de Identidad */}
          <div>
            <label htmlFor="carnet_identidad" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Carnet de Identidad</label>
            <div className="relative">
              <IdentificationIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                id="carnet_identidad"
                maxLength={10} 
                placeholder="Máximo 10 dígitos"
                value={carnetIdentidad}
                onChange={(e) => setCarnetIdentidad(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 
                           placeholder:text-gray-300 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Campo: Correo */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Correo</label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Contraseña</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Botón para crear el juez */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Crear Juez
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JuezCreate;
