import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Páginas
import Home from '../pages/Home.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

import Dashboard from '../pages/dashboard/Dashboard.jsx';

// Layouts
import Header from '../components/layout/Header.jsx';

// CRUD de Clientes
import ClientList from '../pages/clientes/ClientList.jsx';  
import ClientDetail from '../pages/clientes/ClientCreate.jsx';  
import RoleManage from '../pages/clientes/RoleManage';  
import ClientCreate from '../pages/clientes/ClientCreate.jsx';  
import ClientEdit from '../pages/clientes/ClientEdit.jsx';  

// CRUD de Expedientes
import ExpedienteList from '../pages/expedientes/ExpedienteList'; 
import ExpedienteCreate from '../pages/expedientes/ExpedienteCreate'; 
import ExpedienteEdit from '../pages/expedientes/ExpedienteEdit'; 


function AppRoutes() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const showHeader = true; // Puedes ajustar esto si quieres ocultar el Header en alguna ruta

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rutas para el CRUD de Clientes */}
        <Route path="/clientes/list" element={<ClientList />} />  
        <Route path="/clientes/manage" element={<RoleManage />} />  
        <Route path="/clientes" element={<ClientList />} />  
        <Route path="/clientes/create" element={<ClientCreate />} />  
        <Route path="/clientes/edit/:id" element={<ClientEdit />} /> 

        {/* Rutas para el CRUD de Expedientes */}
        <Route path="/expedientes/list" element={<ExpedienteList />} />
        <Route path="/expedientes/create" element={<ExpedienteCreate />} />
        <Route path="/expedientes/edit/:id" element={<ExpedienteEdit />} />
 
      </Routes>
    
    </>
  );
}

export default AppRoutes;
