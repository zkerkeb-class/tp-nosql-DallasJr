const TYPE_TO_ID = {
  Normal: 1,
  Fighting: 2,
  Flying: 3,
  Poison: 4,
  Ground: 5,
  Rock: 6,
  Bug: 7,
  Ghost: 8,
  Steel: 9,
  Fire: 10,
  Water: 11,
  Grass: 12,
  Electric: 13,
  Psychic: 14,
  Ice: 15,
  Dragon: 16,
  Dark: 17,
  Fairy: 18,
};

export function typeIconUrl(typeName) {
  const id = TYPE_TO_ID[typeName];
  if (!id) return null;
  const base = import.meta.env.VITE_API_URL;
  return `${base}/assets/types/${id}.png`;
}

export function typeId(typeName) {
  return TYPE_TO_ID[typeName] || null;
}
