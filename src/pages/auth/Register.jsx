import React, { useState } from 'react';
import axios from 'axios';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserGroupIcon,
  IdentificationIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const inicialesPorRol = {
    cliente: 'CLT',
    abogado: 'AGD',
    juez: 'JUZ',
  };

  const handleRolChange = (value) => {
    setRol(value);
    const iniciales = inicialesPorRol[value] || 'USR';
    setCorreo(`${iniciales}_@gmail.com`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        nombre,
        apellido,
        correo,
        password,
        rol,
      });

      setMessage('Usuario registrado exitosamente.');

      const rutaPorRol = {
        cliente: '/cliente/dashboard',
        abogado: '/abogado/dashboard',
        juez: '/juez/dashboard',
      };

      const destino = rutaPorRol[rol] || '/';
      setTimeout(() => navigate(destino), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar el usuario');
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-lg pt-6 pb-8 px-8 transition-all duration-300 min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="w-28 h-28 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-yellow-100 dark:bg-yellow-500 shadow-lg animate-spin">
              <ScaleIcon className="w-12 h-12 text-yellow-700 dark:text-white" />
            </div>
            {message && (
              <p className="mt-4 text-gray-700 dark:text-gray-200 font-medium text-center">
                {message}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-2 -mt-1">
              <IdentificationIcon className="h-12 w-12 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-6">
              Registrar Usuario
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 mb-4 rounded dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nombre"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Apellido</label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rol</label>
                <div className="relative">
                  <UserGroupIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <select
                    value={rol}
                    onChange={(e) => handleRolChange(e.target.value)}
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="abogado">Abogado</option>
                    <option value="juez">Juez</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="********"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
              >
                Registrar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
