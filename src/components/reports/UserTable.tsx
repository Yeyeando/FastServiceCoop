import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/usersService.js"; // Ajusta la ruta según tu estructura de carpetas

// Definimos una interfaz para los usuarios
interface User {
  id: number;
  username: string;
}

const ReporteUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        // Si el campo en la respuesta es 'nombre', lo mapeamos a 'username'
        const formattedUsers = data.map((user: any) => ({
          id: user.id,
          username: user.username, // O ajusta según el nombre real de la propiedad
        }));
        setUsers(formattedUsers);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setError("Error al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Reporte de Usuarios</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteUsuarios;
