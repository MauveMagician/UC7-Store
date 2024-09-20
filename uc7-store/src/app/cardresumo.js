import styles from "./cardresumo.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Subtotal from "./subtotal";

export default function Cardresumo({ data }) {
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
    router.reload();
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
    </div>
  );
}
