import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pokemonImageUrl } from "../utils/pokemonImage.js";
import TypeBadge from "./TypeBadge.jsx";

const TYPE_CLASS = {
  Normal: "t-normal",
  Fire: "t-fire",
  Water: "t-water",
  Electric: "t-electric",
  Grass: "t-grass",
  Ice: "t-ice",
  Fighting: "t-fighting",
  Poison: "t-poison",
  Ground: "t-ground",
  Flying: "t-flying",
  Psychic: "t-psychic",
  Bug: "t-bug",
  Rock: "t-rock",
  Ghost: "t-ghost",
  Dragon: "t-dragon",
  Dark: "t-dark",
  Steel: "t-steel",
  Fairy: "t-fairy",
};

export default function PokemonCard({ p }) {
  const id = p.id;
  const name = p?.name?.french || p?.name?.english || `#${id}`;
  const types = p?.type || [];
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link className="pCard" to={`/pokemons/${id}`}>
      <div className="pCardTop">
        <div className="pId">#{String(id).padStart(3, "0")}</div>
        <div className="pName">{name}</div>
      </div>

      <div className="pImgWrap">
        {imgOk ? (
          <img
            className="pImg"
            src={pokemonImageUrl(id)}
            alt={name}
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="pImgFallback">?</div>
        )}
      </div>

      <div className="pTypes">
        {types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      <div className="pStatsLine">
        <span>HP {p?.base?.HP ?? "?"}</span>
        <span>ATK {p?.base?.Attack ?? "?"}</span>
        <span>DEF {p?.base?.Defense ?? "?"}</span>
      </div>
    </Link>
  );
}
