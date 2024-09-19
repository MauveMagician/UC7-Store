"use client";
import Link from "next/link";
import styles from "./carrinho.module.css";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Csecao from "@/app/cabecalhoDeSecao";
import { useEffect, useState } from "react";
import CardResumoContainer from "@/app/cardresumocontainer";

import SubtotalResumo from "@/app/subtotalresumo";

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
        <CardResumoContainer data={data}></CardResumoContainer>
        <div className={styles.container}></div>
        <SubtotalResumo></SubtotalResumo>
        <Footer></Footer>
      </div>
    </>
  );
}
