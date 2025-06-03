// src/layout/AbogadoSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FolderIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

function AbogadoSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`transition-all duration-150 ease-in-out ${isOpen ? 'w-64' : 'w-20'} h-full`}>
      {/* Botón hamburguesa */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Título */}
      {isOpen && (
        <div className="px-6 h-8 mb-6 flex items-center">
          <span className="text-xl font-bold">Abogado</span>
        </div>
      )}

      {/* Navegación */}
      <nav className="px-2 space-y-2 text-sm">
        <SidebarLink to="/abogado/dashboard" icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" isOpen={isOpen} />
        <SidebarLink to="/abogado/dashboard" icon={<FolderIcon className="h-5 w-5" />} label="Mis Expedientes" isOpen={isOpen} />
        <SidebarLink to="/audiencias/calendario" icon={<CalendarDaysIcon className="h-5 w-5" />} label="Calendario" isOpen={isOpen} />
        <SidebarLink to="/audiencias/resolver" icon={<ClipboardDocumentCheckIcon className="h-5 w-5" />} label="Resolver" isOpen={isOpen} />
        <SidebarLink to="/audiencias/observaciones" icon={<PencilSquareIcon className="h-5 w-5" />} label="Observaciones" isOpen={isOpen} />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, label, isOpen }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-800 transition"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}

export default AbogadoSidebar;
