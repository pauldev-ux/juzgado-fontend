import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JuezDashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [juez, setJuez] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setJuez(storedUser);

    const fetchExpedientes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/expedientes/juez/${storedUser.carnet_identidad}`);
        setExpedientes(res.data);
      } catch (error) {
        console.error('Error al cargar expedientes del juez:', error);
      }
    };

    if (storedUser?.carnet_identidad) {
      fetchExpedientes();
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {juez?.nombre}</h2>
      <p className="mb-6">CI: {juez?.carnet_identidad}</p>

      <h3 className="text-xl font-semibold mb-2">Expedientes Asignados:</h3>
      {expedientes.length === 0 ? (
        <p>No tienes expedientes asignados.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">N° Expediente</th>
              <th className="border p-2">Demandante</th>
              <th className="border p-2">Demandado</th>
              <th className="border p-2">Contenido</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((exp) => (
              <tr key={exp.numero_expediente}>
                <td className="border p-2">{exp.numero_expediente}</td>
                <td className="border p-2">{exp.demandante_carnet}</td>
                <td className="border p-2">{exp.demandado_carnet}</td>
                <td className="border p-2">{exp.contenido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default JuezDashboard;
