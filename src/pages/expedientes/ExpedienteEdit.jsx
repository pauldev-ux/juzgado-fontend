import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ExpedienteEdit() {
  const [demandanteCarnet, setDemandanteCarnet] = useState('');
  const [demandadoCarnet, setDemandadoCarnet] = useState('');
  const [abogadoDemandanteCarnet, setAbogadoDemandanteCarnet] = useState('');
  const [abogadoDemandadoCarnet, setAbogadoDemandadoCarnet] = useState('');
  const [juezCarnet, setJuezCarnet] = useState('');
  const [contenido, setContenido] = useState('');
  
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [jueces, setJueces] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar los datos del expediente
  useEffect(() => {
    const fetchExpediente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expedientes/${id}`);
        const { demandante_carnet, demandado_carnet, abogado_demandante_carnet, abogado_demandado_carnet, juez_carnet, contenido } = response.data;
        
        setDemandanteCarnet(demandante_carnet);
        setDemandadoCarnet(demandado_carnet);
        setAbogadoDemandanteCarnet(abogado_demandante_carnet);
        setAbogadoDemandadoCarnet(abogado_demandado_carnet);
        setJuezCarnet(juez_carnet);
        setContenido(contenido);
      } catch (err) {
        console.error('Error al cargar los datos del expediente', err);
      }
    };

    fetchExpediente();
  }, [id]);

  // Obtener clientes, abogados y jueces
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get('http://localhost:3001/api/clientes/');
        const abogadosResponse = await axios.get('http://localhost:3001/api/abogados/');
        const juecesResponse = await axios.get('http://localhost:3001/api/jueces/');

        setClientes(clientesResponse.data);
        setAbogados(abogadosResponse.data);
        setJueces(juecesResponse.data);
      } catch (err) {
        console.error('Error al cargar los datos', err);
      }
    };

    fetchData();
  }, []);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/expedientes/update/${id}`, {
        demandante_carnet: demandanteCarnet,
        demandado_carnet: demandadoCarnet,
        abogado_demandante_carnet: abogadoDemandanteCarnet,
        abogado_demandado_carnet: abogadoDemandadoCarnet,
        juez_carnet: juezCarnet,
        contenido,
      });
      navigate('/expedientes');  // Redirigir después de actualizar
    } catch (err) {
      console.error('Error al actualizar expediente', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Editar Expediente</h1>
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

        {/* Campo para el contenido */}
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

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Actualizar Expediente</button>
      </form>
    </div>
  );
}

export default ExpedienteEdit;
