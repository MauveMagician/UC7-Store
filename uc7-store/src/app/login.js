"use client";
import styles from "./login.module.css";
import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const usernameCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="));
    if (usernameCookie) {
      const loggedInUsername = usernameCookie.split("=")[1];
      setLoggedInUser(loggedInUsername);
    }
  }, []);

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
  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const newData = await response.json();
      setUsername("");
      setPassword("");
      if (document.cookie.includes("cookieConsent=true")) {
        document.cookie = `session=${newData.sessionId}; max-age=3600; path=/; SameSite=Strict; Secure`;
        document.cookie = `username=${username}; max-age=3600; path=/; SameSite=Strict; Secure`;
        setLoggedInUser(username);
        alert(newData.message);
      } else {
        console.error(
          "user has not consented to cookies. cannot set session and username cookies."
        );
      }
    } else {
      console.error("Failed to sign in.");
    }
  };
  return (
    <>
      <div className={`${styles.planet} `}>
        {loggedInUser ? (
          <p>Oi {loggedInUser}!</p>
        ) : (
          <form className={styles.container} onSubmit={handleSignIn}>
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
            <p className={styles.p2}>
              <Link href="/cadastro">Criar conta?</Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
