import React, { useMemo, useState } from "react";
import TypePicker from "./TypePicker.jsx";

const ALLOWED_TYPES = [
  "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground",
  "Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy",
];

export default function PokemonForm({ initialValue, onSubmit, submitLabel = "Enregistrer" }) {
  const init = useMemo(() => initialValue || ({
    id: "",
    name: { english: "", french: "" },
    type: [],
    base: { HP: "", Attack: "", Defense: "", SpecialAttack: "", SpecialDefense: "", Speed: "" },
  }), [initialValue]);

  const [value, setValue] = useState(init);

  const set = (path, v) => {
    setValue((prev) => {
      const copy = structuredClone(prev);
      const keys = path.split(".");
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = v;
      return copy;
    });
  };

  const toggleType = (t) => {
    setValue((prev) => {
      const copy = structuredClone(prev);
      copy.type = copy.type.includes(t) ? copy.type.filter((x) => x !== t) : [...copy.type, t];
      return copy;
    });
  };

  const normalizePayload = () => {
    const num = (x) => (x === "" || x === null || x === undefined ? undefined : Number(x));
    return {
      id: num(value.id),
      name: {
        english: value.name.english,
        french: value.name.french,
      },
      type: value.type,
      base: {
        HP: num(value.base.HP),
        Attack: num(value.base.Attack),
        Defense: num(value.base.Defense),
        SpecialAttack: num(value.base.SpecialAttack),
        SpecialDefense: num(value.base.SpecialDefense),
        Speed: num(value.base.Speed),
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(normalizePayload());
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="grid2">
        <label>
          ID
          <input value={value.id} onChange={(e) => set("id", e.target.value)} />
        </label>
        <label>
          Nom (FR)
          <input value={value.name.french} onChange={(e) => set("name.french", e.target.value)} />
        </label>
        <label>
          Nom (EN)
          <input value={value.name.english} onChange={(e) => set("name.english", e.target.value)} />
        </label>
      </div>

      <div className="section">
        <div className="sectionTitle">Types</div>
        <div className="muted small">
          Choisis 1 ou 2 types (clic pour sélectionner/désélectionner)
        </div>

        <TypePicker value={value.type} onToggle={toggleType} />

        {value.type.length > 2 && (
          <div className="hint" style={{ marginTop: 10 }}>
            ⚠️ En général un Pokémon a max 2 types.
          </div>
        )}
      </div>


      <div className="section">
        <div className="sectionTitle">Stats (1–255)</div>
        <div className="grid3">
          {["HP","Attack","Defense","SpecialAttack","SpecialDefense","Speed"].map((k) => (
            <label key={k}>
              {k}
              <input
                value={value.base[k] ?? ""}
                onChange={(e) => set(`base.${k}`, e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <button className="btn primary" type="submit">{submitLabel}</button>
    </form>
  );
}
