import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlusIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'; // 🆕 Heroicons importados

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar fija arriba */}
      <nav className={`fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          {/* Logo / título */}
          <div className="text-2xl font-semibold tracking-wide">Juzgado SC</div>

          {/* Links de navegación */}
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-gray-300 transition">Características</a>
            <a href="#support" className="hover:text-gray-300 transition">Soporte</a>
          </div>

          {/* Botones de login/register */}
          <div className="flex space-x-4">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition">Iniciar Sesión</Link>
            <Link to="/register" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition">Registrarse</Link>
          </div>
        </div>
      </nav>

      {/* Compensar altura del navbar fijo */}
      <div className="mt-20 flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-green-500 text-white py-24">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Sistema de Juzgado <span className="text-yellow-300">Santa Cruz</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Gestión moderna y eficiente de expedientes legales.
            </p>

            {/* Botones principales */}
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded text-lg font-medium transition"
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Comenzar Ahora
              </Link>
              <button className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded text-lg font-medium transition">
                <ArrowRightCircleIcon className="w-5 h-5 mr-2" />
                Ver Demostración
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer opcional aquí si lo deseas */}
    </div>
  );
}

export default Home;
