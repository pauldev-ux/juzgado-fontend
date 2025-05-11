import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// NUEVO: importación de Heroicons tipo outline para consistencia visual
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ScaleIcon, // NUEVO: ícono representativo para jueces (balanza)
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

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos los datos para crear el nuevo juez
      await axios.post('http://localhost:3001/api/jueces', {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });

      // NUEVO: Redirige a la lista de jueces después de la creación
      navigate('/jueces/list');
    } catch (err) {
      setError('Error al crear el juez');
      console.error(err);
    }
  };

  return (
    // NUEVO: se añade max-w-xl y mx-auto para centrar y limitar el ancho en pantallas grandes
    <div className="p-4 sm:p-6 max-w-xl mx-auto">

      {/* NUEVO: encabezado centrado con ícono decorativo */}
      <div className="text-center mb-6">
        <ScaleIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" /> {/* NUEVO: icono representativo del juez */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Crear Juez</h1>
      </div>

      {/* Mostrar mensaje de error si existe */}
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>}

      {/* Formulario con campos estilizados y responsivos */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Campo: Nombre */}
        <div>
          <label htmlFor="nombre" className="block font-medium mb-1">Nombre</label>
          <div className="relative">
            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Campo: Apellido */}
        <div>
          <label htmlFor="apellido" className="block font-medium mb-1">Apellido</label>
          <div className="relative">
            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Campo: Carnet de Identidad */}
        <div>
          <label htmlFor="carnet_identidad" className="block font-medium mb-1">Carnet de Identidad</label>
          <div className="relative">
            <IdentificationIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="carnet_identidad"
              maxLength={10} // NUEVO: límite de 10 dígitos
              placeholder="Máximo 10 dígitos"
              value={carnetIdentidad}
              onChange={(e) => setCarnetIdentidad(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         placeholder:text-gray-300" // NUEVO: placeholder sutil
              required
            />
          </div>
        </div>

        {/* Campo: Correo */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Correo</label>
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Campo: Contraseña */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Contraseña</label>
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Crear Juez
        </button>
      </form>
    </div>
  );
}

export default JuezCreate;
