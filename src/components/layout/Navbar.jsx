import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // Estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hook para navegación después de cerrar sesión
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token almacenado
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-300">Juzgado</Link>
        </div>

        {/* Botón de menú para dispositivos pequeños */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Alternar visibilidad del menú
            className="text-white focus:outline-none"
          >
            {/* Icono hamburguesa */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú horizontal para escritorio */}
        {/* Nuevo: Menú visible solo en pantallas md o mayores */}
        <div className="hidden md:flex space-x-6">
          <Link to="/features" className="hover:text-gray-300">Características</Link>
          <Link to="/support" className="hover:text-gray-300">Soporte</Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-600">Cerrar sesión</button>
        </div>
      </div>

      {/* Menú desplegable para dispositivos móviles */}
      {/* Nuevo: Menú móvil visible solo cuando isMobileMenuOpen está en true */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/features" className="block hover:text-gray-300">Características</Link>
          <Link to="/support" className="block hover:text-gray-300">Soporte</Link>
          <button onClick={handleLogout} className="block text-red-400 hover:text-red-600">Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
