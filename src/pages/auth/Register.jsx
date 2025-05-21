import React, { useState } from 'react';
import axios from 'axios';

// ✅ Importamos íconos de Heroicons
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserGroupIcon,
  IdentificationIcon, // 🆕 Ícono decorativo superior
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // 🧠 Estados para campos del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('cliente');

  // 🔔 Mensajes para feedback
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ✅ Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 📤 Llamada a la API para registrar usuario
      const response = await axios.post('http://localhost:3001/api/register/', {
        username,
        email,
        password,
        role_name: roleName,
      });

      // 👍 Usuario registrado con éxito
      setMessage('Usuario registrado exitosamente');
      setError('');
      console.log(response.data);
    } catch (err) {
      // ❌ Error al registrar
      setError('Error al registrar el usuario');
      setMessage('');
      console.error(err);
    }
  };

  // 🆕 Redirige al login
  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    // 🎯 Fondo claro y formulario centrado (modo oscuro compatible)
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* 🧱 Contenedor del formulario (modo claro/oscuro) */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg pt-6 pb-8 px-8">

        {/* 🆕 Ícono decorativo arriba del título */}
        <div className="flex justify-center mb-2 -mt-1">
          <IdentificationIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>

        {/* 🏷️ Título del formulario */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Registrar Usuario
        </h2>

        {/* ⚠️ Mensaje de error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 border border-red-400 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* ✅ Mensaje de éxito */}
        {message && (
          <div className="bg-green-100 dark:bg-green-200 text-green-700 border border-green-400 px-4 py-2 mb-4 rounded">
            {message}
          </div>
        )}

        {/* 📝 Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 👤 Nombre de Usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Nombre de Usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* 🔵 Ícono azul */}
                <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Tu nombre de usuario"
              />
            </div>
          </div>

          {/* 📧 Correo Electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* 🔵 Ícono azul */}
                <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          {/* 🔐 Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* 🔵 Ícono azul */}
                <LockClosedIcon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="********"
              />
            </div>
          </div>

          {/* 🧾 Rol (Select) */}
          <div>
            <label htmlFor="role_name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Rol
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* 🔵 Ícono azul oscuro */}
                <UserGroupIcon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </span>
              <select
                id="role_name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* 📩 Botón para enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Registrar
          </button>

          {/* 🆕 Botón para redirigir al login */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">¿Ya tienes una cuenta?</span>
            <button
              type="button"
              onClick={handleRedirectToLogin}
              className="ml-2 text-blue-600 hover:underline text-sm font-medium"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
