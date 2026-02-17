import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { isAuth, logout } = useAuth();

  return (
    <header className="nav">
      <Link className="brand" to="/">PokéAPI</Link>

      <nav className="links">
        <NavLink to="/pokemons">Pokédex</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        {isAuth && <NavLink to="/favorites">Favoris</NavLink>}
        {isAuth && <NavLink to="/teams">Équipes</NavLink>}
        {isAuth && <NavLink to="/pokemons/new">+ Pokémon</NavLink>}
      </nav>

      <div className="authbox">
        {!isAuth ? (
          <>
            <NavLink className="navAuthBtn login" to="/login">Connexion</NavLink>
            <NavLink className="navAuthBtn register" to="/register">Inscription</NavLink>
          </>
        ) : (
          <button className="navAuthBtn logout" onClick={logout}>Déconnexion</button>
        )}
      </div>
    </header>
  );
}
