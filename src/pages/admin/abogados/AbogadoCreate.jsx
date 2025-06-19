import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon, EnvelopeIcon, LockClosedIcon, IdentificationIcon,
  ArrowLeftCircleIcon, BriefcaseIcon, EyeIcon, EyeSlashIcon
} from '@heroicons/react/24/outline';

function AbogadoCreate() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    carnet_identidad: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    setForm((prev) => ({ ...prev, [name]: value }));
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

    try {
      await axios.post('http://localhost:3000/api/abogados', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/abogados/list');
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('No tienes permisos o tu sesión expiró.');
        localStorage.clear();
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setError(err.response?.data?.mensaje || 'Ocurrió un error al crear el abogado.');
      }
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
          <BriefcaseIcon className="h-10 w-10 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-[#3B2A2F] dark:text-[#F1DFC4]">Crear Abogado</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CampoTexto label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} Icon={UserIcon} required />
          <CampoTexto label="Carnet de Identidad" name="carnet_identidad" value={form.carnet_identidad} onChange={handleChange} Icon={IdentificationIcon} placeholder="Máximo 10 dígitos" required />
          <CampoTexto label="Correo" name="email" type="email" value={form.email} onChange={handleChange} onFocus={handleEmailFocus} Icon={EnvelopeIcon} required />
          <CampoTexto
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            Icon={LockClosedIcon}
            required
            showToggle={true}
            toggleFn={() => setShowPassword(!showPassword)}
            show={showPassword}
          />

          <div className="md:col-span-2 text-right mt-4">
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded shadow">
              Guardar Abogado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CampoTexto({ label, name, value, onChange, onFocus, Icon, type = 'text', placeholder, required, showToggle, toggleFn, show }) {
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
          maxLength={name === 'carnet_identidad' ? 10 : undefined}
          className="w-full pl-10 pr-10 py-2 border border-[#3B2A2F] rounded bg-[#F1DFC4] dark:bg-[#4e3a40] text-[#3B2A2F] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        />
        {showToggle && (
          <button
            type="button"
            onClick={toggleFn}
            className="absolute top-2.5 right-3 text-[#3B2A2F] dark:text-[#F1DFC4]"
          >
            {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default AbogadoCreate;
