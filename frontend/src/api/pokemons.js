import { apiFetch } from "./client";

// Auth
export const register = (payload) => apiFetch("/api/auth/register", { method: "POST", body: payload });
export const login = (payload) => apiFetch("/api/auth/login", { method: "POST", body: payload });

// Pokemons
export const getPokemons = (params = {}) => {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") usp.set(k, String(v));
  });
  const q = usp.toString();
  return apiFetch(`/api/pokemons${q ? `?${q}` : ""}`);
};

export const getPokemonById = (id) => apiFetch(`/api/pokemons/${id}`);

export const createPokemon = (token, payload) =>
  apiFetch("/api/pokemons", { method: "POST", token, body: payload });

export const updatePokemon = (token, id, payload) =>
  apiFetch(`/api/pokemons/${id}`, { method: "PUT", token, body: payload });

export const deletePokemon = (token, id) =>
  apiFetch(`/api/pokemons/${id}`, { method: "DELETE", token });

// Favorites
export const getFavorites = (token) => apiFetch("/api/favorites", { token });
export const addFavorite = (token, pokemonId) =>
  apiFetch(`/api/favorites/${pokemonId}`, { method: "POST", token });
export const removeFavorite = (token, pokemonId) =>
  apiFetch(`/api/favorites/${pokemonId}`, { method: "DELETE", token });

// Teams
export const getTeams = (token) => apiFetch("/api/teams", { token });
export const getTeam = (token, id) => apiFetch(`/api/teams/${id}`, { token });
export const createTeam = (token, payload) =>
  apiFetch("/api/teams", { method: "POST", token, body: payload });
export const updateTeam = (token, id, payload) =>
  apiFetch(`/api/teams/${id}`, { method: "PUT", token, body: payload });
export const deleteTeam = (token, id) =>
  apiFetch(`/api/teams/${id}`, { method: "DELETE", token });

// Stats
export const getStats = () => apiFetch("/api/stats");
