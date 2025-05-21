import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Iconos de Heroicons
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  BriefcaseIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

function Sidebar() {
  // Estado para controlar si el sidebar está expandido o colapsado
  const [isOpen, setIsOpen] = useState(true);

  // Estado global para controlar qué submenús están abiertos
  const [expandedDropdowns, setExpandedDropdowns] = useState({});

  return (
    // 🆕 Contenedor principal con transición de color basada en el modo oscuro
    <div
      className={`bg-blue-700 dark:bg-gray-900 text-white h-screen transition-all duration-150 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } fixed top-0 left-0 z-40 shadow-lg`}
    >
      {/* 🔄 Botón hamburguesa animado con efecto de escala al hacer hover */}
      <div className="flex justify-end p-4 md:justify-between">
        <button
          onClick={() => {
            if (isOpen) setExpandedDropdowns({});
            setIsOpen(!isOpen);
          }}
          type="button"
          className="relative w-8 h-6 flex flex-col justify-between items-center group focus:outline-none hover:scale-110 transition-transform duration-200"
        >
          {/* Línea superior */}
          <span
            className={`w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          {/* Línea del medio */}
          <span
            className={`w-6 h-0.5 bg-white transition duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          {/* Línea inferior */}
          <span
            className={`w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Título o logo del sidebar */}
      <div className="px-6 h-8 mb-6 flex items-center">
        <span
          className={`text-xl font-bold transform transition-all duration-200 ease-in-out ${
            isOpen
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-2 pointer-events-none select-none'
          }`}
        >
          <Link to="/">Juzgado SC</Link>
        </span>
      </div>

      {/* Navegación principal */}
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
      </nav>
    </div>
  );
}

// 🔁 Enlace simple reutilizable con colores adaptados a modo claro/oscuro
function SidebarLink({ to, icon, label, isOpen, setIsOpen }) {
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
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

// 🔁 Componente para submenús desplegables con colores adaptados
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
        className="flex items-center w-full space-x-3 px-4 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-800 transition-colors focus:outline-none"
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
