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
  ArrowLeftCircleIcon, // ✅ Icono usado para regresar
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

  // ✅ Cargar cliente por ID
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/clientes/${id}`);
        setCliente(response.data);
      } catch (err) {
        setError('Error al cargar los datos del cliente');
        console.error(err);
      }
    };

    fetchCliente();
  }, [id]);

  // ✅ Manejar cambios (excepto CI)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'carnet_identidad') return;
    setCliente({ ...cliente, [name]: value });
  };

  // ✅ Enviar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/clientes/update/${id}`, cliente);
      navigate('/clientes/list');
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error(err);
    }
  };

  // ✅ Regresar al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

        {/* Botón de regresar al Dashboard, ubicado arriba */}
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
        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campo: Nombre */}
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

          {/* Campo: Apellido */}
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

          {/* Campo: CI (no editable) */}
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
              Este campo no se puede modificar porque es un identificador único del cliente.
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
              name="email"
              value={cliente.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Campo: Contraseña */}
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
