import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Heroicons
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

function ClientEdit() {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener datos del cliente
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/clientes/${id}`);
        const { nombre, apellido, carnet_identidad, email } = response.data;
        setNombre(nombre);
        setApellido(apellido);
        setCarnetIdentidad(carnet_identidad);
        setEmail(email);
      } catch (err) {
        setError('Error al cargar los datos del cliente');
        console.error(err);
      }
    };

    fetchClient();
  }, [id]);

  // Enviar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/clientes/update/${id}`, {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad, // Aunque no cambie, se envía igual
        email,
        password,
      });
      navigate('/clientes/list'); // Redirección corregida
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600" />
          Editar Cliente
        </h1>

        {/* Mostrar error general */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo: Nombre */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Campo: Apellido */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Apellido
            </label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Campo: Carnet de Identidad (solo lectura) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500" />
              Carnet de Identidad
            </label>
            <input
              type="text"
              value={carnetIdentidad}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
            {/* Aviso visual explicando por qué no se puede editar */}
            <div className="flex items-center mt-1 text-sm text-yellow-600">
              <ExclamationCircleIcon className="h-5 w-5 mr-1" />
              Este campo no se puede modificar porque es un identificador único del cliente.
            </div>
          </div>

          {/* Campo: Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-500" />
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <LockClosedIcon className="h-5 w-5 mr-2 text-blue-500" />
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Actualizar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClientEdit;
