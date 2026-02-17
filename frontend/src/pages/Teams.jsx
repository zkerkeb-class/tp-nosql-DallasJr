import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { createTeam, deleteTeam, getTeams } from "../api/pokemons.js";
import { pokemonImageUrl } from "../utils/pokemonImage.js";

export default function Teams() {
  const { token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [pokemonIds, setPokemonIds] = useState(""); // "25,1,4"
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setErr("");
    try {
      // ✅ Ton backend /api/teams fait déjà populate("pokemons")
      const res = await getTeams(token);
      setTeams(res || []);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      const ids = pokemonIds
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((x) => Number(x));

      await createTeam(token, { name, pokemonIds: ids });
      setMsg("Équipe créée !");
      setName("");
      setPokemonIds("");
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const del = async (id) => {
    try {
      await deleteTeam(token, id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="stack">
      <h2>Mes Équipes</h2>
      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}

      {/* ✅ Partie création (inchangée) */}
      <div className="panel">
        <h3>Créer une équipe</h3>
        <form className="form" onSubmit={submit}>
          <label>
            Nom
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Pokemon IDs (max 6) — ex: 25,1,4
            <input value={pokemonIds} onChange={(e) => setPokemonIds(e.target.value)} />
          </label>
          <button className="btn primary" type="submit">
            Créer
          </button>
        </form>
      </div>

      {/* ✅ Liste des équipes (améliorée) */}
      <div className="teamsGrid">
        {teams.map((t) => (
          <div key={t._id} className="teamCard">
            <div className="teamHeader">
              <div>
                <div className="teamName">{t.name}</div>
                <div className="muted small">
                  {(t.pokemons || []).length}/6 Pokémon
                </div>
              </div>

              <div className="row">
                <Link className="btn" to={`/teams/${t._id}`}>
                  Voir
                </Link>
                <button className="btn danger" onClick={() => del(t._id)}>
                  Supprimer
                </button>
              </div>
            </div>

            <div className="teamSpritesRow">
              {(t.pokemons || []).length === 0 ? (
                <div className="muted">Aucun Pokémon dans cette équipe.</div>
              ) : (
                (t.pokemons || []).slice(0, 6).map((p) => {
                  // p est un document Pokemon grâce à populate
                  const pid = p?.id;
                  if (!pid) return null;

                  return (
                    <div key={p._id || pid} className="teamPokemon">
                      <img
                        className="teamSpriteLg"
                        src={pokemonImageUrl(pid)}
                        alt={p?.name?.french || `#${pid}`}
                        title={p?.name?.french || `#${pid}`}
                        loading="lazy"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <div className="teamPokemonName">
                        #{String(pid).padStart(3, "0")} {p?.name?.french || p?.name?.english}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
