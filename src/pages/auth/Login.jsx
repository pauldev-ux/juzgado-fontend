import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 🆕 Importamos los íconos de Heroicons
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      setMessage('Usuario autenticado correctamente');
      const { token, usuario, redirect } = response.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));

      navigate(redirect); // redirige según el tipo de usuario
    } catch (err) {
      setError('Credenciales inválidas');
      console.error(err);
    }
  };

  // 🆕 Redirige al formulario de registro
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    // 🆕 Agregamos soporte para fondo oscuro
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Contenedor principal con sombra y bordes redondeados */}
      {/* 🆕 Aumentamos altura mínima y ajustamos el padding para reducir espacio inferior */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg pt-6 pb-8 px-8 min-h-[500px] flex flex-col justify-start mt-8">
        
        {/* 🆕 Ícono decorativo de login centrado */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full p-4">
            <LockClosedIcon className="h-16 w-16" />
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Iniciar Sesión
        </h2>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 border border-red-400 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 dark:bg-green-200 text-green-700 border border-green-400 px-4 py-2 mb-4 rounded">
            {message}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Iniciar Sesión
          </button>

          {/* 🆕 Botón de registro */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">¿No tienes una cuenta?</span>
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="ml-2 text-blue-600 hover:underline text-sm font-medium"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
