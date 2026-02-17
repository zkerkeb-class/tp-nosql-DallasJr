import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/pokemons.js";

export default function Register() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    try {
      const res = await register({ username, password });
      setMsg(res?.message || "Utilisateur créé");
      nav("/login");
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="stack">
      <h2>Inscription</h2>
      <form className="form" onSubmit={submit}>
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="btn primary" type="submit">Créer le compte</button>
      </form>
      {msg && <div className="ok">{msg}</div>}
      {err && <div className="err">{err}</div>}
    </div>
  );
}
