"use client";
import Cabecalho from "@/app/cabecalho";
import Csecao from "@/app/cabecalhoDeSecao";
import CardContainer from "@/app/card-container";
import Footer from "@/app/footer";
import { SearchProducts } from "@/query";

export async function getServerSideProps(context) {
  const { id } = context.params;
  let products = [];

  try {
    products = await SearchProducts(id);
  } catch (error) {
    console.error(error);
  }

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default function Busca({ products }) {
  return (
    <>
      <div>
        <Cabecalho></Cabecalho>
        <Csecao titulo={"Resultados da Busca"}></Csecao>
        <CardContainer data={products}></CardContainer>
        <Footer></Footer>
      </div>
    </>
  );
}
