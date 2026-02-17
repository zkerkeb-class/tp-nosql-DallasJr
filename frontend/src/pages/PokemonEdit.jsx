import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokemonForm from "../components/PokemonForm.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { getPokemonById, updatePokemon } from "../api/pokemons.js";

export default function PokemonEdit() {
  const { id } = useParams();
  const { token } = useAuth();
  const nav = useNavigate();

  const [initial, setInitial] = useState(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setErr("");
    getPokemonById(id).then((p) => {
      // mettre des strings pour inputs
      setInitial({
        ...p,
        id: String(p.id),
        base: Object.fromEntries(Object.entries(p.base || {}).map(([k, v]) => [k, v == null ? "" : String(v)])),
      });
    }).catch((e) => setErr(e.message));
  }, [id]);

  const submit = async (payload) => {
    setErr(""); setMsg("");
    try {
      const updated = await updatePokemon(token, id, payload);
      setMsg("Pokémon mis à jour !");
      nav(`/pokemons/${updated.id}`);
    } catch (e) {
      setErr(e.message);
    }
  };

  if (!initial) return <div className="muted">Chargement… {err && <span className="err">{err}</span>}</div>;

  return (
    <div className="stack">
      <h2>Modifier #{id}</h2>
      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}
      <PokemonForm initialValue={initial} onSubmit={submit} submitLabel="Mettre à jour" />
    </div>
  );
}
