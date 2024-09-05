import "./globals.css";
import styles from "./banner.module.css";
import Link from "next/link";

export default function Banner() {
  return (
    <div className={styles.ban}>
      <h1 className={styles.pin}>Bem-vindos a nossa Loja Medieval!</h1>
      <p className={styles.text}>Venha conferir nossa loja.</p>
      <div className={styles.botoes}>
        <button className={styles.btn}>
          <Link href={"/lancamentos"}>Lançamentos</Link>
        </button>
        <button className={styles.btn}>
          <Link href={"/ofertas"}>Ofertas</Link>
        </button>
        <button className={styles.btn}>
          <Link href={"/maisvendidos"}>Mais Vendidos</Link>
        </button>
      </div>
    </div>
  );
}
