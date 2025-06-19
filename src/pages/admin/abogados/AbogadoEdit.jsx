import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  UserIcon, EnvelopeIcon, LockClosedIcon,
  IdentificationIcon, ArrowLeftCircleIcon, PencilSquareIcon, ExclamationCircleIcon
} from '@heroicons/react/24/outline';

function AbogadoEdit() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', carnet_identidad: '',
    email: '', password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const fetchAbogado = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/abogados/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setForm({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          carnet_identidad: data.carnet_identidad || '',
          email: data.email || '',
          password: ''
        });
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del abogado');
      }
    };

    fetchAbogado();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'carnet_identidad') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
          await axios.put(`http://localhost:3000/api/abogados/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/abogados/list');
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el abogado');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1DFC4] dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#3B2A2F] rounded-2xl shadow p-8">
        <button onClick={() => navigate('/abogados/list')} className="flex items-center text-blue-600 dark:text-blue-300 mb-6">
          <ArrowLeftCircleIcon className="w-5 h-5 mr-2" /> Volver a la lista
        </button>

        <div className="text-center mb-6">
          <PencilSquareIcon className="h-10 w-10 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-[#3B2A2F] dark:text-[#F1DFC4]">Editar Abogado</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 dark:bg-red-800 dark:text-red-200">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CampoTexto label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Correo" name="email" value={form.email} onChange={handleChange} Icon={EnvelopeIcon} type="email" required />
          <CampoTexto label="Contraseña" name="password" value={form.password} onChange={handleChange} Icon={LockClosedIcon} type="password" required />

          {/* Carnet de identidad (editable) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#3B2A2F] dark:text-[#F1DFC4] mb-1">Carnet de Identidad</label>
            <div className="relative">
              <IdentificationIcon className="h-5 w-5 text-[#3B2A2F] dark:text-[#F1DFC4] absolute top-2.5 left-3" />
              <input
                type="text"
                name="carnet_identidad"
                value={form.carnet_identidad}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-[#3B2A2F] rounded bg-[#F1DFC4] dark:bg-[#4e3a40] text-[#3B2A2F] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 text-right mt-4">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded shadow">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CampoTexto({ label, name, value, onChange, Icon, type = 'text', required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3B2A2F] dark:text-[#F1DFC4] mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="h-5 w-5 text-[#3B2A2F] dark:text-[#F1DFC4] absolute top-2.5 left-3" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-2 border border-[#3B2A2F] rounded bg-[#F1DFC4] dark:bg-[#4e3a40] text-[#3B2A2F] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        />
      </div>
    </div>
  );
}

export default AbogadoEdit;
