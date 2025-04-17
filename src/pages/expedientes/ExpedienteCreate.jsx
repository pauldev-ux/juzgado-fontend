// src/pages/expedientes/ExpedienteCreate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExpedienteCreate() {
  const [demandanteCarnet, setDemandanteCarnet] = useState('');
  const [demandadoCarnet, setDemandadoCarnet] = useState('');
  const [abogadoDemandanteCarnet, setAbogadoDemandanteCarnet] = useState('');
  const [abogadoDemandadoCarnet, setAbogadoDemandadoCarnet] = useState('');
  const [juezCarnet, setJuezCarnet] = useState('');
  const [contenido, setContenido] = useState('');
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [jueces, setJueces] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los clientes
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/clientes');
        setClientes(response.data);
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      }
    };

    // Obtener los abogados
    const fetchAbogados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/abogados');
        setAbogados(response.data);
      } catch (err) {
        setError('Error al cargar los abogados');
        console.error(err);
      }
    };

    // Obtener los jueces
    const fetchJueces = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/jueces');
        setJueces(response.data);
      } catch (err) {
        setError('Error al cargar los jueces');
        console.error(err);
      }
    };

    fetchClientes();
    fetchAbogados();
    fetchJueces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/expedientes/', {
        demandante_carnet: demandanteCarnet,
        demandado_carnet: demandadoCarnet,
        abogado_demandante_carnet: abogadoDemandanteCarnet,
        abogado_demandado_carnet: abogadoDemandadoCarnet,
        juez_carnet: juezCarnet,
        contenido,
      });
      navigate('/expedientes');  // Redirige a la lista de expedientes después de la creación
    } catch (err) {
      setError('Error al crear el expediente');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Crear Expediente</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Campo para Demandante */}
        <div className="mb-4">
          <label htmlFor="demandante_carnet" className="block">Carnet de Demandante</label>
          <select
            id="demandante_carnet"
            value={demandanteCarnet}
            onChange={(e) => setDemandanteCarnet(e.target.value)}
            className="w-full p-2 border"
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.carnet_identidad}>
                {cliente.nombre} {cliente.apellido} - {cliente.carnet_identidad}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para Demandado */}
        <div className="mb-4">
          <label htmlFor="demandado_carnet" className="block">Carnet de Demandado</label>
          <select
            id="demandado_carnet"
            value={demandadoCarnet}
            onChange={(e) => setDemandadoCarnet(e.target.value)}
            className="w-full p-2 border"
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.carnet_identidad}>
                {cliente.nombre} {cliente.apellido} - {cliente.carnet_identidad}
              </option>
            ))}
          </select>
        </div>

         {/* Campo para Abogado Demandante */}
         <div className="mb-4">
          <label htmlFor="abogado_demandante_carnet" className="block">Carnet de Abogado Demandante</label>
          <select
            id="abogado_demandante_carnet"
            value={abogadoDemandanteCarnet}
            onChange={(e) => setAbogadoDemandanteCarnet(e.target.value)}
            className="w-full p-2 border"
            required
          >
            <option value="">Seleccione un abogado</option>
            {abogados.map((abogado) => (
              <option key={abogado.id} value={abogado.carnet_identidad}>
                {abogado.nombre} {abogado.apellido} - {abogado.carnet_identidad}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para Abogado Demandado */}
        <div className="mb-4">
          <label htmlFor="abogado_demandado_carnet" className="block">Carnet de Abogado Demandado</label>
          <select
            id="abogado_demandado_carnet"
            value={abogadoDemandadoCarnet}
            onChange={(e) => setAbogadoDemandadoCarnet(e.target.value)}
            className="w-full p-2 border"
            required
          >
            <option value="">Seleccione un abogado</option>
            {abogados.map((abogado) => (
              <option key={abogado.id} value={abogado.carnet_identidad}>
                {abogado.nombre} {abogado.apellido} - {abogado.carnet_identidad}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para Juez */}
        <div className="mb-4">
          <label htmlFor="juez_carnet" className="block">Carnet de Juez</label>
          <select
            id="juez_carnet"
            value={juezCarnet}
            onChange={(e) => setJuezCarnet(e.target.value)}
            className="w-full p-2 border"
            required
          >
            <option value="">Seleccione un juez</option>
            {jueces.map((juez) => (
              <option key={juez.id} value={juez.carnet_identidad}>
                {juez.nombre} {juez.apellido} - {juez.carnet_identidad}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="contenido" className="block">Contenido</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-2 border"
            required
          ></textarea>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Crear Expediente</button>
      </form>
    </div>
  );
}

export default ExpedienteCreate;
