// src/pages/abogados/AbogadoList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BriefcaseIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [abogadoToDelete, setAbogadoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const fetchAbogados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/abogados', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAbogados(response.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Sesión inválida. Inicia sesión nuevamente.');
          localStorage.clear();
          setTimeout(() => navigate('/login'), 1200);
        } else {
          setError('Error al cargar los abogados');
        }
      }
    };

    fetchAbogados();
  }, [navigate]);

  const confirmDelete = (abogado) => {
    setAbogadoToDelete(abogado);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setAbogadoToDelete(null);
    setShowConfirm(false);
  };

  const handleDeleteConfirmed = async () => {
    if (!abogadoToDelete) return;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/abogados/${abogadoToDelete.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setAbogados((prev) => prev.filter((a) => a.id !== abogadoToDelete.id));
        cancelDelete();
      }
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al eliminar el abogado');
    }
  };

  const filteredAbogados = abogados.filter((a) =>
    a.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#F1DFC4] dark:bg-[#1c1c1c] px-4 sm:px-8 py-8">
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-2xl p-6 w-full max-w-md relative border-t-4 border-[#3B2A2F]">
            <button onClick={cancelDelete} className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="rounded-full p-4 bg-[#E8D9C1] shadow-lg">
                <ScaleIcon className="h-14 w-14 text-[#3B2A2F] animate-spin-slow" />
              </div>
              <h2 className="text-xl font-bold text-[#3B2A2F] dark:text-white mt-2">¿Eliminar abogado?</h2>
            </div>
            <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-6">
              Estás por eliminar a <strong>{abogadoToDelete?.nombre} {abogadoToDelete?.apellido}</strong>.
              <br /> Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirmed} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">
                Confirmar
              </button>
            </div>
          </div>
          <style>{`
            @keyframes spin-slow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 3.5s linear infinite;
            }
          `}</style>
        </div>
      )}

      <div className="absolute top-4 left-4">
        <Link to="/admin/dashboard" className="inline-flex items-center p-3 bg-[#3B2A2F] text-[#F1DFC4] rounded-full hover:bg-[#2c1e23] transition">
          <HomeIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="mb-8 text-center">
        <div className="flex justify-center items-center space-x-2">
          <BriefcaseIcon className="h-8 w-8 text-[#3B2A2F] dark:text-[#F1DFC4]" />
          <h1 className="text-3xl font-bold text-[#3B2A2F] dark:text-[#F1DFC4]">Lista de Abogados</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 mb-6 rounded-md shadow-sm">
          {error}
        </div>
      )}

      <div className="mb-6 w-full overflow-x-auto">
        <div className="relative min-w-[700px] max-w-full mx-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3B2A2F] dark:text-[#F1DFC4]" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full p-3 pl-10 border border-[#3B2A2F] dark:border-[#F1DFC4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B2A2F] dark:focus:ring-[#F1DFC4] bg-[#F1DFC4] dark:bg-[#2e2e2e] text-[#3B2A2F] dark:text-[#F1DFC4]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#3B2A2F] text-[#F1DFC4] dark:bg-[#2a2a2a] dark:text-white shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-center">
          <thead className="bg-[#3B2A2F] dark:bg-[#1f1f1f] border-b border-[#F1DFC4] dark:border-[#444]">
            <tr>
              {['ID', 'Nombre', 'Apellido', 'Carnet', 'Correo', 'Acciones'].map((header) => (
                <th key={header} className="px-4 py-3 font-semibold uppercase text-xs tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAbogados.map((abogado) => (
              <tr key={abogado.id} className="border-t border-[#F1DFC4]/30 dark:border-[#444] hover:bg-[#4e3a40] dark:hover:bg-[#3a3a3a]">
                {[abogado.id, abogado.nombre, abogado.apellido, abogado.carnet_identidad, abogado.email].map((value, i) => (
                  <td key={i} className="px-4 py-2 bg-[#F1DFC4] dark:bg-[#2e2e2e] text-[#3B2A2F] dark:text-[#F1DFC4] text-center">
                    {value}
                  </td>
                ))}
                <td className="px-2 py-2 bg-[#F1DFC4] dark:bg-[#2e2e2e] flex justify-center gap-1">
                  <Link to={`/abogados/edit/${abogado.id}`} className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    <PencilSquareIcon className="w-4 h-4" />
                  </Link>
                  <button onClick={() => confirmDelete(abogado)} className="inline-flex items-center px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  <Link
                    to="/abogados/create"
                    className="inline-flex items-center justify-center w-8 h-8 bg-green-700 hover:bg-green-800 text-white rounded-full ml-1"
                    title="Crear abogado"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {filteredAbogados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-[#3B2A2F] dark:text-[#F1DFC4]">
                  No hay ningún abogado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AbogadoList;
