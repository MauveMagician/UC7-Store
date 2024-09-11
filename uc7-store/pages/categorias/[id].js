"use client";
import Cabecalho from "@/app/cabecalho";
import Csecao from "@/app/cabecalhoDeSecao";
import CardContainer from "@/app/card-container";
import Footer from "@/app/footer";
import { getProductsByCategory } from "@/query";

export async function getServerSideProps(context) {
  const { id } = context.params;
  let products = [];

  try {
    products = await getProductsByCategory(id);
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

export default function Categoria({ products }) {
  return (
    <>
      <div>
        <Cabecalho></Cabecalho>
        <Csecao titulo={products ? products.category : "Produtos"}></Csecao>
        <CardContainer data={products}></CardContainer>
        <Footer></Footer>
      </div>
    </>
  );
}
