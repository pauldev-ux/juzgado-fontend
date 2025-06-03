// src/pages/abogados/AbogadoCreate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BriefcaseIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

function AbogadoCreate() {
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
      await axios.post(
        'http://localhost:3000/api/abogados',
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

      navigate('/abogados/list');
    } catch (err) {
      // Si 401/403, limpiamos y redirigimos
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('No tienes permisos para crear abogados o token inválido.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Error al crear el abogado');
      }
      console.error(err);
    }
  };

  // 3) Botón “Regresar”
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  // Si estamos en estado “no autenticado” mostramos solo ese mensaje
  if (error === 'No autenticado. Por favor, inicia sesión.') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-lg bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  // Formulario normal (si no es “no autenticado…”)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">

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
          <BriefcaseIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Crear Abogado</h1>
        </div>

        {/* Error genérico */}
        {error && error !== 'No autenticado. Por favor, inicia sesión.' && (
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

          {/* Carnet de Identidad */}
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

          {/* Correo */}
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

          {/* Botón */}
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
