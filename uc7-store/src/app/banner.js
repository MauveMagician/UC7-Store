import "./globals.css";
import styles from "./banner.module.css";
import Link from "next/link";

export default function Banner() {
  return (
    <div className={styles.ban}>
      <h1 className={styles.pin}>Bem-vindos a nossa Loja Medieval!</h1>
      <p className={styles.text}>Venha conferir nossa loja.</p>
      <button className={styles.btn}>
        <Link href={"/lancamentos"}>Conferir</Link>
      </button>
    </div>
  );
}
