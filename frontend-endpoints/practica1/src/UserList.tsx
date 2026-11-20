import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface UserDetail {
  id: number;
  name: string;
  age: number;
  email: string;
  country: { id: number; name: string } | null;
  roles: { id: number; name: string }[];
}

export function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (respuesta) => {
      const data = await respuesta.json();
      if (!respuesta.ok) {
        setError(data.detail); // 401, 403…: viene un objeto { detail }
        return;
      }
      setUsers(data); // 200: recién acá es una lista
    });
  }, [token]);

  useEffect(() => {
    if (selectedId === null) return;
    fetch(`${import.meta.env.VITE_API_URL}/user/${selectedId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (respuesta) => {
      const data = await respuesta.json();
      if (!respuesta.ok) {
        setError(data.detail);
        return;
      }
      setDetail(data);
    });
  }, [selectedId, token]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedId(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
      {detail && (
        <div>
          <h3>{detail.name}</h3>
          <p>Email: {detail.email}</p>
          <p>Edad: {detail.age}</p>
          <p>País: {detail.country?.name}</p>
          <p>Roles: {detail.roles.map((rol) => rol.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
