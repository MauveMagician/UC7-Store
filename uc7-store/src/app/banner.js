import "./globals.css";
import styles from "./banner.module.css";

export default function Banner() {
  return (
    <div className={styles.ban}>
      <h1 className={styles.pin}>Bem-vindos a nossa Loja Medieval!</h1>
      <p className={styles.text}>Venha conferir nossa loja.</p>
      <button className={styles.btn}>Conferir</button>
    </div>
  );
}
