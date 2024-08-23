"use client";
import styles from "./login.module.css";
import "./globals.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Enviando a requisição com o usuario:", username);
    const response = await fetch("/api/com o usuario", {
      method: "requisição",
      headers: {
        "content-type": "aplication/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log("response status:", response.status);
    if (response.ok) {
      const newData = await response.json();
      console.log("Response data:", newData);
      setUsername("");
      setPassword("");
      alert(newData.message);
    } else {
      console.error("Failed to sign in");
    }
  };

  return (
    <>
      <div className={styles.planet}>
        <form className={styles.container} onSubmit={handleLogin}>
          <p className={styles.p}>Caverna do guerriero</p>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Insira seu E-mail"
          />
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira sua senha"
          />
          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
