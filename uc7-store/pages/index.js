"use client";
import Link from "next/link";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Banner from "@/app/banner";
import Carta from "@/app/cartaCategoria";
import styles from "./index.module.css";
import Csecao from "@/app/cabecalhoDeSecao";
import CardContainer from "@/app/card-container";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <Cabecalho></Cabecalho>
      <Banner></Banner>
      <div className={styles.cartas}>
        <Carta texto="Espadas" imagem="/espada.jpg"></Carta>
        <Carta
          texto="Armaduras para Cavalos"
          imagem="/armaduraparacavalo.jpg"
        ></Carta>
        <Carta texto="Escudos" imagem="/escudo.jpg"></Carta>
        <Carta texto="Machados" imagem="/machados.jpg"></Carta>
      </div>
      <Csecao titulo="Lançamentos"></Csecao>
      <CardContainer data={data}></CardContainer>
      <Footer></Footer>
    </>
  );
}
