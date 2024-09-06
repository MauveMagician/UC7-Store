import "./globals.css";
import styles from "./carta.module.css";
import Link from "next/link";

export default function Carta({ texto, imagem }) {
  const categoria = texto.toLowerCase();
  return (
    <div className={styles.overlay}>
      <div
        className={styles.card}
        style={{ backgroundImage: `url('${imagem}')` }}
      >
        <p>
          <Link href={`/categorias/${categoria}`}>{texto}</Link>
        </p>
      </div>
    </div>
  );
}
