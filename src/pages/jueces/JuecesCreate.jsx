import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JuezCreate() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/jueces', {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
      });
      navigate('/jueces');
    } catch (err) {
      setError('Error al crear el juez');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Crear Juez</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carnet_identidad" className="block">Carnet de Identidad</label>
          <input
            type="text"
            id="carnet_identidad"
            value={carnetIdentidad}
            onChange={(e) => setCarnetIdentidad(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Crear Juez</button>
      </form>
    </div>
  );
}

export default JuezCreate;
