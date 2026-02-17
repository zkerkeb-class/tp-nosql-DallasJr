import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { getFavorites, removeFavorite } from "../api/pokemons.js";
import PokemonCard from "../components/PokemonCard.jsx";

export default function Favorites() {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await getFavorites(token);
      setData(res.data || []);
      setFavIds(res.favorites || []);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    try {
      await removeFavorite(token, id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="stack">
      <h2>Mes Favoris</h2>
      {err && <div className="err">{err}</div>}

      {favIds.length === 0 ? (
        <div className="muted">Aucun favori pour le moment.</div>
      ) : (
        <>
          <div className="muted small">IDs: {favIds.join(", ")}</div>
          <div className="gridCards">
            {data.map((p) => (
              <div key={p._id || p.id} className="favCardWrap">
                <PokemonCard p={p} />

                <button
                  className="favRemoveBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    remove(p.id);
                  }}
                  title="Retirer des favoris"
                >
                  ✕
                </button>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
}
