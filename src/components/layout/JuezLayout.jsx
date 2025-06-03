import React from 'react';
import { Outlet } from 'react-router-dom';
import JuezSidebar from './JuezSidebar';

function JuezLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar lateral del juez */}
      <JuezSidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 pt-20 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default JuezLayout;
