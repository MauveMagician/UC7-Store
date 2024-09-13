import "./globals.css";
import styles from "./banner.module.css";
import Link from "next/link";

export default function Banner() {
  return (
    <div className={styles.ban}>
      <h1 className={styles.pin}>Bem-vindos a nossa Loja Medieval!</h1>
      <p className={styles.text}>Venha conferir nossa loja.</p>
      <div className={styles.botoes}>
        <Link href={"/lancamentos"}>
          <button className={styles.btn}>Lançamentos</button>
        </Link>
        <Link href={"/ofertas"}>
          <button className={styles.btn}>Ofertas</button>
        </Link>
        <Link href={"/maisvendidos"}>
          <button className={styles.btn}>Mais Vendidos</button>
        </Link>
      </div>
    </div>
  );
}
