import Link from "next/link";
import styles from "./cardCarrinho.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CardCarrinho({ data }) {
  const [item, setItem] = useState(data);
  const [showPrecoDesconto, setPrecoDesconto] = useState(0);
  useEffect(() => {
    console.log("item", item);
    fetch(`/api/product/${item.productId}`)
      .then((response) => response.json())
      .then((item) => setItem(item));
  }, []);
  useEffect(() => {
    setPrecoDesconto(item.price - item.price * item.discount);
  }, [item]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          className={styles.img}
          src={`${item.imagePath}`}
          alt={item.name}
          width="400"
          height="400"
        ></img>
      </div>
      <div className={styles.containerB}>
        <div className={styles.part1}>
          <p className={styles.titulo}>
            {item.name} - {item.description}
          </p>
          <div className={styles.price}>
            {item.discount ? (
              <p className={styles.valor}>R${item.price}</p>
            ) : (
              <></>
            )}
            <p className={styles.valorD}>
              R$
              <span>{showPrecoDesconto} </span>
            </p>
          </div>
        </div>

        <div className={styles.stock}>
          <p className={styles.p}>Em estoque:{item.stock}</p>
        </div>

        <div className={styles.number}>
          <select className={styles.select}>
            <option>Quantidade: 0</option>
            <option>Quantidade: 1</option>
            <option>Quantidade: 2</option>
            <option>Quantidade: 3</option>
          </select>
          <button className={styles.cart}>Remover do carrinho</button>
          <button className={styles.money}>Comprar agora</button>
        </div>
      </div>
    </div>
  );
}

/*    <div className={styles.cartao}>
      <Link href={`/produtos/${item._id}`} className={styles.img}>
        <img src={`${item.imagePath}`} alt="imagem do produto"></img>
      </Link>
      <div className={styles.titulo}>{item.name}</div>
      <div className={styles.price}>
        {item.discount ? (
          <div className={styles.preco}>R$ {item.price}</div>
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
      </div>
    </div>   */
