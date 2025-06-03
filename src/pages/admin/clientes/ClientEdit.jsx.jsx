import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Iconos
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  KeyIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

function ClientEdit() {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    carnet_identidad: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // 1) Al montar: comprueba token y luego carga el cliente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    fetchCliente(token);
  }, [id, navigate]);

  // 2) Fetch del cliente por ID (con token)
  const fetchCliente = async (token) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/clientes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCliente(response.data);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesión inválida o sin permisos. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Error al cargar los datos del cliente');
      }
      console.error(err);
    }
  };

  // 3) Manejar cambios (excepto CI)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'carnet_identidad') return;
    setCliente({ ...cliente, [name]: value });
  };

  // 4) Enviar cambios (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/clientes/update/${id}`,
        cliente,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/clientes/list');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Sesión inválida o sin permisos. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError('Error al actualizar el cliente');
      }
      console.error(err);
    }
  };

  // 5) Botón para volver al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  // 6) Si el error es “No autenticado…”, mostramos solo la alerta grande
  if (error === 'No autenticado. Por favor, inicia sesión.') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-lg bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

        {/* Botón de regresar al Dashboard */}
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
          Editar Cliente
        </h2>

        {/* Mostrar error */}
        {error && error !== 'No autenticado. Por favor, inicia sesión.' && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={cliente.apellido}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Carnet de Identidad (no editable) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Carnet de Identidad
            </label>
            <input
              type="text"
              name="carnet_identidad"
              value={cliente.carnet_identidad}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500"
            />
            <div className="flex items-center mt-1 text-sm text-yellow-600 dark:text-yellow-400">
              <ExclamationCircleIcon className="h-5 w-5 mr-1" />
              Este campo no se puede modificar (identificador único).
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <KeyIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={cliente.password}
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

export default ClientEdit;
