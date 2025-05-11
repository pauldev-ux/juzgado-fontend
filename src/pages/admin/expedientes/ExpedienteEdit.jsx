import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Heroicons para una interfaz más visual
import {
  UserIcon,
  ScaleIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

function ExpedienteEdit() {
  // Estados para los datos del expediente
  const [demandanteCarnet, setDemandanteCarnet] = useState('');
  const [demandadoCarnet, setDemandadoCarnet] = useState('');
  const [abogadoDemandanteCarnet, setAbogadoDemandanteCarnet] = useState('');
  const [abogadoDemandadoCarnet, setAbogadoDemandadoCarnet] = useState('');
  const [juezCarnet, setJuezCarnet] = useState('');
  const [contenido, setContenido] = useState('');

  // Listas de opciones
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [jueces, setJueces] = useState([]);

  const { id } = useParams(); // ID del expediente a editar
  const navigate = useNavigate(); // Para redireccionar luego

  // Obtener datos del expediente actual
  useEffect(() => {
    const fetchExpediente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expedientes/${id}`);
        const {
          demandante_carnet,
          demandado_carnet,
          abogado_demandante_carnet,
          abogado_demandado_carnet,
          juez_carnet,
          contenido,
        } = response.data;

        // Setear datos en el formulario
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

  // Obtener listas para los selects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, abogadosRes, juecesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/clientes/'),
          axios.get('http://localhost:3001/api/abogados/'),
          axios.get('http://localhost:3001/api/jueces/'),
        ]);

        // Guardar datos para mostrar en select
        setClientes(clientesRes.data);
        setAbogados(abogadosRes.data);
        setJueces(juecesRes.data);
      } catch (err) {
        console.error('Error al cargar listas de selección', err);
      }
    };

    fetchData();
  }, []);

  // Enviar formulario actualizado
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
      navigate('/expedientes'); // Redirigir tras guardar
    } catch (err) {
      console.error('Error al actualizar expediente', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600" />
          Editar Expediente
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select: Demandante */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Demandante
            </label>
            <select
              value={demandanteCarnet}
              onChange={(e) => setDemandanteCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((c) => (
                <option key={c.carnet_identidad} value={c.carnet_identidad}>
                  {c.nombre} {c.apellido} ({c.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Select: Demandado */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Demandado
            </label>
            <select
              value={demandadoCarnet}
              onChange={(e) => setDemandadoCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((c) => (
                <option key={c.carnet_identidad} value={c.carnet_identidad}>
                  {c.nombre} {c.apellido} ({c.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Select: Abogado del Demandante */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500" />
              Abogado del Demandante
            </label>
            <select
              value={abogadoDemandanteCarnet}
              onChange={(e) => setAbogadoDemandanteCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Seleccione un abogado</option>
              {abogados.map((a) => (
                <option key={a.carnet_identidad} value={a.carnet_identidad}>
                  {a.nombre} {a.apellido} ({a.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Select: Abogado del Demandado */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500" />
              Abogado del Demandado
            </label>
            <select
              value={abogadoDemandadoCarnet}
              onChange={(e) => setAbogadoDemandadoCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Seleccione un abogado</option>
              {abogados.map((a) => (
                <option key={a.carnet_identidad} value={a.carnet_identidad}>
                  {a.nombre} {a.apellido} ({a.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Select: Juez */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <ScaleIcon className="h-5 w-5 mr-2 text-blue-500" />
              Juez
            </label>
            <select
              value={juezCarnet}
              onChange={(e) => setJuezCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Seleccione un juez</option>
              {jueces.map((j) => (
                <option key={j.carnet_identidad} value={j.carnet_identidad}>
                  {j.nombre} {j.apellido} ({j.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Campo: Contenido del expediente */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
              Contenido del Expediente
            </label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none"
              required
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpedienteEdit;
