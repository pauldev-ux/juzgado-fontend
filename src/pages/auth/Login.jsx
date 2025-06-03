import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  LockOpenIcon,
  EyeIcon,
  EyeSlashIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUnlocked(false);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        correo,
        password,
      });

      // Si llegamos aquí, el login fue exitoso
      setUnlocked(true);
      setMessage('Usuario autenticado correctamente');

      const { token, user } = response.data;

      // Guarda el token bajo la clave "token"
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Espera un instante para que el usuario vea el candado abierto
      setTimeout(() => {
        const roles = user?.Roles || user?.roles || [];
        const nombresRoles = roles.map(r =>
          r.id_rol?.toLowerCase?.() || r.nombre?.toLowerCase?.() || r.toLowerCase?.()
        );

        let ruta = '/';
        if (nombresRoles.includes('admin') || nombresRoles.includes('administrador')) {
          ruta = '/admin/dashboard';
        } else if (nombresRoles.includes('juez')) {
          ruta = '/juez/dashboard';
        } else if (nombresRoles.includes('abogado')) {
          ruta = '/abogado/dashboard';
        } else if (nombresRoles.includes('cliente')) {
          ruta = '/cliente/dashboard';
        }

        setLoading(false);
        navigate(ruta);
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.error || 'Error desconocido';
      setError(msg);
      setUnlocked(false);
      setLoading(false);
      setMessage('');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg pt-6 pb-8 px-8 min-h-[500px] flex flex-col justify-center items-center transition-all duration-300 relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-28 h-28 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-yellow-100 dark:bg-yellow-500 shadow-lg animate-spin">
              <ScaleIcon className="w-12 h-12 text-yellow-700 dark:text-white" />
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-200 font-medium text-center">
              {message || 'Autenticando...'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4 transition-transform duration-500 ease-in-out">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full p-4">
                {unlocked ? (
                  <LockOpenIcon className="h-14 w-14 scale-110 transition-transform duration-500" />
                ) : (
                  <LockClosedIcon className="h-14 w-14" />
                )}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Iniciar Sesión
            </h2>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 mb-4 rounded">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-2 mb-4 rounded">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-3 top-2.5 text-blue-700 dark:text-blue-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="********"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
              >
                Iniciar Sesión
              </button>

              <div className="text-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ¿No tienes una cuenta?
                </span>
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  className="ml-2 text-blue-600 hover:underline text-sm font-medium"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
