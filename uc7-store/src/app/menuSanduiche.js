import styles from "./menuSanduiche.module.css";
import { useState } from "react";
import { useMedia } from "use-media";
import Link from "next/link";
import Pesquisar from "@/app/pesquisar";

export default function MenuSanduiche({ handleRenderLogin }) {
  const [showRenderLogin, setRenderLogin] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const isPhone = useMedia("(max-width: 600px)");
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };
  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img} onClick={handleMenuClick}>
          <img className={styles.svg} src="/menu-svgrepo-com.svg"></img>
          {menuVisible ? (
            <ul className={styles.lista}>
              <li>
                <button className={styles.carrinho}>
                  <Link href={"/carrinho"}>
                    <img
                      className={styles.buttonstyle}
                      src="/catapult-svgrepo-com.svg"
                    ></img>
                    <div className={styles.info}>Carrinho</div>
                  </Link>
                </button>
              </li>
              <li>
                <button className={styles.email} onClick={handleRenderLogin}>
                  <img
                    className={styles.buttonstyle}
                    src="/capacete viking.svg"
                  ></img>
                  <div className={styles.info}>Usuário</div>
                </button>
              </li>
              <li>
                <button
                  className={styles.pesquisar}
                  onClick={handleSearchClick}
                >
                  <img className={styles.buttonstyle} src="/map.svg"></img>
                  <div className={styles.info}>Pesquisar</div>
                </button>
              </li>
              <li>
                <button className={styles.menu}>
                  <Link href={"/suporte"}>
                    <img
                      className={styles.buttonstyle}
                      src="/scroll-unfurled-svgrepo-com.svg"
                    ></img>
                    <div className={styles.info}>Menu</div>
                  </Link>
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.containeropcoes}>
          <div className={styles.opcao1}></div>
        </div>
      </div>
      {searchVisible && isPhone && (
        <Pesquisar
          setRenderLogin={setRenderLogin}
          setSearchVisible={setSearchVisible}
        />
      )}
    </>
  );
}
