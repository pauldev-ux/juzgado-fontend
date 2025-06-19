import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

function ClientEdit() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '',
    telefono: '', calle: '', ciudad: '', codigo_postal: '', estado_usuario: 'Activo'
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

    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/clientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setForm({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          email: data.email || '',
          password: '',
          telefono: data.telefono?.replace('+591 ', '') || '',
          calle: data.calle || '',
          ciudad: data.ciudad || '',
          codigo_postal: data.codigo_postal || '',
          estado_usuario: data.estado_usuario || 'Activo'
        });
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del cliente');
      }
    };

    fetchCliente(); // ✅ Se llama aquí directamente
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      const clean = value.replace(/\D/g, '').slice(0, 8);
      setForm((prev) => ({ ...prev, telefono: clean }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...form,
      telefono: form.telefono ? `+591 ${form.telefono}` : null
    };
    try {
      await axios.put(`http://localhost:3000/api/clientes/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/clientes/list');
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el cliente');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1DFC4] dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#3B2A2F] rounded-2xl shadow p-8">
        <button onClick={() => navigate('/clientes/list')} className="flex items-center text-blue-600 dark:text-blue-300 mb-6">
          <ArrowLeftCircleIcon className="w-5 h-5 mr-2" /> Volver a la lista
        </button>

        <div className="text-center mb-6">
          <UserCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-[#3B2A2F] dark:text-[#F1DFC4]">Editar Cliente</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 dark:bg-red-800 dark:text-red-200">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CampoTexto label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Correo" name="email" value={form.email} onChange={handleChange} Icon={EnvelopeIcon} type="email" required />
          <CampoTexto label="Contraseña" name="password" value={form.password} onChange={handleChange} Icon={LockClosedIcon} type="password" required />
          <CampoTexto label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} Icon={PhoneIcon} placeholder="+591" />
          <CampoTexto label="Calle" name="calle" value={form.calle} onChange={handleChange} Icon={MapIcon} />
          <CampoSelect label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} Icon={MapPinIcon} options={departamentos} required />
          <CampoSelect label="Código Postal" name="codigo_postal" value={form.codigo_postal} onChange={handleChange} Icon={CursorArrowRaysIcon} options={codigosPostales.map(cp => `${cp.codigo} - ${cp.nombre}`)} required />
          <CampoSelect label="Estado" name="estado_usuario" value={form.estado_usuario} onChange={handleChange} Icon={AdjustmentsHorizontalIcon} options={["Activo", "Inactivo"]} required />

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

function CampoTexto({ label, name, value, onChange, Icon, type = 'text', placeholder, required }) {
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

export default ClientEdit;
