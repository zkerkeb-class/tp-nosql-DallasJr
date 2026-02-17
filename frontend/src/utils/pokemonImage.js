export function pokemonImageUrl(id) {
  const base = import.meta.env.VITE_API_URL;
  return `${base}/assets/pokemons/${id}.png`;
}
