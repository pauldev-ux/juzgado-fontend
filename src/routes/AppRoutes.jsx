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

// CRUD de Abogados (Nuevo)
import AbogadoList from '../pages/abogados/AbogadoList.jsx';
import AbogadoCreate from '../pages/abogados/AbogadoCreate.jsx';
import AbogadoEdit from '../pages/abogados/AbogadoEdit.jsx';

// CRUD de Jueces (Nuevo)
import JuezList from '../pages/jueces/JuezList.jsx';
import JuezCreate from '../pages/jueces/JuezCreate.jsx';
import JuezEdit from '../pages/jueces/JuezEdit.jsx';


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

        {/* Rutas para el CRUD de Abogados (Nuevo) */}
        <Route path="/abogados/list" element={<AbogadoList />} />
        <Route path="/abogados/create" element={<AbogadoCreate />} />
        <Route path="/abogados/edit/:id" element={<AbogadoEdit />} />

         {/* Rutas para el CRUD de Jueces */}
         <Route path="/jueces/list" element={<JuezList />} />
          <Route path="/jueces/create" element={<JuezCreate />} />
          <Route path="/jueces/edit/:id" element={<JuezEdit />} />




      </Routes>
    </>
  );
}

export default AppRoutes;
