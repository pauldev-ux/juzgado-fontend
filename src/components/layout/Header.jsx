import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const hideLogout =
    !isAuthenticated ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md w-full z-50">
      {/* 🧱 Usamos grid para centrar el título y mantener menú a la derecha */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
        
        {/* ⬅️ Columna izquierda vacía para alinear el título al centro */}
        <div></div>

        {/* 🏛️ Título centrado */}
        <div className="text-2xl font-bold text-center tracking-wide">
          Juzgado Santa Cruz
        </div>

        {/* 📱 Menú a la derecha */}
        <div className="flex justify-end items-center space-x-4">
          <div className="hidden md:flex space-x-6">
            <Link to="/features" className="hover:text-blue-400 transition-colors">
              Características
            </Link>
            <Link to="/support" className="hover:text-blue-400 transition-colors">
              Soporte
            </Link>
            {!hideLogout && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Cerrar sesión
              </button>
            )}
          </div>

          {/* 🍔 Botón móvil (solo visible en pantallas pequeñas) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* 📱 Menú móvil debajo del header */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-900">
          <Link to="/features" className="block hover:text-blue-400">Características</Link>
          <Link to="/support" className="block hover:text-blue-400">Soporte</Link>
          {!hideLogout && (
            <button onClick={handleLogout} className="block text-red-500 hover:text-red-400">
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
