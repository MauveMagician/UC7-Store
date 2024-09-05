import styles from "./menuSanduiche.module.css";
import { useState } from "react";

export default function MenuSanduiche({ handleRenderLogin }) {
  const [showRenderLogin, setRenderLogin] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
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
                  <img
                    className={styles.buttonstyle}
                    src="/catapult-svgrepo-com.svg"
                  ></img>
                  <div className={styles.info}>Carrinho</div>
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
                <button className={styles.pesquisar}>
                  <img className={styles.buttonstyle} src="/map.svg"></img>
                  <div className={styles.info}>Pesquisar</div>
                </button>
              </li>
              <li>
                <button className={styles.menu}>
                  <img
                    className={styles.buttonstyle}
                    src="/scroll-unfurled-svgrepo-com.svg"
                  ></img>
                  <div className={styles.info}>Menu</div>
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
    </>
  );
}
