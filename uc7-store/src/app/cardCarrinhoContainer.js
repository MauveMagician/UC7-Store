import styles from "./cardCarrinhoContainer.module.css";
import CardCarrinho from "./cardCarrinho.js";
import { useEffect } from "react";

export default function CardCarrinhoContainer(data) {
  useEffect(() => {
    console.log("cardcarrinhocontainerdata", data);
  }, []);
  return (
    <div className={styles.container}>
      {data.data.map((item, index) => (
        <CardCarrinho data={item}></CardCarrinho>
      ))}
    </div>
  );
}
