import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UserIcon,
  IdentificationIcon,
  PencilSquareIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

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

  // Cargar listas y expediente en orden
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar listas de selección
        const [clientesRes, abogadosRes, juecesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/clientes/'),
          axios.get('http://localhost:3001/api/abogados/'),
          axios.get('http://localhost:3001/api/jueces/'),
        ]);

        setClientes(clientesRes.data);
        setAbogados(abogadosRes.data);
        setJueces(juecesRes.data);

        // Luego cargar el expediente
        const expedienteRes = await axios.get(`http://localhost:3001/api/expedientes/${id}`);
        const {
          demandante_carnet,
          demandado_carnet,
          abogado_demandante_carnet,
          abogado_demandado_carnet,
          juez_carnet,
          contenido,
        } = expedienteRes.data;

        // Asegurar que sean strings para que coincidan con los <option value="">
        setDemandanteCarnet(String(demandante_carnet));
        setDemandadoCarnet(String(demandado_carnet));
        setAbogadoDemandanteCarnet(String(abogado_demandante_carnet));
        setAbogadoDemandadoCarnet(String(abogado_demandado_carnet));
        setJuezCarnet(String(juez_carnet));
        setContenido(contenido);
      } catch (err) {
        console.error('Error al cargar datos del expediente o listas', err);
      }
    };

    fetchData();
  }, [id]);

  // Guardar cambios
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
      navigate('/expedientes/list'); // Redirige correctamente después de guardar
    } catch (err) {
      console.error('Error al actualizar expediente', err);
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg p-8">

        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8 flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Editar Expediente
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Demandante */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Demandante
            </label>
            <select
              value={demandanteCarnet}
              onChange={(e) => setDemandanteCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option
                  key={cliente.carnet_identidad}
                  value={String(cliente.carnet_identidad)}
                >
                  {cliente.nombre} {cliente.apellido} ({cliente.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Demandado */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Demandado
            </label>
            <select
              value={demandadoCarnet}
              onChange={(e) => setDemandadoCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option
                  key={cliente.carnet_identidad}
                  value={String(cliente.carnet_identidad)}
                >
                  {cliente.nombre} {cliente.apellido} ({cliente.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Abogado del Demandante */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Abogado del Demandante
            </label>
            <select
              value={abogadoDemandanteCarnet}
              onChange={(e) => setAbogadoDemandanteCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un abogado</option>
              {abogados.map((abogado) => (
                <option
                  key={abogado.carnet_identidad}
                  value={String(abogado.carnet_identidad)}
                >
                  {abogado.nombre} {abogado.apellido} ({abogado.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Abogado del Demandado */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Abogado del Demandado
            </label>
            <select
              value={abogadoDemandadoCarnet}
              onChange={(e) => setAbogadoDemandadoCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un abogado</option>
              {abogados.map((abogado) => (
                <option
                  key={abogado.carnet_identidad}
                  value={String(abogado.carnet_identidad)}
                >
                  {abogado.nombre} {abogado.apellido} ({abogado.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Juez */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              <IdentificationIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Juez
            </label>
            <select
              value={juezCarnet}
              onChange={(e) => setJuezCarnet(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un juez</option>
              {jueces.map((juez) => (
                <option
                  key={juez.carnet_identidad}
                  value={String(juez.carnet_identidad)}
                >
                  {juez.nombre} {juez.apellido} ({juez.carnet_identidad})
                </option>
              ))}
            </select>
          </div>

          {/* Contenido */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contenido del Expediente
            </label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
            ></textarea>
          </div>

          {/* Botón guardar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpedienteEdit;