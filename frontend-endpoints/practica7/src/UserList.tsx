import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";

interface User {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface UserDetail {
  id: number;
  name: string;
  age: number;
  email: string;
  country: { id: number; name: string } | null;
  roles: Role[];
}

export function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [me, setMe] = useState<UserDetail | null>(null);
  const [soloMayores, setSoloMayores] = useState(false);
  const [recarga, setRecarga] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryId, setCountryId] = useState("1");
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/me/id`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (respuesta) => {
      const data = await respuesta.json();
      if (!respuesta.ok) {
        setError(data.detail);
        return;
      }
      const respuestaMe = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${data.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const dataMe = await respuestaMe.json();
      if (!respuestaMe.ok) {
        setError(dataMe.detail);
        return;
      }
      setMe(dataMe);
    });
  }, [token]);

  useEffect(() => {
    let path = "/user";
    if (query) path = `/user/search/${encodeURIComponent(query)}`;
    else if (soloMayores) path = "/user_mayores";
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
  }, [token, query, soloMayores, recarga]);

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
    setSoloMayores(false);
    setQuery(search);
  }

  function handleLimpiar() {
    setSearch("");
    setQuery("");
  }

  function handleAlternarMayores() {
    setSearch("");
    setQuery("");
    setSoloMayores(!soloMayores);
  }

  async function handleAlta(evento: SubmitEvent) {
    evento.preventDefault();
    setFormError(null);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        email,
        password,
        country_id: Number(countryId),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setFormError(
        typeof data.detail === "string" ? data.detail : "Datos inválidos",
      );
      return;
    }
    setName("");
    setAge("");
    setEmail("");
    setPassword("");
    setCountryId("1");
    setRecarga(recarga + 1); // vuelve a pedir la lista sin recargar la página
  }

  async function handleBorrar(user: User) {
    if (!window.confirm(`¿Borrar a ${user.name}?`)) return;
    setDeleteError(null);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/${user.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setDeleteError(data.detail); // 403: Missing permission: delete_users
      return;
    }
    setUsers(users.filter((u) => u.id !== user.id)); // sin volver a pedir la lista
    if (selectedId === user.id) {
      setSelectedId(null);
      setDetail(null);
    }
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      {me && (
        <h2>
          Hola, {me.name.split(" ")[0]} (
          {me.roles.map((rol) => rol.name).join(", ")})
        </h2>
      )}
      <form onSubmit={handleAlta}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Edad"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          minLength={4}
          required
        />
        <select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
          <option value="1">Argentina</option>
          <option value="2">Brasil</option>
        </select>
        <button type="submit">Crear usuario</button>
        {formError && <p>{formError}</p>}
      </form>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre"
        />
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleLimpiar}>Limpiar</button>
        <button onClick={handleAlternarMayores}>
          {soloMayores ? "Todos" : "Solo mayores"}
        </button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span onClick={() => setSelectedId(user.id)}>{user.name}</span>
              <button onClick={() => handleBorrar(user)}>Borrar</button>
            </li>
          ))}
        </ul>
      )}
      {deleteError && <p>{deleteError}</p>}
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
