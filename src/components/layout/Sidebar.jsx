// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-semibold mb-6">
        <Link to="/" className="text-white hover:text-gray-300">Menu principal</Link>
      </div>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>

        {/* Enlace a Clientes */}
        <li>
          <Link to="/clientes" className="hover:text-gray-300">Clientes</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/clientes/list" className="hover:text-gray-300">Lista de Clientes</Link></li>
            <li><Link to="/clientes/create" className="hover:text-gray-300">Crear Cliente</Link></li>
          </ul>
        </li>

        {/* Enlace a Expedientes */}
        <li>
          <Link to="/expedientes" className="hover:text-gray-300">Expedientes</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/expedientes/list" className="hover:text-gray-300">Lista de Expedientes</Link></li>
            <li><Link to="/expedientes/create" className="hover:text-gray-300">Crear Expediente</Link></li>
          </ul>
        </li>

        {/* Enlace a Abogados */}
        <li>
          <Link to="/abogados" className="hover:text-gray-300">Abogados</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/abogados/list" className="hover:text-gray-300">Lista de Abogados</Link></li>
            <li><Link to="/abogados/create" className="hover:text-gray-300">Crear Abogado</Link></li>
          </ul>
        </li>

          {/* Enlace a Jueces */}
          <li>
          <Link to="/jueces" className="hover:text-gray-300">Jueces</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/jueces/list" className="hover:text-gray-300">Lista de Jueces</Link></li>
            <li><Link to="/jueces/create" className="hover:text-gray-300">Crear Jueces</Link></li>
          </ul>
        </li>


      </ul>
    </div>
  );
}

export default Sidebar;
