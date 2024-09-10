import Link from "next/link";
import styles from "./cardCarrinho.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Subtotal from "./subtotal";

export default function CardCarrinho({ data }) {
  const [item, setItem] = useState(data);
  const [showPrecoDesconto, setPrecoDesconto] = useState(0);
  const [qtd, setQtd] = useState(1);
  const router = useRouter();
  useEffect(() => {
    console.log("item", item);
    fetch(`/api/product/${item.productId}`)
      .then((response) => response.json())
      .then((item) => {
        setItem(item);
      });
  }, []);
  useEffect(() => {
    setPrecoDesconto(item.price - item.price * item.discount);
    setQtd(item.quantity);
  }, [item]);

  const removercarrinho = () => {
    fetch("/api/cart/remove/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    router.reload();
  };
  const handlequantidade = (e) => {
    fetch("/api/cart/change/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item._id,
        quantity: Number(e.target.value),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

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
          <p>quantidade:{}</p>
        </div>

        <div className={styles.number}>
          <select
            className={styles.select}
            onChange={handlequantidade}
            value={qtd}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <button className={styles.cart} onClick={removercarrinho}>
            Remover do carrinho
          </button>
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
