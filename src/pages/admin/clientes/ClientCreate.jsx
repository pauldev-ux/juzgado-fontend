import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon, // NUEVO: icono bonito para representar a cliente
} from '@heroicons/react/24/outline';

function ClientCreate() {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/clientes', {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });

      // NUEVO: Redireccionamos a la lista principal de clientes
      navigate('/clientes/list');
    } catch (err) {
      setError('Error al crear el cliente');
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      {/* NUEVO: Encabezado con ícono */}
      <div className="text-center mb-6">
        <UserCircleIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Crear Cliente</h1>
      </div>

      {/* Mostrar errores si existen */}
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo: Nombre */}
        <div>
          <label htmlFor="nombre" className="block font-medium mb-1">Nombre</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Campo: Apellido */}
        <div>
          <label htmlFor="apellido" className="block font-medium mb-1">Apellido</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Campo: Carnet de Identidad */}
        <div>
          <label htmlFor="carnet_identidad" className="block font-medium mb-1">Carnet de Identidad</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              id="carnet_identidad"
              maxLength={10} // NUEVO: Límite de 10 caracteres
              placeholder="Máximo 10 dígitos"
              value={carnetIdentidad}
              onChange={(e) => setCarnetIdentidad(e.target.value)}
              className="w-full focus:outline-none placeholder:text-gray-300" // NUEVO: texto sutil
              required
            />
          </div>
        </div>

        {/* Campo: Correo */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Correo</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Campo: Contraseña */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Contraseña</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Crear Cliente
        </button>
      </form>
    </div>
  );
}

export default ClientCreate;
