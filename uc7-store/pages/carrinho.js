"use client";
import Link from "next/link";
import styles from "./carrinho.module.css";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Csecao from "@/app/cabecalhoDeSecao";
import { useEffect, useState } from "react";
import CardCarrinhoContainer from "@/app/cardCarrinhoContainer";
import Subtotal from "@/app/subtotal";

export default function Carrinho() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/carrinho")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // TODO: Implementar a lista de produtos do carrinho
  return (
    <>
      <div className={styles.container}>
        <Cabecalho></Cabecalho>
        <Csecao titulo="Seu carrinho"></Csecao>
        <CardCarrinhoContainer data={data}></CardCarrinhoContainer>
        <div className={styles.container}></div>
        <Subtotal></Subtotal>
        <Footer></Footer>
      </div>
    </>
  );
}
