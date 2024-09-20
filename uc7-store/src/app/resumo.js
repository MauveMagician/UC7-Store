"use client";
import SubtotalResumo from "./subtotalresumo";
import { useState, useEffect } from "react";
import CardResumoContainer from "./cardresumocontainer";

export default function Resumo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/carrinho")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <CardResumoContainer data={data} />
      <SubtotalResumo />
    </>
  );
}
