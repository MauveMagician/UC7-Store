import Link from "next/link";
import styles from "./cadastro.module.css";
import { useState } from "react";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Csecao from "@/app/cabecalhoDeSecao";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedInUser] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Enviando a requisição com o usuario:", username);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.error("Failed to sign up");
    }
  };
  return (
    <>
      <div className={styles.planet}>
        <Cabecalho></Cabecalho>
        <form onSubmit={handleSignUp} className={styles.container}>
          <Csecao titulo="Ensira seu email"></Csecao>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Csecao titulo="Ensira sua senha"></Csecao>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <Footer></Footer>
      </div>
    </>
  );
}
