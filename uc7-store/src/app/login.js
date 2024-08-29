"use client";
import styles from "./login.module.css";
import "./globals.css";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

export default function Login({ setRenderLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const usernameCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="));
    if (usernameCookie) {
      const loggedInUsername = usernameCookie.split("=")[1];
      setUser(loggedInUsername)
    }
  }, []);

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
        setUser(username);
        alert(newData.message);
        setRenderLogin(false);
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
        {user ? (
          <>
            <div className={styles.container2}>
              <p className={styles.p}>Oi {user}</p>
              <button
                className={styles.button}
                onClick={() => {
                  document.cookie =
                    "session=; max-age=0; path=/; SameSite=Strict; Secure";
                  document.cookie =
                    "username=; max-age=0; path=/; SameSite=Strict; Secure";
                    setUser(null);
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form className={styles.container} onSubmit={handleSignIn}>
            <p className={styles.p}>Caverna do guerreiro</p>
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