import styles from "./card.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Card({ name, price, discount, imagePath, id }) {
  const [showPrecoDesconto, setPrecoDesconto] = useState(
    price - price * discount
  );

  return (
    <div className={styles.cartao}>
      <Link href={`/produtos/${id}`}>
        <img src={`${imagePath}`} alt="imagem do produto"></img>
      </Link>
      <div className={styles.detalhes}>
        <div className={styles.titulo}>{name}</div>
        {discount ? <div className={styles.preco}>R$ {price}</div> : <></>}
        <p className={styles.value}>
          R$
          <span>{showPrecoDesconto} </span>
        </p>
        <button>comprar agora</button>
      </div>
    </div>
  );
}
