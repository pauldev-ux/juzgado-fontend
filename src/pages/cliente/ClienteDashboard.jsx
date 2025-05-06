import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClienteDashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || !storedUser.id) return;

    const fetchClienteConExpedientes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/clientes/perfil/${storedUser.id}`);
        setCliente(res.data.cliente);
        setExpedientes(res.data.expedientes);
      } catch (error) {
        console.error('Error al obtener perfil del cliente:', error);
      }
    };

    fetchClienteConExpedientes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {cliente?.nombre}</h2>
      <p className="mb-6">CI: {cliente?.carnet_identidad}</p>

      <h3 className="text-xl font-semibold mb-2">Tus Expedientes:</h3>
      {expedientes.length === 0 ? (
        <p>No tienes expedientes registrados.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Nro. Expediente</th>
              <th className="border p-2">Contenido</th>
              <th className="border p-2">Juez</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((exp) => (
              <tr key={exp.numero_expediente}>
                <td className="border p-2">{exp.numero_expediente}</td>
                <td className="border p-2">{exp.contenido}</td>
                <td className="border p-2">{exp.juez_carnet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClienteDashboard;
