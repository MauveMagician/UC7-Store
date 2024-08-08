import Link from "next/link";
import styles from "./cabecalhoDeSecao.module.css";

export default function Csecao() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img1}>
          <img
            className={styles.svgstyle}
            src="/axe-sword-svgrepo-com.svg"
          ></img>
        </div>
        <p className={styles.titulo}>Cabeçalho de Seção</p>
        <div className={styles.img2}>
          <img
            className={styles.svgstyle}
            src="/crossbow-svgrepo-com.svg"
          ></img>
        </div>
      </div>
    </>
  );
}
