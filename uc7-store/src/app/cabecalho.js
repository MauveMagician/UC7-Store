import Link from "next/link";
import styles from "./cabecalho.module.css";

export default function Cabecalho() {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.contato}>contate-me</button>
        <div className={styles.loja}>Caverna do Guerreiro</div>
        <button className={styles.carrinho}>
          <img
            className={styles.buttonstyle}
            src="/catapult-svgrepo-com.svg"
          ></img>
          <div className={styles.info}>Carrinho</div>
        </button>
        <button className={styles.email}>
          <img className={styles.buttonstyle} src="/capacete viking.svg"></img>
          <div className={styles.info}>Usuário</div>
        </button>
        <button className={styles.pesquisar}>
          <img className={styles.buttonstyle} src="/map.svg"></img>
          <div className={styles.info}>Pesquisar</div>
        </button>
        <button className={styles.menu}>
          <img
            className={styles.buttonstyle}
            src="/scroll-unfurled-svgrepo-com.svg"
          ></img>
          <div className={styles.info}>Menu</div>
        </button>
      </div>
    </>
  );
}
