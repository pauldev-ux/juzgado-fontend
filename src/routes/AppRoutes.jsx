import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Páginas públicas y auth
import Home from '../pages/Home.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

// Layouts
import Header from '../components/layout/Header.jsx';

// Admin: Dashboard
import Dashboard from '../pages/admin/dashboard/Dashboard.jsx';

// Admin: Clientes
import ClientList from '../pages/admin/clientes/ClientList.jsx';  
import RoleManage from '../pages/admin/RoleManage.jsx';  
import ClientCreate from '../pages/admin/clientes/ClientCreate.jsx';  
import ClientEdit from '../pages/admin/clientes/ClientEdit.jsx';  

// Admin: Expedientes
import ExpedienteList from '../pages/admin/expedientes/ExpedienteList.jsx'; 
import ExpedienteCreate from '../pages/admin/expedientes/ExpedienteCreate.jsx'; 
import ExpedienteEdit from '../pages/admin/expedientes/ExpedienteEdit.jsx'; 

// Admin: Abogados
import AbogadoList from '../pages/admin/abogados/AbogadoList.jsx';
import AbogadoCreate from '../pages/admin/abogados/AbogadoCreate.jsx';
import AbogadoEdit from '../pages/admin/abogados/AbogadoEdit.jsx';

// Admin: Jueces
import JuezList from '../pages/admin/jueces/JuezList.jsx';
import JuezCreate from '../pages/admin/jueces/JuezCreate.jsx';
import JuezEdit from '../pages/admin/jueces/JuezEdit.jsx';

// Admin: Audiencias
import AudienciaList from '../pages/admin/audiencias/AudienciaList.jsx';
import AudienciaCreate from '../pages/admin/audiencias/AudienciaCreate.jsx';
import AudienciaEdit from '../pages/admin/audiencias/AudienciaEdit.jsx';
import AudienciaResolver from '../pages/admin/audiencias/AudienciaResolver.jsx';
import AudienciaObservaciones from '../pages/admin/audiencias/AudienciaObservaciones.jsx';
import AudienciaCalendario from '../pages/admin/audiencias/AudienciaCalendario.jsx';


        // Cliente: vista
import ClienteDashboard from '../pages/cliente/ClienteDashboard.jsx';

        // Juez //
import JuezLayout from '../components/layout/JuezLayout.jsx';
import JuezDashboard from '../pages/juez/JuezDashboard';

        //Abogado//
// Abogado
import AbogadoDashboard from '../pages/abogado/AbogadoDashboard.jsx';
import AbogadoLayout from '../components/layout/AbogadoLayout.jsx';




function AppRoutes() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const showHeader = true;

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin: Dashboard */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Admin: Clientes */}
        <Route path="/clientes/list" element={<ClientList />} />  
        <Route path="/clientes/manage" element={<RoleManage />} />  
        <Route path="/clientes/create" element={<ClientCreate />} />  
        <Route path="/clientes/edit/:id" element={<ClientEdit />} /> 

        {/* Admin: Expedientes */}
        <Route path="/expedientes/list" element={<ExpedienteList />} />
        <Route path="/expedientes/create" element={<ExpedienteCreate />} />
        <Route path="/expedientes/edit/:id" element={<ExpedienteEdit />} />

        {/* Admin: Abogados */}
        <Route path="/abogados/list" element={<AbogadoList />} />
        <Route path="/abogados/create" element={<AbogadoCreate />} />
        <Route path="/abogados/edit/:id" element={<AbogadoEdit />} />

        {/* Admin: Jueces */}
        <Route path="/jueces/list" element={<JuezList />} />
        <Route path="/jueces/create" element={<JuezCreate />} />
        <Route path="/jueces/edit/:id" element={<JuezEdit />} />

        {/* Cliente: vista */}
        <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
        <Route path="/abogado/dashboard" element={<AbogadoDashboard />} />
        
        {/* Admin: Audiencias */}
        <Route path="/audiencias/list" element={<AudienciaList />} />
        <Route path="/audiencias/create" element={<AudienciaCreate />} />
        <Route path="/audiencias/edit/:id" element={<AudienciaEdit />} />
        <Route path="/audiencias/resolver" element={<AudienciaResolver />} />
        <Route path="/audiencias/observaciones" element={<AudienciaObservaciones />} />
        <Route path="/audiencias/calendario" element={<AudienciaCalendario />} />

        {/* JUEZ: Layout con sidebar y header propios */}
        <Route path="/juez" element={<JuezLayout />}>
          <Route path="dashboard" element={<JuezDashboard />} />
        </Route>

        {/* ABOGADO: Rutas protegidas con layout de abogado */}
          <Route path="/abogado" element={<AbogadoLayout />}>
            <Route path="dashboard" element={<AbogadoDashboard />} />
          </Route>

      </Routes>
    </>
  );
}

export default AppRoutes;
