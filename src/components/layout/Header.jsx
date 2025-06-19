import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';  // 🌙☀️ Iconos para el modo oscuro

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const hideLogout =
    !isAuthenticated ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-[#3B2A2F] dark:bg-gray-900 text-white shadow-md w-full z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div></div>

        <div className="text-2xl font-bold tracking-wide">
          Juzgado Santa Cruz
        </div>

        <div className="flex justify-end items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link
              to="/features"
              className="flex items-center justify-center px-4 py-2 text-base font-semibold text-center text-black rounded-md border border-[#E8D9C1] bg-[#E8D9C1] dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:opacity-90 transition-colors min-w-[120px]"
            >
              Características
            </Link>

            <Link
              to="/support"
              className="flex items-center justify-center px-4 py-2 text-base font-semibold text-center text-black rounded-md border border-[#E8D9C1] bg-[#E8D9C1] dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:opacity-90 transition-colors min-w-[120px]"
            >
              Soporte
            </Link>

            {!hideLogout && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-2 text-base font-semibold text-center text-white rounded-md border border-red-700 bg-red-600 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 transition-colors min-w-[120px] whitespace-nowrap"
              >
                Cerrar sesión
              </button>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-300" />
            ) : (
              <MoonIcon className="h-6 w-6 text-blue-300" />
            )}
          </button>

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

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#3B2A2F] dark:bg-gray-900">
          <Link
            to="/features"
            className="block px-4 py-2 text-base font-semibold text-center rounded-md border border-[#E8D9C1] bg-[#E8D9C1] text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:opacity-90"
          >
            Características
          </Link>
          <Link
            to="/support"
            className="block px-4 py-2 text-base font-semibold text-center rounded-md border border-[#E8D9C1] bg-[#E8D9C1] text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:opacity-90"
          >
            Soporte
          </Link>
          {!hideLogout && (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-base font-semibold text-center text-white rounded-md border border-red-700 bg-red-600 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
