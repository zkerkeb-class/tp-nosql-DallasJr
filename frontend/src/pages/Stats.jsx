import React, { useEffect, useMemo, useState } from "react";
import { getStats } from "../api/pokemons.js";
import { pokemonImageUrl } from "../utils/pokemonImage.js";
import TypeBadge from "../components/TypeBadge.jsx";
import { Link } from "react-router-dom";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    getStats().then(setStats).catch((e) => setErr(e.message));
  }, []);

  const maxCount = useMemo(() => {
    const arr = stats?.perType || [];
    return arr.reduce((m, x) => Math.max(m, x.count || 0), 1);
  }, [stats]);

  if (!stats) {
    return (
      <div className="stack">
        <h2>Stats</h2>
        <div className="muted">Chargement…</div>
        {err && <div className="err">{err}</div>}
      </div>
    );
  }

  const topAttackName = stats.topAttack?.name?.french || stats.topAttack?.name?.english;
  const topHpName = stats.topHP?.name?.french || stats.topHP?.name?.english;

  return (
    <div className="stack">
      <div className="statsHeader">
        <h2>Stats Pokédex</h2>
        <div className="muted">
          Agrégation MongoDB · Répartition des types · Tops de la 1ère génération
        </div>
      </div>

      {err && <div className="err">{err}</div>}

      {/* TOPS */}
      <div className="panel">
        <div className="panelTitleRow">
          <h3>Top Pokémon</h3>
          <div className="muted small">Les champions de la base</div>
        </div>

        <div className="topsGrid">
          <Link
            to={`/pokemons/${stats.topAttack?.id}`}
            className="topCard pokeCard clickableCard"
          >
            <div className="topRibbon">TOP ATK</div>

            <div className="topSpriteWrap">
              <img
                className="topImg"
                src={pokemonImageUrl(stats.topAttack?.id)}
                alt={topAttackName || "Top Attack"}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>

            <div className="topInfo">
              <div className="topLine">
                <span className="dexNum">
                  #{String(stats.topAttack?.id ?? "").padStart(3, "0")}
                </span>
                <span className="topName">{topAttackName}</span>
              </div>

              <div className="topMetric">
                <span className="metricLabel">Attack</span>
                <span className="metricValue">{stats.topAttack?.attack}</span>
              </div>
            </div>
          </Link>

          <Link
            to={`/pokemons/${stats.topHP?.id}`}
            className="topCard pokeCard clickableCard"
          >
            <div className="topRibbon blue">TOP HP</div>

            <div className="topSpriteWrap">
              <img
                className="topImg"
                src={pokemonImageUrl(stats.topHP?.id)}
                alt={topHpName || "Top HP"}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>

            <div className="topInfo">
              <div className="topLine">
                <span className="dexNum">
                  #{String(stats.topHP?.id ?? "").padStart(3, "0")}
                </span>
                <span className="topName">{topHpName}</span>
              </div>

              <div className="topMetric">
                <span className="metricLabel">HP</span>
                <span className="metricValue">{stats.topHP?.hp}</span>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* PAR TYPE */}
      <div className="panel">
        <div className="panelTitleRow">
          <h3>Répartition par type</h3>
          <div className="muted small">Count + moyenne de HP</div>
        </div>

        <div className="typeStatsList">
          {(stats.perType || []).map((x) => {
            const ratio = Math.max(0.05, (x.count || 0) / maxCount); // minimum visuel
            return (
              <div key={x.type} className="typeRow pokeCard">
                <div className="typeLeft">
                  <TypeBadge type={x.type} />
                  <div className="typeMeta">
                    <div className="typeName">{x.type}</div>
                    <div className="muted small">Moy. HP : <strong>{x.avgHP}</strong></div>
                  </div>
                </div>

                <div className="typeRight">
                  <div className="countPill">{x.count}</div>
                  <div className="bar">
                    <div className="barFill" style={{ width: `${ratio * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="muted small" style={{ marginTop: 10 }}>
          Astuce : le “Count” dépend du fait qu’un Pokémon puisse avoir 2 types (agrégation avec unwind).
        </div>
      </div>
    </div>
  );
}
