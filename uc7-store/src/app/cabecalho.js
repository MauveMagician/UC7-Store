"use client";
import Link from "next/link";
import styles from "./cabecalho.module.css";
import { useState } from "react";
import Login from "@/app/login";
import MenuSanduiche from "@/app/menuSanduiche";

export default function Cabecalho() {
  const [showRenderLogin, setRenderLogin] = useState(false);

  const handleRenderLogin = () => {
    setRenderLogin(!showRenderLogin);
  };
  return (
    <>
      {showRenderLogin && <Login setRenderLogin={setRenderLogin} />}
      <div className={styles.container}>
        <button className={styles.contato}>contate-me</button>

        <div className={styles.loja}>
          {" "}
          <Link href={"/"} className={styles.link}>
            Caverna do Guerreiro
          </Link>
        </div>
        <MenuSanduiche handleRenderLogin={handleRenderLogin} />
        <div className={styles.menuNormal}>
          <button className={styles.carrinho}>
            <img
              className={styles.buttonstyle}
              src="/catapult-svgrepo-com.svg"
            ></img>
            <div className={styles.info}>Carrinho</div>
          </button>
          <button className={styles.email} onClick={() => handleRenderLogin()}>
            <img
              className={styles.buttonstyle}
              src="/capacete viking.svg"
            ></img>
            <div className={styles.info}>Usuário</div>
          </button>
          <button className={styles.pesquisar}>
            <img className={styles.buttonstyle} src="/map.svg"></img>
            <div className={styles.info}>Pesquisar</div>
          </button>
          <button className={styles.menu}>
            <Link href={"/suporte"}>
              <img
                className={styles.buttonstyle}
                src="/scroll-unfurled-svgrepo-com.svg"
              ></img>
              <div className={styles.info}>Menu</div>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
