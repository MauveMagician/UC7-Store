"use client";
import Link from "next/link";
import styles from "./ofertas.module.css";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import CardContainer from "@/app/card-container";
import { useEffect, useState } from "react";
import Csecao from "@/app/cabecalhoDeSecao";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/ofertas")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Cabecalho></Cabecalho>
        <Csecao titulo="Ofertas"></Csecao>
        <CardContainer data={data}></CardContainer>
        <Footer></Footer>
      </div>
    </>
  );
}
