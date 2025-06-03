import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FolderIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

function JuezSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-blue-700 dark:bg-gray-900 text-white h-screen transition-all duration-150 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } fixed top-0 left-0 z-40 shadow-lg`}
    >
      {/* Botón hamburguesa */}
      <div className="flex justify-end p-4 md:justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="relative w-8 h-6 flex flex-col justify-between items-center group focus:outline-none hover:scale-110 transition-transform duration-200"
        >
          <span className={`w-6 h-0.5 bg-white transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Título */}
      <div className="px-6 h-8 mb-6 flex items-center">
        <span className={`text-xl font-bold transform transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none select-none'}`}>
          <Link to="/juez/dashboard">Juez</Link>
        </span>
      </div>

      {/* Navegación */}
      <nav className="px-2 space-y-4">
        <SidebarLink
          to="/juez/dashboard"
          icon={<HomeIcon className="h-5 w-5" />}
          label="Dashboard"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          to="/juez/dashboard"
          icon={<FolderIcon className="h-5 w-5" />}
          label="Mis Expedientes"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          to="/audiencias/calendario"
          icon={<CalendarDaysIcon className="h-5 w-5" />}
          label="Calendario"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          to="/audiencias/resolver"
          icon={<ClipboardDocumentCheckIcon className="h-5 w-5" />}
          label="Resolver"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          to="/audiencias/observaciones"
          icon={<PencilSquareIcon className="h-5 w-5" />}
          label="Observaciones"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </nav>
    </div>
  );
}

// Enlace de navegación
function SidebarLink({ to, icon, label, isOpen, setIsOpen }) {
  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-800 transition-colors"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}

export default JuezSidebar;
