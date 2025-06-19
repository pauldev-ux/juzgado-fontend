import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  BriefcaseIcon,
  ScaleIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedDropdowns, setExpandedDropdowns] = useState({});

  return (
    <div
      className={`bg-[#5A3F47] dark:bg-gray-900 text-white h-screen transition-all duration-150 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } fixed top-0 left-0 z-40 shadow-lg`}
    >
      {/* Botón hamburguesa */}
      <div className="flex justify-end p-4 md:justify-between">
        <button
          onClick={() => {
            if (isOpen) setExpandedDropdowns({});
            setIsOpen(!isOpen);
          }}
          type="button"
          className="relative w-8 h-6 flex flex-col justify-between items-center group focus:outline-none hover:scale-110 transition-transform duration-200"
        >
          <span className={`w-6 h-0.5 bg-white transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Logo con fondo beige y libra color header */}
      <div className="px-6 h-14 mb-6 flex items-center justify-center">
        <Link to="/" className="bg-[#E8D9C1] p-3 rounded-full shadow-md">
          <ScaleIcon className="h-8 w-8 text-[#3B2A2F]" />
        </Link>
      </div>

      {/* Navegación */}
      <nav className="px-2 space-y-4">
        <SidebarLink
          to="/admin/dashboard"
          icon={<HomeIcon className="h-5 w-5" />}
          label="Dashboard"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <SidebarDropdown
          label="Expedientes"
          icon={<FolderIcon className="h-5 w-5" />}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id="expedientes"
          expandedDropdowns={expandedDropdowns}
          setExpandedDropdowns={setExpandedDropdowns}
          links={[
            { to: '/expedientes/list', label: 'Lista de Expedientes' },
            { to: '/expedientes/create', label: 'Crear Expediente' },
            { to: '/expedientes/seguimiento', label: 'Seguimiento de Expedientes' },
            { to: '/expedientes/partes', label: 'Partes del Proceso' },
          ]}
        />

        <SidebarDropdown
          label="Clientes"
          icon={<UsersIcon className="h-5 w-5" />}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id="clientes"
          expandedDropdowns={expandedDropdowns}
          setExpandedDropdowns={setExpandedDropdowns}
          links={[
            { to: '/clientes/list', label: 'Lista de Clientes' },
            { to: '/clientes/create', label: 'Crear Cliente' },
          ]}
        />

        <SidebarDropdown
          label="Abogados"
          icon={<BriefcaseIcon className="h-5 w-5" />}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id="abogados"
          expandedDropdowns={expandedDropdowns}
          setExpandedDropdowns={setExpandedDropdowns}
          links={[
            { to: '/abogados/list', label: 'Lista de Abogados' },
            { to: '/abogados/create', label: 'Crear Abogado' },
          ]}
        />

        <SidebarDropdown
          label="Jueces"
          icon={<ScaleIcon className="h-5 w-5" />}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id="jueces"
          expandedDropdowns={expandedDropdowns}
          setExpandedDropdowns={setExpandedDropdowns}
          links={[
            { to: '/jueces/list', label: 'Lista de Jueces' },
            { to: '/jueces/create', label: 'Crear Juez' },
          ]}
        />

        <SidebarDropdown
          label="Audiencias"
          icon={<CalendarDaysIcon className="h-5 w-5" />}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id="audiencias"
          expandedDropdowns={expandedDropdowns}
          setExpandedDropdowns={setExpandedDropdowns}
          links={[
            { to: '/audiencias/list', label: 'Lista de Audiencias' },
            { to: '/audiencias/create', label: 'Crear Audiencia' },
            { to: '/audiencias/calendario', label: 'Calendario de Audiencias' },
            { to: '/audiencias/resolver', label: 'Resolver Audiencia' },
            { to: '/audiencias/observaciones', label: 'Observaciones' },
          ]}
        />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, label, isOpen, setIsOpen }) {
  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-[#3B2A2F] dark:hover:bg-gray-800 transition-colors"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}

function SidebarDropdown({
  label,
  icon,
  links,
  isOpen,
  setIsOpen,
  id,
  expandedDropdowns,
  setExpandedDropdowns,
}) {
  const isExpanded = expandedDropdowns[id] || false;

  const handleExpand = () => {
    if (!isOpen) {
      setIsOpen(true);
      setExpandedDropdowns({ ...expandedDropdowns, [id]: true });
    } else {
      setExpandedDropdowns({
        ...expandedDropdowns,
        [id]: !isExpanded,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleExpand}
        type="button"
        className="flex items-center w-full space-x-3 px-4 py-2 rounded hover:bg-[#3B2A2F] dark:hover:bg-gray-800 transition-colors focus:outline-none"
      >
        {icon}
        {isOpen && <span className="flex-1 text-left">{label}</span>}
      </button>

      {isExpanded && isOpen && (
        <ul className="pl-12 mt-1 space-y-2 text-sm text-gray-300 transition-all duration-150 ease-in-out">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} className="block hover:text-white transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
