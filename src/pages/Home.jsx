import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Wrapper con Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-8">
          {/* Navbar */}
          <nav className={`fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-semibold">Juzgado SC</div>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="hover:text-gray-300">Características</a>
                <a href="#support" className="hover:text-gray-300">Soporte</a>
              </div>
              <div className="flex space-x-4">
                <Link to="/Login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">Iniciar Sesión</Link>
                <Link to="/Register" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Registrarse</Link>
              </div>
            </div>
          </nav>

          {/* Wrapper para compensar el navbar fijo */}
          <div className="mt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-24">
              <div className="max-w-screen-xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Sistema de Juzgado <span className="text-yellow-300">Santa Cruz</span></h1>
                <p className="text-xl mb-6">
                  expedientes
                </p>
                <div className="space-x-4">
                  <Link to="/register" className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-400 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Comenzar Ahora
                  </Link>
                  <button className="bg-transparent text-white py-2 px-6 rounded border-2 border-white hover:bg-white hover:text-gray-800">
                    Ver Demostración
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
    </div>
  );
}

export default Home;
