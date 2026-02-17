import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { getTeam, updateTeam } from "../api/pokemons.js";
import PokemonCard from "../components/PokemonCard.jsx";

export default function TeamDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [team, setTeam] = useState(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [pokemonIds, setPokemonIds] = useState("");

  const load = async () => {
    setErr(""); setMsg("");
    try {
      const res = await getTeam(token, id);
      setTeam(res);
      setName(res.name || "");
      // res.pokemons contient les docs Pokémon (populate)
      const ids = (res.pokemons || []).map((p) => p.id).join(",");
      setPokemonIds(ids);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => { load(); }, [id]);

  const save = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      const ids = pokemonIds
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((x) => Number(x));

      const updated = await updateTeam(token, id, { name, pokemonIds: ids });
      setMsg("Équipe mise à jour !");
      setTeam(updated);
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  if (!team) return <div className="muted">Chargement… {err && <span className="err">{err}</span>}</div>;

  return (
    <div className="stack">
      <h2>Équipe — {team.name}</h2>
      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}

      <div className="panel">
        <h3>Modifier</h3>
        <form className="form" onSubmit={save}>
          <label>Nom<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>Pokemon IDs (max 6)<input value={pokemonIds} onChange={(e) => setPokemonIds(e.target.value)} /></label>
          <button className="btn primary" type="submit">Enregistrer</button>
        </form>
      </div>

      <div className="gridCards">
        {(team.pokemons || []).map((p) => <PokemonCard key={p._id || p.id} p={p} />)}
      </div>
    </div>
  );
}
