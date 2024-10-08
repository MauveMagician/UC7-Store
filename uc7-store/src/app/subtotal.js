"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import styles from "./subtotal.module.css";
export default function Subtotal() {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    fetch(`/api/data/subtotal`)
      .then((response) => response.json())
      .then((data) => {
        setSubtotal(data.subtotal);
        console.log("subtotal", subtotal);
      });
  }, []);
  return (
    <div className={styles.container}>
      <p className={styles.p}>Subtotal: R$ {subtotal} </p>
      <Link href={"/pagamentos"}>
        <button className={styles.money}>Finalizar compra</button>
      </Link>
    </div>
  );
}
