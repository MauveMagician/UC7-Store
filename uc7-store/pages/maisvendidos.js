"use client";
import Link from "next/link";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import CardContainer from "@/app/card-container";
import { useEffect, useState } from "react";
import Csecao from "@/app/cabecalhoDeSecao";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/sale")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <Cabecalho></Cabecalho>
      <Csecao titulo="Mais Vendidos"></Csecao>
      <CardContainer data={data}></CardContainer>
      <Footer></Footer>
    </>
  );
}
