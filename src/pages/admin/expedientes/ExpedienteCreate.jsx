import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Nuevos íconos agregados para estética visual
import {
  UserIcon,
  IdentificationIcon,
  ScaleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

function ExpedienteCreate() {
  // Estados para los campos del formulario
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

  // Cargar datos de clientes, abogados y jueces al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/clientes');
        setClientes(response.data);
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      }
    };

    const fetchAbogados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expedientes/abogados');
        setAbogados(response.data);
      } catch (err) {
        setError('Error al cargar los abogados');
        console.error(err);
      }
    };

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

  // Enviar formulario para crear expediente
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

      // NUEVO: Redirige a la lista de expedientes después de crear exitosamente
      navigate('/expedientes/list');
    } catch (err) {
      // NUEVO: Mejora la visualización del error
      const mensaje = err.response?.data?.message || 'Error al crear el expediente';
      setError(mensaje);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">

        {/* Título con ícono */}
        <div className="text-center mb-6">
          <DocumentTextIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Crear Expediente</h1>
        </div>

        {/* Mostrar error si lo hay */}
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Demandante */}
          <div>
            <label htmlFor="demandante_carnet" className="block text-sm font-medium text-gray-700 mb-1">
              Carnet de Demandante
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <select
                id="demandante_carnet"
                value={demandanteCarnet}
                onChange={(e) => setDemandanteCarnet(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un cliente</option>
                {clientes
                  .filter(c => c.carnet_identidad !== demandadoCarnet)
                  .map(cliente => (
                    <option key={cliente.id} value={cliente.carnet_identidad}>
                      {cliente.nombre} {cliente.apellido} - {cliente.carnet_identidad}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Demandado */}
          <div>
            <label htmlFor="demandado_carnet" className="block text-sm font-medium text-gray-700 mb-1">
              Carnet de Demandado
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <select
                id="demandado_carnet"
                value={demandadoCarnet}
                onChange={(e) => setDemandadoCarnet(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un cliente</option>
                {clientes
                  .filter(c => c.carnet_identidad !== demandanteCarnet)
                  .map(cliente => (
                    <option key={cliente.id} value={cliente.carnet_identidad}>
                      {cliente.nombre} {cliente.apellido} - {cliente.carnet_identidad}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Abogado Demandante */}
          <div>
            <label htmlFor="abogado_demandante_carnet" className="block text-sm font-medium text-gray-700 mb-1">
              Abogado Demandante
            </label>
            <div className="relative">
              <IdentificationIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <select
                id="abogado_demandante_carnet"
                value={abogadoDemandanteCarnet}
                onChange={(e) => setAbogadoDemandanteCarnet(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un abogado</option>
                {abogados.map(abogado => (
                  <option key={abogado.id} value={abogado.carnet_identidad}>
                    {abogado.nombre} {abogado.apellido} - {abogado.carnet_identidad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Abogado Demandado */}
          <div>
            <label htmlFor="abogado_demandado_carnet" className="block text-sm font-medium text-gray-700 mb-1">
              Abogado Demandado
            </label>
            <div className="relative">
              <IdentificationIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <select
                id="abogado_demandado_carnet"
                value={abogadoDemandadoCarnet}
                onChange={(e) => setAbogadoDemandadoCarnet(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un abogado</option>
                {abogados.map(abogado => (
                  <option key={abogado.id} value={abogado.carnet_identidad}>
                    {abogado.nombre} {abogado.apellido} - {abogado.carnet_identidad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Juez */}
          <div>
            <label htmlFor="juez_carnet" className="block text-sm font-medium text-gray-700 mb-1">
              Juez Asignado
            </label>
            <div className="relative">
              <ScaleIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
              <select
                id="juez_carnet"
                value={juezCarnet}
                onChange={(e) => setJuezCarnet(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un juez</option>
                {jueces.map(juez => (
                  <option key={juez.id} value={juez.carnet_identidad}>
                    {juez.nombre} {juez.apellido} - {juez.carnet_identidad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contenido */}
          <div>
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
              Contenido del Expediente
            </label>
            <div className="relative">
              <DocumentTextIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <textarea
                id="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Botón enviar */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition"
            >
              Crear Expediente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpedienteCreate;
