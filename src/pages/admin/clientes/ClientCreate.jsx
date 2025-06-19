import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon, EnvelopeIcon, LockClosedIcon,
  PhoneIcon, MapIcon, MapPinIcon, CursorArrowRaysIcon, AdjustmentsHorizontalIcon,
  ArrowLeftCircleIcon, UserCircleIcon
} from '@heroicons/react/24/outline';

const departamentos = [
  "La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Potosí",
  "Chuquisaca", "Tarija", "Beni", "Pando"
];

const codigosPostales = [
  { codigo: "0101", nombre: "La Paz" },
  { codigo: "0201", nombre: "Cochabamba" },
  { codigo: "0301", nombre: "Santa Cruz" },
  { codigo: "0401", nombre: "Oruro" },
  { codigo: "0501", nombre: "Potosí" },
  { codigo: "0601", nombre: "Chuquisaca" },
  { codigo: "0701", nombre: "Tarija" },
  { codigo: "0801", nombre: "Beni" },
  { codigo: "0901", nombre: "Pando" }
];

function ClientCreate() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    calle: '',
    ciudad: '',
    codigo_postal: '',
    estado_usuario: 'Activo',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => navigate('/login'), 1500);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lógica especial para teléfono (máx. 8 dígitos reales)
    if (name === 'telefono') {
      const clean = value.replace(/\D/g, '').slice(0, 8);
      setForm((prev) => ({ ...prev, telefono: clean }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEmailFocus = () => {
    if (!form.email.includes('@')) {
      setForm((prev) => ({ ...prev, email: prev.email + '@gmail.com' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: form.password,
      telefono: form.telefono ? `+591 ${form.telefono}` : null,
      calle: form.calle || null,
      ciudad: form.ciudad || null,
      codigo_postal: form.codigo_postal || null,
      estado_usuario: form.estado_usuario
    };

    try {
      await axios.post('http://localhost:3000/api/clientes', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/clientes/list');
    } catch (err) {
      console.error('Error detallado:', err.response?.data || err);
      setError(err.response?.data?.mensaje || 'Ocurrió un error al crear el cliente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1DFC4] dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#3B2A2F] rounded-2xl shadow p-8">
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-blue-600 dark:text-blue-300 mb-6">
          <ArrowLeftCircleIcon className="w-5 h-5 mr-2" />
          Regresar al Dashboard
        </button>

        <div className="text-center mb-6">
          <UserCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-[#3B2A2F] dark:text-[#F1DFC4]">Crear Cliente</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <CampoTexto label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} Icon={UserIcon} required />
          {/* Apellido */}
          <CampoTexto label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} Icon={UserIcon} required />
          {/* Email */}
          <CampoTexto label="Correo" name="email" value={form.email} onChange={handleChange} onFocus={handleEmailFocus} Icon={EnvelopeIcon} type="email" required />
          {/* Password */}
          <CampoTexto label="Contraseña" name="password" value={form.password} onChange={handleChange} Icon={LockClosedIcon} type="password" required />
          {/* Teléfono */}
          <CampoTexto label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} Icon={PhoneIcon} placeholder="+591" required />
          {/* Calle */}
          <CampoTexto label="Calle" name="calle" value={form.calle} onChange={handleChange} Icon={MapIcon} />
          {/* Ciudad */}
          <CampoSelect label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} Icon={MapPinIcon} options={departamentos} required />
          {/* Código Postal */}
          <CampoSelect label="Código Postal" name="codigo_postal" value={form.codigo_postal} onChange={handleChange} Icon={CursorArrowRaysIcon}
            options={codigosPostales.map(cp => `${cp.codigo} - ${cp.nombre}`)} required />
          {/* Estado */}
          <CampoSelect label="Estado" name="estado_usuario" value={form.estado_usuario} onChange={handleChange} Icon={AdjustmentsHorizontalIcon}
            options={['Activo', 'Inactivo']} required />

          <div className="md:col-span-2 text-right mt-4">
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded shadow">
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CampoTexto({ label, name, value, onChange, onFocus, Icon, type = 'text', placeholder, required }) {
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
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 border border-[#3B2A2F] rounded bg-[#F1DFC4] dark:bg-[#4e3a40] text-[#3B2A2F] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        />
      </div>
    </div>
  );
}

function CampoSelect({ label, name, value, onChange, Icon, options, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3B2A2F] dark:text-[#F1DFC4] mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="h-5 w-5 text-[#3B2A2F] dark:text-[#F1DFC4] absolute top-2.5 left-3" />}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-2 border border-[#3B2A2F] rounded bg-[#F1DFC4] dark:bg-[#4e3a40] text-[#3B2A2F] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        >
          <option value="">Seleccione una opción</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ClientCreate;
