import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { addFavorite, deletePokemon, getPokemonById, getFavorites, removeFavorite } from "../api/pokemons.js";
import { pokemonImageUrl } from "../utils/pokemonImage.js";
import TypeBadge from "../components/TypeBadge.jsx";

export default function PokemonDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { token, isAuth } = useAuth();

  const [p, setP] = useState(null);
  const [favIds, setFavIds] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setErr(""); setMsg("");
    getPokemonById(id).then(setP).catch((e) => setErr(e.message));
  }, [id]);

  useEffect(() => {
    if (!isAuth) return;
    getFavorites(token)
      .then((res) => setFavIds(res.favorites || []))
      .catch(() => {});
  }, [isAuth, token]);

  const isFav = favIds.includes(Number(id));

  const toggleFav = async () => {
    try {
      setMsg(""); setErr("");
      if (!isAuth) return setErr("Connecte-toi pour gérer les favoris.");
      if (isFav) await removeFavorite(token, id);
      else await addFavorite(token, id);
      const res = await getFavorites(token);
      setFavIds(res.favorites || []);
      setMsg(isFav ? "Retiré des favoris" : "Ajouté aux favoris");
    } catch (e) {
      setErr(e.message);
    }
  };

  const del = async () => {
    try {
      setErr(""); setMsg("");
      await deletePokemon(token, id);
      nav("/pokemons");
    } catch (e) {
      setErr(e.message);
    }
  };

  if (!p) return <div className="muted">Chargement… {err && <span className="err">{err}</span>}</div>;

  return (
    <div className="stack">
      <div className="row space">
        <h2>#{p.id} — {p?.name?.french}</h2>
        <div className="detailHero">
        <img
          className="detailImg"
          src={pokemonImageUrl(p.id)}
          alt={p?.name?.french}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

        <div className="row">
          <button className="btn" onClick={toggleFav} disabled={!isAuth}>
            {isFav ? "★ Favori" : "☆ Ajouter aux favoris"}
          </button>
          {isAuth && (
            <>
              <Link className="btn" to={`/pokemons/${p.id}/edit`}>Modifier</Link>
              <button className="btn danger" onClick={del}>Supprimer</button>
            </>
          )}
        </div>
      </div>

      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}

      <div className="pTypes">
        {(p.type || []).map((t) => <TypeBadge key={t} type={t} />)}
      </div>

      <div className="panel">
        <h3>Nom</h3>
        <div className="grid2">
          <div><span className="muted">EN</span><div>{p?.name?.english}</div></div>
          <div><span className="muted">FR</span><div>{p?.name?.french}</div></div>
        </div>
      </div>

      <div className="panel">
        <h3>Stats</h3>
        <div className="grid3">
          {Object.entries(p.base || {}).map(([k, v]) => (
            <div key={k} className="stat">
              <div className="muted small">{k}</div>
              <div className="big">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
