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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const path = query ? `/user/search/${encodeURIComponent(query)}` : "/user";
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (respuesta) => {
        const data = await respuesta.json();
        if (!respuesta.ok) {
          setError(data.detail); // 401, 403…: viene un objeto { detail }
          return;
        }
        setUsers(data); // 200: recién acá es una lista
      })
      .finally(() => setLoading(false));
  }, [token, query]);

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

  function handleBuscar() {
    setQuery(search);
  }

  function handleLimpiar() {
    setSearch("");
    setQuery("");
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre"
        />
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleLimpiar}>Limpiar</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setSelectedId(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
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
