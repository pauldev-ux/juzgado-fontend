import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Iconos de Heroicons
import {
  UserIcon,
  IdentificationIcon,
  ScaleIcon,
  DocumentTextIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

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
  const [success, setSuccess] = useState('');  // NUEVO: Estado para el mensaje de éxito

  const navigate = useNavigate();

  // Cargar datos para selectores
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/expedientes/clientes');
        setClientes(response.data);
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      }
    };

    const fetchAbogados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/expedientes/abogados');
        setAbogados(response.data);
      } catch (err) {
        setError('Error al cargar los abogados');
        console.error(err);
      }
    };

    const fetchJueces = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/expedientes/jueces');
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
      // Enviar datos para crear el expediente
      await axios.post('http://localhost:3000/api/expedientes/', {
        demandante_carnet: demandanteCarnet,
        demandado_carnet: demandadoCarnet,
        abogado_demandante_carnet: abogadoDemandanteCarnet,
        abogado_demandado_carnet: abogadoDemandadoCarnet,
        juez_carnet: juezCarnet,
        contenido,
      });

      setSuccess('Expediente creado con éxito');  // NUEVO: mensaje de éxito
      setTimeout(() => {
        navigate('/expedientes/list');  // Redireccionamiento después de un pequeño retraso
      }, 2000);  // Retraso de 2 segundos para que el mensaje de éxito sea visible
    } catch (err) {
      const mensaje = err.response?.data?.message || 'Error al crear el expediente';
      setError(mensaje);
      console.error(err);
    }
  };

  // NUEVO: Función para regresar al dashboard
  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8">

        {/* NUEVO: Botón regresar al Dashboard, estilo uniforme */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
            Regresar al Dashboard
          </button>
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <DocumentTextIcon className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Crear Expediente</h1>
        </div>

        {/* Mostrar errores */}
        {error && (
          <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-3 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Mostrar éxito */}
        {success && (
          <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 p-3 mb-4 rounded">
            {success}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campos de selección */}
          {[{
            id: 'demandante_carnet',
            label: 'Carnet de Demandante',
            value: demandanteCarnet,
            onChange: setDemandanteCarnet,
            options: clientes.filter(c => c.carnet_identidad !== demandadoCarnet),
            icon: <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />,
          }, {
            id: 'demandado_carnet',
            label: 'Carnet de Demandado',
            value: demandadoCarnet,
            onChange: setDemandadoCarnet,
            options: clientes.filter(c => c.carnet_identidad !== demandanteCarnet),
            icon: <UserIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />,
          }, {
            id: 'abogado_demandante_carnet',
            label: 'Abogado Demandante',
            value: abogadoDemandanteCarnet,
            onChange: setAbogadoDemandanteCarnet,
            options: abogados,
            icon: <IdentificationIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />,
          }, {
            id: 'abogado_demandado_carnet',
            label: 'Abogado Demandado',
            value: abogadoDemandadoCarnet,
            onChange: setAbogadoDemandadoCarnet,
            options: abogados,
            icon: <IdentificationIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />,
          }, {
            id: 'juez_carnet',
            label: 'Juez Asignado',
            value: juezCarnet,
            onChange: setJuezCarnet,
            options: jueces,
            icon: <ScaleIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />,
          }].map(({ id, label, value, onChange, options, icon }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {label}
              </label>
              <div className="relative">
                {icon}
                <select
                  id={id}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {options.map((opt) => (
                    <option key={opt.id} value={opt.carnet_identidad}>
                      {opt.nombre} {opt.apellido} - {opt.carnet_identidad}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Campo de contenido */}
          <div>
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Contenido del Expediente
            </label>
            <div className="relative">
              <DocumentTextIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <textarea
                id="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Botón de enviar */}
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
