import styles from "./card.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Card({ name, price, discount, imagePath, id }) {
  const [showPrecoDesconto, setPrecoDesconto] = useState(
    price - price * discount
  );
  // Implementar ação para adicionar o produto ao carrinho
  const handleAdicionarCarrinho = async () => {
    // Adicionar o produto ao carrinho
    // Implementar a chamada para o backend para adicionar o item ao carrinho
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    });
    if (response.ok) {
      alert("adicionado a carrinho");
    } else {
      console.error(response);
    }
  };
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
        <div className={styles.carrinho} onClick={handleAdicionarCarrinho}>
          Adcionar ao Carrinho
        </div>
      </div>
    </div>
  );
}
