import React, { useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { getPokemons } from "../api/pokemons.js";

const TYPE_LIST = ["", "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];

export default function Pokemons() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useMemo(() => ({ type, name, sort, page, limit }), [type, name, sort, page, limit]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");
    getPokemons(params)
      .then((res) => {
        if (!mounted) return;
        // ton API paginée renvoie {data,page,limit,total,totalPages}
        setData(res.data || []);
        setMeta({ page: res.page, limit: res.limit, total: res.total, totalPages: res.totalPages });
      })
      .catch((e) => mounted && setErr(e.message))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [params]);

  const applyQuick = () => setPage(1);

  return (
    <div className="stack">
      <h2>Pokédex</h2>

      <div className="filters">
        <label>
          Type
          <select value={type} onChange={(e) => { setType(e.target.value); applyQuick(); }}>
            {TYPE_LIST.map((t) => (
              <option key={t} value={t}>{t || "Tous"}</option>
            ))}
          </select>
        </label>

        <label>
          Nom (partiel)
          <input value={name} onChange={(e) => { setName(e.target.value); applyQuick(); }} placeholder="pika, char..." />
        </label>

        <label>
          Tri
          <select value={sort} onChange={(e) => { setSort(e.target.value); applyQuick(); }}>
            <option value="">(aucun)</option>
            <option value="name.french">Nom FR (A→Z)</option>
            <option value="-name.french">Nom FR (Z→A)</option>
            <option value="base.HP">HP (asc)</option>
            <option value="-base.HP">HP (desc)</option>
            <option value="-base.Attack">Attack (desc)</option>
          </select>
        </label>

        <label>
          Limit
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>

      <div className="muted small">
        Total: {meta.total} · Page {meta.page}/{meta.totalPages}
      </div>

      {loading && <div className="muted">Chargement…</div>}
      {err && <div className="err">{err}</div>}

      <div className="gridCards">
        {data.map((p) => <PokemonCard key={p._id || p.id} p={p} />)}
      </div>

      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        onPage={setPage}
      />
    </div>
  );
}
