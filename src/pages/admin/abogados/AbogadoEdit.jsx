import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Iconos Heroicons
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

function AbogadoEdit() {
  const [abogado, setAbogado] = useState({
    nombre: '',
    apellido: '',
    carnet_identidad: '',
    email: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Obtener datos del abogado por ID
  useEffect(() => {
    const fetchAbogado = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/abogados/${id}`);
        setAbogado(response.data);
      } catch (err) {
        setError('Error al cargar los datos del abogado');
        console.error(err);
      }
    };

    fetchAbogado();
  }, [id]);

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Evitar que el CI se edite accidentalmente
    if (name === 'carnet_identidad') return;

    setAbogado({ ...abogado, [name]: value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/abogados/update/${id}`, abogado);
      navigate('/abogados/list');
    } catch (err) {
      setError('Error al actualizar el abogado');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600" />
          Editar Abogado
        </h2>

        {/* Mostrar error si lo hay */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={abogado.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={abogado.apellido}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Carnet de Identidad (no editable) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500" />
              Carnet de Identidad
            </label>
            <input
              type="text"
              name="carnet_identidad"
              value={abogado.carnet_identidad}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
            <div className="flex items-center mt-1 text-sm text-yellow-600">
              <ExclamationCircleIcon className="h-5 w-5 mr-1" />
              Este campo no se puede modificar porque es un identificador único del abogado.
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-500" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={abogado.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default AbogadoEdit;
