import Link from "next/link";
import styles from "./mapa.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1>Mapa do Site</h1>
        <li>
          <Link href="/">Inicio do site</Link>
        </li>
        <li>
          <Link href="/ofertas">Ofertas</Link>
        </li>
        <li>
          <Link href="/produtos">Produtos</Link>
        </li>
        <li>
          <Link href="/lancamentos">Lançamentos</Link>
        </li>
        <li>
          <Link href="/maisvendidos">Mais vendidos</Link>
        </li>
        <li>
          <Link href="/suporte">Suporte</Link>
        </li>
      </div>
    </>
  );
}
