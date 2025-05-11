import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Importamos iconos elegantes desde Heroicons
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BriefcaseIcon, // NUEVO: Icono representativo para abogados
} from '@heroicons/react/24/outline';

function AbogadoCreate() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/abogados', {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });

      // ✅ REDIRECCIÓN ACTUALIZADA
      navigate('/abogados/list');
    } catch (err) {
      setError('Error al crear el abogado');
      console.error(err);
    }
  };

  return (
    // Contenedor centrado y responsivo usando flex y Tailwind
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        
        {/* NUEVO: encabezado con ícono y centrado */}
        <div className="text-center mb-6">
          <BriefcaseIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-semibold text-gray-800">Crear Abogado</h1>
        </div>

        {/* Muestra el error si existe */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-center shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <div className="flex items-center border rounded px-3 py-2">
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
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <div className="flex items-center border rounded px-3 py-2">
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

          {/* Campo: Carnet de Identidad con límite y texto sutil */}
          <div>
            <label htmlFor="carnet_identidad" className="block text-sm font-medium text-gray-700 mb-1">
              Carnet de Identidad
            </label>
            <div className="flex items-center border rounded px-3 py-2">
              <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                id="carnet_identidad"
                value={carnetIdentidad}
                onChange={(e) => setCarnetIdentidad(e.target.value)}
                maxLength={10} // ✅ Límite de 10 dígitos
                placeholder="Máximo 10 dígitos" // ✅ Placeholder informativo
                className="w-full focus:outline-none placeholder:text-gray-300" // ✅ Estilo transparente
                required
              />
            </div>
          </div>

          {/* Campo: Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <div className="flex items-center border rounded px-3 py-2">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="flex items-center border rounded px-3 py-2">
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
            Crear Abogado
          </button>
        </form>
      </div>
    </div>
  );
}

export default AbogadoCreate;
