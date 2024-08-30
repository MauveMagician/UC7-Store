import styles from "./card.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Card({ name, price, discount, imagePath, id }) {
  const [showPrecoDesconto, setPrecoDesconto] = useState(
    price - price * discount
  );

  return (
    <div className={styles.cartao}>
      <Link href={`/produtos/${id}`} className={styles.img}>
        <img src={`${imagePath}`} alt="imagem do produto"></img>
      </Link>
      <div className={styles.titulo}>{name}</div>
      <div className={styles.price}>
        {discount ? (
          <div className={styles.preco}>R$ {price}</div>
        ) : (
          <div className={styles.preco}></div>
        )}
        <p className={styles.value}>
          R$
          <span>{showPrecoDesconto} </span>
        </p>
      </div>
      <div className={styles.button}>
        <div className={styles.comprar}>Comprar agora</div>
        <div className={styles.carrinho}>Adcionar ao Carrinho</div>
      </div>
    </div>
  );
}
