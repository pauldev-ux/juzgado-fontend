import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Eliminar el token (o cualquier otra información relacionada con la sesión)
    localStorage.removeItem('token');  // Asumimos que el token está almacenado en localStorage
    
    // Redirigir al usuario al login
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="header-logo text-2xl font-semibold">
          {/* Aquí agregamos el Link para redirigir al dashboard */}
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Juzgado Santa Cruz
          </Link>
        </div>
        <nav className="header-nav space-x-6">
          <Link to="/features" className="hover:text-gray-300">Características</Link>
          <Link to="/support" className="hover:text-gray-300">Soporte</Link>

          {/* Agregar el botón de Cerrar Sesión */}
          <button 
            onClick={handleLogout} 
            className="text-red-500 hover:text-red-700"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
