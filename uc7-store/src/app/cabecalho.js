"use client";
import Link from "next/link";
import styles from "./cabecalho.module.css";
import { useState, useContext } from "react";
import { useMedia } from "use-media";
import Login from "@/app/login";
import MenuSanduiche from "@/app/menuSanduiche";
import Pesquisar from "@/app/pesquisar";
import { UserContext } from "@/context/UserContext";

export default function Cabecalho() {
  const [showRenderLogin, setRenderLogin] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const isDesktop = useMedia("(min-width: 992px)");
  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };
  const handleRenderLogin = () => {
    setRenderLogin(!showRenderLogin);
  };
  return (
    <>
      {showRenderLogin && <Login setRenderLogin={setRenderLogin} />}
      <div className={styles.container} id={"login"}>
        <Link href={"#footer"}>
          <button className={styles.contato}>contate-me</button>
        </Link>

        <div className={styles.loja}>
          {" "}
          <Link href={"/"} className={styles.link}>
            Caverna do Guerreiro
          </Link>
        </div>
        <MenuSanduiche handleRenderLogin={handleRenderLogin} />
        <div className={styles.menuNormal}>
          {user ? (
            <button className={styles.carrinho}>
              <Link href={"/carrinho"} className={styles.link}>
                <img
                  className={styles.buttonstyle}
                  src="/catapult-svgrepo-com.svg"
                ></img>
                <div className={styles.info}>Carrinho</div>
              </Link>
            </button>
          ) : (
            <></>
          )}
          <button className={styles.email} onClick={() => handleRenderLogin()}>
            <img
              className={styles.buttonstyle}
              src="/capacete viking.svg"
            ></img>
            <div className={styles.info}>Usuário</div>
          </button>
          <button className={styles.pesquisar} onClick={handleSearchClick}>
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
      {searchVisible && isDesktop && (
        <Pesquisar
          setRenderLogin={setRenderLogin}
          setSearchVisible={setSearchVisible}
        />
      )}
    </>
  );
}
