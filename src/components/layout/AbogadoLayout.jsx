// src/layout/AbogadoLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AbogadoSidebar from './AbogadoSidebar';

function AbogadoLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-blue-700 dark:bg-gray-900 text-white overflow-y-auto">
        <AbogadoSidebar />
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AbogadoLayout;
