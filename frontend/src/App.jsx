import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Pokemons from "./pages/Pokemons.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";
import PokemonCreate from "./pages/PokemonCreate.jsx";
import PokemonEdit from "./pages/PokemonEdit.jsx";
import Favorites from "./pages/Favorites.jsx";
import Teams from "./pages/Teams.jsx";
import TeamDetail from "./pages/TeamDetail.jsx";
import Stats from "./pages/Stats.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemons/:id" element={<PokemonDetail />} />

          <Route
            path="/pokemons/new"
            element={
              <ProtectedRoute>
                <PokemonCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pokemons/:id/edit"
            element={
              <ProtectedRoute>
                <PokemonEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute>
                <TeamDetail />
              </ProtectedRoute>
            }
          />

          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
