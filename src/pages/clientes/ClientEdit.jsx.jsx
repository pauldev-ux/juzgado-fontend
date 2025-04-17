import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ClientEdit() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();  // Captura el id de la URL
  const navigate = useNavigate();

  // Obtener los datos del cliente al cargar la página
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/clientes/${id}`);
        console.log('Respuesta de la API para obtener el cliente:', response.data);
        const { nombre, apellido, carnet_identidad, email } = response.data;
        setNombre(nombre);
        setApellido(apellido);
        setCarnetIdentidad(carnet_identidad);
        setEmail(email);
      } catch (err) {
        setError('Error al cargar los datos del cliente');
        console.error('Error al obtener cliente:', err);
      }
    };
  
    fetchClient();
  }, [id]);
  

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar para actualizar el cliente:', { nombre, apellido, carnetIdentidad, email, password });
    try {
      const response = await axios.put(`http://localhost:3001/api/clientes/update/${id}`, {
        nombre,
        apellido,
        carnet_identidad: carnetIdentidad,
        email,
        password,
      });
      console.log('Respuesta de la API al actualizar el cliente:', response.data);
      navigate('/clientes');  // Redirige a la lista de clientes después de la actualización
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error('Error al actualizar el cliente:', err);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Editar Cliente</h1>
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
        <div className="mb-4">
          <label htmlFor="password" className="block">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Actualizar Cliente</button>
      </form>
    </div>
  );
}

export default ClientEdit;
