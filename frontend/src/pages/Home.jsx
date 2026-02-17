import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="stack">

      {/* HERO */}
      <div className="homeHero">
        <div className="homeHeroInner">
          <div>
            <h1 className="homeTitle">PokéAPI</h1>
            <div className="muted">
              Explore le Pokédex, gère tes favoris et compose tes équipes.
            </div>
          </div>

          <Link className="btn primary bigBtn" to="/pokemons">
            Ouvrir le Pokédex
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="homeGrid">

        <Link to="/pokemons" className="homeCard">
          <div className="homeCardTitle">Pokédex</div>
          <div className="muted small">
            Filtres, tri, pagination et fiches détaillées.
          </div>
        </Link>

        <Link to="/favorites" className="homeCard">
          <div className="homeCardTitle">Favoris</div>
          <div className="muted small">
            Retrouve tes Pokémon préférés.
          </div>
        </Link>

        <Link to="/teams" className="homeCard">
          <div className="homeCardTitle">Équipes</div>
          <div className="muted small">
            Crée et gère des équipes de 6 Pokémon.
          </div>
        </Link>

        <Link to="/stats" className="homeCard">
          <div className="homeCardTitle">Statistiques</div>
          <div className="muted small">
            Analyse par type et tops.
          </div>
        </Link>

        <Link to="/pokemons/new" className="homeCard">
          <div className="homeCardTitle">Créer</div>
          <div className="muted small">
            Ajoute un nouveau Pokémon.
          </div>
        </Link>

      </div>

    </div>
  );
}
