import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/pokemons.js";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const nav = useNavigate();
  const { login: saveToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login({ username, password });
      saveToken(res.token);
      nav("/pokemons");
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="stack">
      <h2>Connexion</h2>
      <form className="form" onSubmit={submit}>
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="btn primary" type="submit">Se connecter</button>
      </form>
      {err && <div className="err">{err}</div>}
    </div>
  );
}
