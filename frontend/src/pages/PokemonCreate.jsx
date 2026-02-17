import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonForm from "../components/PokemonForm.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { createPokemon } from "../api/pokemons.js";

export default function PokemonCreate() {
  const { token } = useAuth();
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (payload) => {
    setErr(""); setMsg("");
    try {
      const created = await createPokemon(token, payload);
      setMsg("Pokémon créé !");
      nav(`/pokemons/${created.id}`);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="stack">
      <h2>Créer un Pokémon</h2>
      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}
      <PokemonForm onSubmit={submit} submitLabel="Créer" />
    </div>
  );
}
