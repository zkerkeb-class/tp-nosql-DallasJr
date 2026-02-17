import React from "react";
import { typeIconUrl } from "../utils/typeIcons.js";

const ALLOWED_TYPES = [
  "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground",
  "Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy",
];

export default function TypePicker({ value = [], onToggle }) {
  return (
    <div className="typePicker">
      {ALLOWED_TYPES.map((t) => {
        const selected = value.includes(t);
        const url = typeIconUrl(t);

        return (
          <button
            key={t}
            type="button"
            className={`typePick ${selected ? "on" : ""}`}
            onClick={() => onToggle(t)}
            aria-pressed={selected}
            title={t}
          >
            {url ? (
              <img className="typePickImg" src={url} alt={t} loading="lazy" />
            ) : (
              <span className="typePickFallback">{t}</span>
            )}
            <span className="typePickCheck" aria-hidden="true">✓</span>
          </button>
        );
      })}
    </div>
  );
}
