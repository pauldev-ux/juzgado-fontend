import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

function ClientCreate() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 1) Al montar: comprueba si hay token en localStorage; si no, redirige a /login
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
    console.log('>>> Token en ClientCreate:', token);
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/clientes',
        {
          nombre,
          apellido,
          carnet_identidad: carnetIdentidad,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si todo va bien, redirige a lista de clientes
      navigate('/clientes/list');
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        setError('No tienes permisos para crear clientes o token inválido.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Ocurrió un error al crear el cliente.');
      }
      console.error(err);
    }
  };

  // Botón para volver al dashboard de admin
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  // Si el motivo del error es “No autenticado…”, mostramos solo la alerta grande
  if (error === 'No autenticado. Por favor, inicia sesión.') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
        <div className="w-full max-w-lg bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  // Si hay otro error, lo mostramos arriba del formulario
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
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

        <div className="text-center mb-6">
          <UserCircleIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Crear Cliente
          </h1>
        </div>

        {error && error !== 'No autenticado. Por favor, inicia sesión.' && (
          <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-3 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block font-medium mb-1 text-gray-700 dark:text-white"
            >
              Nombre
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="apellido"
              className="block font-medium mb-1 text-gray-700 dark:text-white"
            >
              Apellido
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="carnet_identidad"
              className="block font-medium mb-1 text-gray-700 dark:text-white"
            >
              Carnet de Identidad
            </label>
            <div className="relative">
              <IdentificationIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <input
                type="text"
                id="carnet_identidad"
                maxLength={10}
                placeholder="Máximo 10 dígitos"
                value={carnetIdentidad}
                onChange={(e) => setCarnetIdentidad(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-gray-700 dark:text-white"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-1 text-gray-700 dark:text-white"
            >
              Contraseña
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition"
            >
              Crear Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientCreate;
